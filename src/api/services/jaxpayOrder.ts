import type { JaxpayNotification } from '../lib/jaxpayWebhook';
import { prisma } from '../lib/prisma';

export type JaxpayOrderResult = { result: 'updated' } | { result: 'already_processed' } | { result: 'not_found' } | { result: 'amount_mismatch' };

export async function applyJaxpayNotification(notification: JaxpayNotification): Promise<JaxpayOrderResult> {
  const order = await prisma.order.findFirst({ where: { paymentRef: notification.referenceId }, include: { member: { select: { referredById: true } } } });
  if (!order) return { result: 'not_found' };
  if (order.totalAmount !== notification.amount) return { result: 'amount_mismatch' };
  if (notification.status === 'PENDING') return { result: 'already_processed' };
  if (order.paymentStatus === 'paid') return { result: 'already_processed' };
  const nextStatus = notification.status === 'PAID' ? 'paid' : notification.status.toLowerCase();

  return prisma.$transaction(async (tx) => {
    const updated = await tx.order.updateMany({ where: { id: order.id, paymentStatus: { not: nextStatus } }, data: { paymentStatus: nextStatus } });
    if (!updated.count) return { result: 'already_processed' };
    if (nextStatus === 'paid' && order.member.referredById) {
      const setting = await tx.referralSetting.upsert({ where: { id: 1 }, update: {}, create: { id: 1, percentage: 5 } });
      const bonusAmount = Math.round(order.subtotalAmount * setting.percentage / 100);
      await tx.referralReward.upsert({ where: { orderId: order.id }, update: { status: 'earned' }, create: { referrerId: order.member.referredById, orderId: order.id, percentageSnapshot: setting.percentage, baseAmount: order.subtotalAmount, bonusAmount, status: 'earned' } });
    } else if (['expired', 'failed', 'cancelled'].includes(nextStatus)) {
      await tx.referralReward.updateMany({ where: { orderId: order.id }, data: { status: 'cancelled' } });
    }
    return { result: 'updated' };
  });
}
