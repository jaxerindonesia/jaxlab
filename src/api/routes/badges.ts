import { Router } from 'express';
import { prisma } from '../lib/prisma';

export const router = Router();

router.get('/', async (_req, res) => {
  const badges = await prisma.badge.findMany({
    where: { deletedAt: null },
    orderBy: { name: 'asc' },
    select: { name: true },
  });
  res.json(badges.map((b) => b.name));
});

router.post('/', async (req, res) => {
  const name = String(req.body?.name ?? '').trim();
  if (!name) return res.status(400).json({ error: 'name is required' });

  const existing = await prisma.badge.findFirst({ where: { name } });
  if (existing) {
    if (existing.deletedAt) {
      await prisma.badge.update({ where: { id: existing.id }, data: { deletedAt: null } });
    }
    return res.json({ ok: true });
  }

  await prisma.badge.create({ data: { name } });
  res.json({ ok: true });
});

router.delete('/', async (req, res) => {
  const name = String(req.body?.name ?? '').trim();
  if (!name) return res.status(400).json({ error: 'name is required' });

  await prisma.badge.updateMany({
    where: { name, deletedAt: null },
    data: { deletedAt: new Date() },
  });

  res.json({ ok: true });
});
