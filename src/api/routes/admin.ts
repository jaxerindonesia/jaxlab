import { Router } from 'express';
import { resetAndSeed } from '../lib/services';

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
