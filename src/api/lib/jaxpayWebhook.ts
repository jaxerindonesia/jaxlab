import crypto from 'crypto';

export function verifyJaxpaySignature(rawBody: string, headerValue: string | undefined, secret: string): boolean {
  if (!secret || !headerValue) return false;
  const received = headerValue.replace(/^sha256=/i, '').trim().toLowerCase();
  const expected = crypto.createHmac('sha256', secret).update(rawBody).digest('hex');
  const a = Buffer.from(expected);
  const b = Buffer.from(received);
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

export type JaxpayStatus = 'PENDING' | 'PAID' | 'EXPIRED' | 'FAILED' | 'CANCELLED';
export type JaxpayNotification = { event?: string; paymentId?: string; referenceId: string; status: JaxpayStatus; amount: number; paidAt?: string; raw: Record<string, unknown> };
const VALID_STATUS: JaxpayStatus[] = ['PENDING', 'PAID', 'EXPIRED', 'FAILED', 'CANCELLED'];

export function parseJaxpayPayload(body: Record<string, unknown>): JaxpayNotification | null {
  const data = body.data && typeof body.data === 'object' ? body.data as Record<string, unknown> : body;
  const referenceId = typeof data.reference_id === 'string' ? data.reference_id : '';
  const status = String(data.status ?? '').toUpperCase() as JaxpayStatus;
  const amount = Number(data.amount);
  if (!referenceId || !VALID_STATUS.includes(status) || !Number.isFinite(amount)) return null;
  return { event: typeof body.event === 'string' ? body.event : undefined, paymentId: typeof data.id === 'string' ? data.id : undefined, referenceId, status, amount, paidAt: typeof data.paid_at === 'string' ? data.paid_at : undefined, raw: body };
}
