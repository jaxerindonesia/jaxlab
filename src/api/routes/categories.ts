import { Router } from 'express';
import { prisma } from '../lib/prisma';

export const router = Router();

router.get('/', async (_req, res) => {
  const cats = await prisma.category.findMany({
    where: { deletedAt: null },
    orderBy: { name: 'asc' },
    select: { name: true },
  });
  res.json(cats.map((c) => c.name));
});

router.post('/', async (req, res) => {
  const name = String(req.body?.name ?? '').trim();
  if (!name) return res.status(400).json({ error: 'name is required' });

  const existing = await prisma.category.findFirst({ where: { name } });
  if (existing) {
    if (existing.deletedAt) {
      await prisma.category.update({ where: { id: existing.id }, data: { deletedAt: null } });
    }
    return res.json({ ok: true });
  }

  await prisma.category.create({ data: { name } });
  res.json({ ok: true });
});

router.delete('/', async (req, res) => {
  const name = String(req.body?.name ?? '').trim();
  if (!name) return res.status(400).json({ error: 'name is required' });

  await prisma.category.updateMany({
    where: { name, deletedAt: null },
    data: { deletedAt: new Date() },
  });

  res.json({ ok: true });
});
