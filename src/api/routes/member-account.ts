import { createHash, randomBytes } from 'node:crypto';
import { Router, type RequestHandler } from 'express';
import { prisma } from '../lib/prisma';
import { requireMember, revokeMemberSession } from '../lib/member-session';
import { emailConfiguration, sendAccountEmail } from '../lib/account-email';
import { hashPassword, verifyPassword } from '../lib/password';

export const accountRouter = Router();
const digest = (value: string) => createHash('sha256').update(value).digest('hex');
const validEmail = (value: string) => value.length <= 254 && /^[^\s@,;<>]+@[^\s@,;<>]+\.[^\s@,;<>]+$/.test(value);
const memberSelect = { id: true, name: true, email: true, address: true, phoneWa: true, shippingDestinationId: true, shippingDestination: true, province: true, city: true, postalCode: true, referralCode: true, isAffiliate: true } as const;
const genericReset = { message: 'Jika email terdaftar, tautan untuk mengatur ulang password akan dikirim. Periksa kotak masuk dan folder spam.' };

// Per-process guard; per-account cooldown is also persisted in the database.
const requests = new Map<string, { count: number; until: number }>();
const limitRequests: RequestHandler = (req, res, next) => {
  const now = Date.now();
  for (const [key, value] of requests) if (value.until <= now) requests.delete(key);
  const key = `${req.ip}:${req.path}`;
  const value = requests.get(key) ?? { count: 0, until: now + 15 * 60_000 };
  if (value.count >= 30 || (requests.size >= 10_000 && !requests.has(key))) {
    res.setHeader('Retry-After', Math.ceil((value.until - now) / 1000));
    res.status(429).json({ error: 'Terlalu banyak percobaan. Silakan coba lagi nanti.' });
    return;
  }
  value.count += 1;
  requests.set(key, value);
  next();
};

async function issueToken(memberId: string, email: string, purpose: 'reset_password' | 'change_email') {
  const token = randomBytes(32).toString('hex');
  const tokenHash = digest(token);
  const created = await prisma.$transaction(async tx => {
    await tx.$queryRaw`SELECT id FROM members WHERE id = ${memberId} FOR UPDATE`;
    const previous = await tx.memberActionToken.findUnique({ where: { memberId_purpose: { memberId, purpose } } });
    if (previous && previous.createdAt.getTime() > Date.now() - 60_000) return false;
    await tx.memberActionToken.deleteMany({ where: { memberId, purpose } });
    await tx.memberActionToken.create({ data: { tokenHash, memberId, purpose, email, expiresAt: new Date(Date.now() + 15 * 60_000) } });
    return true;
  });
  if (!created) return false;
  try {
    await sendAccountEmail(email, token, purpose);
  } catch {
    await prisma.memberActionToken.deleteMany({ where: { tokenHash } });
    throw new Error('Email belum dapat dikirim. Silakan coba lagi nanti atau hubungi admin.');
  }
  return true;
}

accountRouter.get('/profile', requireMember, async (_req, res) => {
  const member = await prisma.member.findUniqueOrThrow({ where: { id: res.locals.memberId }, select: memberSelect });
  res.json({ ...member, expiresAt: res.locals.expiresAt });
});

accountRouter.put('/profile', requireMember, limitRequests, async (req, res) => {
  const name = String(req.body?.name ?? '').trim();
  const email = String(req.body?.email ?? '').trim().toLowerCase();
  const address = String(req.body?.address ?? '').trim();
  const phoneWa = String(req.body?.phoneWa ?? '').trim();
  const shippingDestinationId = Number(req.body?.shippingDestinationId);
  const shippingDestination = String(req.body?.shippingDestination ?? '').trim();
  const province = String(req.body?.province ?? '').trim();
  const city = String(req.body?.city ?? '').trim();
  const postalCode = String(req.body?.postalCode ?? '').trim();
  if (!name || name.length > 150 || !validEmail(email) || !address || address.length > 1500 || !/^[+\d ()-]{8,25}$/.test(phoneWa) ||
    !Number.isSafeInteger(shippingDestinationId) || shippingDestinationId < 1 || !shippingDestination || shippingDestination.length > 500 || !province || !city || !/^\d{5}$/.test(postalCode)) {
    return res.status(400).json({ error: 'Lengkapi nama, email, WhatsApp, detail alamat, dan wilayah pengiriman yang valid.' });
  }
  try {
    const existing = await prisma.member.findUniqueOrThrow({ where: { id: res.locals.memberId } });
    const emailChanged = email !== existing.email;
    if (emailChanged) {
      if (!await verifyPassword(String(req.body?.currentPassword ?? ''), existing.passwordHash)) return res.status(400).json({ error: 'Masukkan password saat ini untuk mengganti email.' });
      if (await prisma.member.findUnique({ where: { email } })) return res.status(409).json({ error: 'Email tidak dapat digunakan. Gunakan alamat email lain.' });
      emailConfiguration();
      if (!await issueToken(existing.id, email, 'change_email')) return res.status(429).json({ error: 'Tunggu satu menit sebelum meminta email verifikasi lagi.' });
    }
    const member = await prisma.member.update({
      where: { id: existing.id },
      data: { name, address, phoneWa, shippingDestinationId, shippingDestination, province, city, postalCode },
      select: memberSelect,
    });
    return res.json({ member: { ...member, expiresAt: res.locals.expiresAt }, pendingEmail: emailChanged ? email : null });
  } catch {
    return res.status(503).json({ error: 'Profil belum dapat disimpan atau email verifikasi belum dapat dikirim. Silakan coba lagi atau hubungi admin.' });
  }
});

accountRouter.post('/forgot-password', limitRequests, async (req, res) => {
  const email = String(req.body?.email ?? '').trim().toLowerCase();
  if (!validEmail(email)) return res.status(400).json({ error: 'Masukkan alamat email yang valid.' });
  try { emailConfiguration(); }
  catch { return res.status(503).json({ error: 'Layanan email belum dikonfigurasi. Silakan hubungi admin.' }); }
  try {
    const member = await prisma.member.findUnique({ where: { email }, select: { id: true } });
    // Respond before SMTP delivery so response timing does not reveal registered accounts.
    res.status(202).json(genericReset);
    if (member) void issueToken(member.id, email, 'reset_password').catch(() => {
      console.error('[account-email] Password reset delivery failed. Check SMTP configuration.');
    });
  } catch { return res.status(503).json({ error: 'Permintaan belum dapat diproses. Silakan coba lagi.' }); }
});

export async function consumeAccountToken(token: string, purpose: 'reset_password' | 'change_email', password?: string) {
  if (!/^[a-f0-9]{64}$/.test(token)) throw new Error('Tautan tidak valid atau sudah kedaluwarsa. Minta tautan baru.');
  const passwordHash = purpose === 'reset_password' && password ? await hashPassword(password) : undefined;
  return prisma.$transaction(async tx => {
    const found = await tx.memberActionToken.findUnique({ where: { tokenHash: digest(token) } });
    if (!found || found.purpose !== purpose) throw new Error('Tautan tidak valid atau sudah kedaluwarsa. Minta tautan baru.');
    await tx.$queryRaw`SELECT id FROM members WHERE id = ${found.memberId} FOR UPDATE`;
    const current = await tx.member.findUniqueOrThrow({ where: { id: found.memberId } });
    const consumed = await tx.memberActionToken.deleteMany({ where: { tokenHash: found.tokenHash, purpose, expiresAt: { gt: new Date() } } });
    if (!consumed.count || (purpose === 'reset_password' && (found.email !== current.email || !passwordHash))) throw new Error('Tautan tidak valid atau sudah kedaluwarsa. Minta tautan baru.');
    await tx.member.update({ where: { id: found.memberId }, data: purpose === 'reset_password' ? { passwordHash } : { email: found.email } });
    await tx.memberActionToken.deleteMany({ where: { memberId: found.memberId } });
    await tx.memberSession.deleteMany({ where: { memberId: found.memberId } });
  });
}

accountRouter.post('/reset-password', limitRequests, async (req, res) => {
  const password = String(req.body?.password ?? '');
  if (password.length < 8 || password.length > 128) return res.status(400).json({ error: 'Password baru harus terdiri dari 8–128 karakter.' });
  try {
    await consumeAccountToken(String(req.body?.token ?? ''), 'reset_password', password);
    await revokeMemberSession(req, res);
    return res.json({ message: 'Password berhasil diperbarui. Silakan masuk dengan password baru.' });
  } catch { return res.status(400).json({ error: 'Tautan tidak valid, sudah digunakan, atau kedaluwarsa. Minta tautan baru.' }); }
});

accountRouter.post('/verify-email', limitRequests, async (req, res) => {
  try {
    await consumeAccountToken(String(req.body?.token ?? ''), 'change_email');
    await revokeMemberSession(req, res);
    return res.json({ message: 'Email berhasil diverifikasi. Silakan masuk dengan email baru.' });
  } catch { return res.status(400).json({ error: 'Tautan tidak valid, kedaluwarsa, atau email tidak dapat digunakan. Minta tautan baru dari profil.' }); }
});
