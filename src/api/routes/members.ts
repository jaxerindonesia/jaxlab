import { createHash } from 'node:crypto';
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
  if (!name || !email || !address || !phoneWa || password.length < 6) return res.status(400).json({ error: 'invalid payload' });

  const existing = await prisma.member.findUnique({ where: { email } });
  if (existing) return res.status(409).json({ error: 'email already used' });

  const member = await prisma.member.create({
    data: { name, email, address, phoneWa, passwordHash: hash(password) },
    select: { id: true, name: true, email: true, address: true, phoneWa: true },
  });
  res.json(member);
});

router.post('/login', async (req, res) => {
  if (!hasMemberModel()) return res.status(500).json({ error: 'Model member belum tersedia. Jalankan migrate + prisma generate lalu restart API.' });
  const email = String(req.body?.email ?? '').trim().toLowerCase();
  const password = String(req.body?.password ?? '');
  const member = await prisma.member.findUnique({ where: { email } });
  if (!member || member.passwordHash !== hash(password)) return res.status(401).json({ error: 'email/password salah' });

  res.json({ id: member.id, name: member.name, email: member.email, address: member.address, phoneWa: member.phoneWa });
});
