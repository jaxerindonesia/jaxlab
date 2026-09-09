import { createHash, randomBytes } from 'node:crypto';
import { Router } from 'express';
import { prisma } from '../lib/prisma';
import { createMemberSession, requireMember, revokeMemberSession } from '../lib/member-session';

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
  const isAffiliate = req.body?.isAffiliate === true;
  const affiliatePhotos: string[] = isAffiliate && Array.isArray(req.body?.affiliatePhotos) ? req.body.affiliatePhotos : [];
  if (isAffiliate && (!affiliatePhotos.length || affiliatePhotos.length > 5 || affiliatePhotos.some((photo) => {
    if (typeof photo !== 'string' || !/^data:image\/(jpeg|png|webp);base64,[A-Za-z0-9+/]+={0,2}$/.test(photo)) return true;
    const bytes = Buffer.from(photo.split(',')[1], 'base64');
    const valid = photo.startsWith('data:image/jpeg;') ? bytes.subarray(0, 3).equals(Buffer.from([255, 216, 255]))
      : photo.startsWith('data:image/png;') ? bytes.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]))
      : bytes.toString('ascii', 0, 4) === 'RIFF' && bytes.toString('ascii', 8, 12) === 'WEBP';
    return !valid || bytes.length > 2 * 1024 * 1024;
  }))) return res.status(400).json({ error: 'Unggah 1–5 foto JPG, PNG, atau WebP, maksimal 2 MB per foto.' });
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
    data: { name, email, address, phoneWa, passwordHash: hash(password), shippingDestinationId, shippingDestination, province, city, postalCode, referralCode, referredById: referrer?.id, isAffiliate, affiliatePhotos },
    select: { id: true, name: true, email: true, address: true, phoneWa: true, shippingDestinationId: true, shippingDestination: true, province: true, city: true, postalCode: true, referralCode: true },
  });
  const expiresAt = await createMemberSession(member.id, res);
  res.json({ ...member, isAffiliate, expiresAt });
});

router.post('/login', async (req, res) => {
  if (!hasMemberModel()) return res.status(500).json({ error: 'Model member belum tersedia. Jalankan migrate + prisma generate lalu restart API.' });
  const email = String(req.body?.email ?? '').trim().toLowerCase();
  const password = String(req.body?.password ?? '');
  const member = await prisma.member.findUnique({ where: { email } });
  if (!member || member.passwordHash !== hash(password)) return res.status(401).json({ error: 'Email atau password salah. Silakan periksa kembali.' });

  const expiresAt = await createMemberSession(member.id, res);
  res.json({ id: member.id, name: member.name, email: member.email, address: member.address, phoneWa: member.phoneWa, shippingDestinationId: member.shippingDestinationId, shippingDestination: member.shippingDestination, province: member.province, city: member.city, postalCode: member.postalCode, referralCode: member.referralCode, isAffiliate: member.isAffiliate, expiresAt });
});

router.post('/logout', async (req, res) => {
  await revokeMemberSession(req, res);
  res.json({ ok: true });
});

router.get('/session', requireMember, (_req, res) => res.json({ memberId: res.locals.memberId, expiresAt: res.locals.expiresAt }));

router.get('/cart', requireMember, async (_req, res) => {
  const member = await prisma.member.findUniqueOrThrow({ where: { id: res.locals.memberId }, select: { cart: true } });
  res.json({ memberId: res.locals.memberId, items: member.cart });
});

router.put('/cart', requireMember, async (req, res) => {
  const items = req.body?.items;
  if (req.body?.memberId !== res.locals.memberId) return res.status(409).json({ error: 'Akun berubah. Muat ulang keranjang.' });
  if (!Array.isArray(items) || items.length > 100 || items.some((item) => !item || typeof item.productId !== 'string' || !Number.isSafeInteger(item.qty) || item.qty < 1 || item.qty > 999)) return res.status(400).json({ error: 'Keranjang tidak valid' });
  await prisma.member.update({ where: { id: res.locals.memberId }, data: { cart: items.map((item) => ({ productId: item.productId, qty: item.qty })) } });
  res.json({ ok: true });
});

router.get('/referral-summary', requireMember, async (req, res) => {
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
