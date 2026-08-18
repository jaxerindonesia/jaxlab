import { Router } from 'express';
import { resetAndSeed } from '../lib/services';
import { prisma } from '../lib/prisma';

export const router = Router();

router.post('/login', async (req, res) => {
  const password = String(req.body?.password ?? '');
  const expected = process.env.ADMIN_PASSWORD ?? '';

  if (!expected) {
    return res.status(500).json({ error: 'ADMIN_PASSWORD is not configured' });
  }

  if (password !== expected) {
    return res.status(401).json({ error: 'invalid password' });
  }

  res.json({ ok: true });
});

router.post('/reset', async (_req, res) => {
  await resetAndSeed();
  res.json({ ok: true });
});

router.get('/referral-setting', async (_req, res) => {
  const setting = await prisma.referralSetting.upsert({ where: { id: 1 }, update: {}, create: { id: 1, percentage: 5 } });
  res.json({ percentage: setting.percentage });
});

router.put('/referral-setting', async (req, res) => {
  const percentage = Number(req.body?.percentage);
  if (!Number.isFinite(percentage) || percentage < 0 || percentage > 100) return res.status(400).json({ error: 'Persentase harus antara 0 sampai 100' });
  const setting = await prisma.referralSetting.upsert({ where: { id: 1 }, update: { percentage }, create: { id: 1, percentage } });
  res.json({ percentage: setting.percentage });
});
