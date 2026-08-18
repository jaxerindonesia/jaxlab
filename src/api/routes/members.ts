import { createHash, randomBytes } from 'node:crypto';
import { Router } from 'express';
import { prisma } from '../lib/prisma';

export const router = Router();

const hash = (v: string) => createHash('sha256').update(v).digest('hex');
const hasMemberModel = () => typeof (prisma as unknown as { member?: unknown }).member !== 'undefined';

router.post('/register', async (req, res) => {
  if (!hasMemberModel()) return res.status(500).json({ error: 'Model member belum tersedia. Jalankan migrate + prisma generate lalu restart API.' });
  const name = String(req.body?.name ?? '').trim();
  const email = String(req.body?.email ?? '').trim().toLowerCase();
  const address = String(req.body?.address ?? '').trim();
  const phoneWa = String(req.body?.phoneWa ?? '').trim();
  const password = String(req.body?.password ?? '');
  const shippingDestinationId = Number(req.body?.shippingDestinationId);
  const shippingDestination = String(req.body?.shippingDestination ?? '').trim();
  const province = String(req.body?.province ?? '').trim();
  const city = String(req.body?.city ?? '').trim();
  const postalCode = String(req.body?.postalCode ?? '').trim();
  const referredByCode = String(req.body?.referredByCode ?? '').trim().toUpperCase();
  if (!name || !email || !address || !phoneWa || password.length < 6 || !Number.isInteger(shippingDestinationId) || !shippingDestination || !province || !city || !postalCode) return res.status(400).json({ error: 'Lengkapi data akun dan wilayah pengiriman' });

  const existing = await prisma.member.findUnique({ where: { email } });
  if (existing) return res.status(409).json({ error: 'email already used' });
  const referrer = referredByCode ? await prisma.member.findUnique({ where: { referralCode: referredByCode } }) : null;
  if (referredByCode && !referrer) return res.status(400).json({ error: 'Kode referral tidak ditemukan' });
  const referralCode = randomBytes(5).toString('hex').toUpperCase();

  const member = await prisma.member.create({
    data: { name, email, address, phoneWa, passwordHash: hash(password), shippingDestinationId, shippingDestination, province, city, postalCode, referralCode, referredById: referrer?.id },
    select: { id: true, name: true, email: true, address: true, phoneWa: true, shippingDestinationId: true, shippingDestination: true, province: true, city: true, postalCode: true, referralCode: true },
  });
  res.json(member);
});

router.post('/login', async (req, res) => {
  if (!hasMemberModel()) return res.status(500).json({ error: 'Model member belum tersedia. Jalankan migrate + prisma generate lalu restart API.' });
  const email = String(req.body?.email ?? '').trim().toLowerCase();
  const password = String(req.body?.password ?? '');
  const member = await prisma.member.findUnique({ where: { email } });
  if (!member || member.passwordHash !== hash(password)) return res.status(401).json({ error: 'email/password salah' });

  res.json({ id: member.id, name: member.name, email: member.email, address: member.address, phoneWa: member.phoneWa, shippingDestinationId: member.shippingDestinationId, shippingDestination: member.shippingDestination, province: member.province, city: member.city, postalCode: member.postalCode, referralCode: member.referralCode });
});

router.get('/referral-summary', async (req, res) => {
  const memberId = String(req.header('x-member-id') ?? '').trim();
  if (!memberId) return res.status(400).json({ error: 'invalid member' });
  const [member, setting, rewards] = await Promise.all([
    prisma.member.findUnique({ where: { id: memberId }, select: { referralCode: true, _count: { select: { referrals: true } } } }),
    prisma.referralSetting.upsert({ where: { id: 1 }, update: {}, create: { id: 1, percentage: 5 } }),
    prisma.referralReward.aggregate({ where: { referrerId: memberId, status: 'earned' }, _count: true, _sum: { bonusAmount: true } }),
  ]);
  if (!member) return res.status(404).json({ error: 'member not found' });
  return res.json({ referralCode: member.referralCode, percentage: setting.percentage, registeredCount: member._count.referrals, successfulCount: rewards._count, totalBonus: rewards._sum.bonusAmount ?? 0 });
});
