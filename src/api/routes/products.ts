import { Router } from 'express';
import type { ApiProduct } from '../contexts/product';
import { toApiProduct } from '../lib/product-mapper';
import { prisma } from '../lib/prisma';
import { ensureCategoryIdByName } from '../lib/services';

export const router = Router();

const detailSelect = {
  description: true,
  subtitle: true,
  badge: true,
  rating: true,
  reviewCount: true,
  images: true,
  specs: true,
  benefits: true,
  marketplaceLinks: true,
};

router.get('/', async (_req, res) => {
  const rows = await prisma.product.findMany({
    where: { deletedAt: null },
    orderBy: { createdAt: 'desc' },
    include: {
      category: { select: { name: true } },
      detail: { where: { deletedAt: null }, select: detailSelect },
      stockEntries: {
        where: { deletedAt: null },
        select: { type: true, quantity: true },
      },
    },
  });

  res.json(rows.map((r) => toApiProduct({ ...r, detail: r.detail ?? null })));
});

router.get('/featured', async (_req, res) => {
  const rows = await prisma.product.findMany({
    where: {
      deletedAt: null,
      detail: { is: { deletedAt: null, badge: { in: ['Best Seller', 'New'] } } },
    },
    orderBy: { createdAt: 'desc' },
    take: 3,
    include: {
      category: { select: { name: true } },
      detail: { where: { deletedAt: null }, select: detailSelect },
      stockEntries: {
        where: { deletedAt: null },
        select: { type: true, quantity: true },
      },
    },
  });

  res.json(rows.map((r) => toApiProduct({ ...r, detail: r.detail ?? null })));
});

router.get('/:id', async (req, res) => {
  const id = String(req.params.id);
  const row = await prisma.product.findFirst({
    where: { id, deletedAt: null },
    include: {
      category: { select: { name: true } },
      detail: { where: { deletedAt: null }, select: detailSelect },
      stockEntries: {
        where: { deletedAt: null },
        select: { type: true, quantity: true },
      },
    },
  });

  if (!row) return res.status(404).json({ error: 'not found' });
  res.json(toApiProduct({ ...row, detail: row.detail ?? null }));
});

router.post('/', async (req, res) => {
  const p = req.body as Partial<ApiProduct>;
  const name = String(p?.name ?? '').trim();
  if (!name) return res.status(400).json({ error: 'name is required' });
  if (typeof p.price !== 'number' || p.price <= 0) return res.status(400).json({ error: 'price must be > 0' });

  const price = p.price as number;
  const categoryId = await ensureCategoryIdByName(p.category);

  const created = await prisma.$transaction(async (tx) => {
    const product = await tx.product.create({
      data: {
        name,
        categoryId,
        shortDescription: String(p.description ?? ''),
        sellPrice: price,
        strikeThroughPrice: typeof p.originalPrice === 'number' ? p.originalPrice : null,
        purchasePrice: null,
      },
    });

    await tx.productDetail.create({
      data: {
        productId: product.id,
        description: String(p.longDescription ?? ''),
        specs: Array.isArray(p.specs) ? p.specs : [],
        marketplaceLinks: Array.isArray(p.marketplaceLinks) ? p.marketplaceLinks : [],
        images: Array.isArray(p.images) ? p.images : [],
        benefits: Array.isArray(p.benefits) ? p.benefits : [],
        subtitle: String(p.subtitle ?? ''),
        badge: p.badge ? String(p.badge) : null,
        rating: typeof p.rating === 'number' ? p.rating : 0,
        reviewCount: typeof p.reviewCount === 'number' ? p.reviewCount : 0,
      },
    });

    return product.id;
  });

  const row = await prisma.product.findFirst({
    where: { id: created },
    include: {
      category: { select: { name: true } },
      detail: { select: detailSelect },
      stockEntries: { where: { deletedAt: null }, select: { type: true, quantity: true } },
    },
  });

  res.json(row ? toApiProduct({ ...row, detail: row.detail ?? null }) : null);
});

router.put('/:id', async (req, res) => {
  const id = String(req.params.id);
  const p = req.body as Partial<ApiProduct>;
  const name = String(p?.name ?? '').trim();
  if (!name) return res.status(400).json({ error: 'name is required' });
  if (typeof p.price !== 'number' || p.price <= 0) return res.status(400).json({ error: 'price must be > 0' });

  const price = p.price as number;
  const categoryId = await ensureCategoryIdByName(p.category);

  await prisma.$transaction(async (tx) => {
    await tx.product.update({
      where: { id },
      data: {
        name,
        categoryId,
        shortDescription: String(p.description ?? ''),
        sellPrice: price,
        strikeThroughPrice: typeof p.originalPrice === 'number' ? p.originalPrice : null,
      },
    });

    await tx.productDetail.updateMany({
      where: { productId: id, deletedAt: null },
      data: {
        description: String(p.longDescription ?? ''),
        specs: Array.isArray(p.specs) ? p.specs : [],
        marketplaceLinks: Array.isArray(p.marketplaceLinks) ? p.marketplaceLinks : [],
        images: Array.isArray(p.images) ? p.images : [],
        benefits: Array.isArray(p.benefits) ? p.benefits : [],
        subtitle: String(p.subtitle ?? ''),
        badge: p.badge ? String(p.badge) : null,
        rating: typeof p.rating === 'number' ? p.rating : 0,
        reviewCount: typeof p.reviewCount === 'number' ? p.reviewCount : 0,
      },
    });
  });

  res.json({ ok: true });
});

router.post('/:id/stock-entries', async (req, res) => {
  const id = String(req.params.id);
  const type = String(req.body?.type ?? '').toUpperCase();
  const quantity = Number(req.body?.quantity ?? 0);
  const note = req.body?.note ? String(req.body.note) : null;

  if (type !== 'IN' && type !== 'OUT') {
    return res.status(400).json({ error: 'type must be IN or OUT' });
  }
  if (!Number.isInteger(quantity) || quantity <= 0) {
    return res.status(400).json({ error: 'quantity must be positive integer' });
  }

  const product = await prisma.product.findFirst({ where: { id, deletedAt: null }, select: { id: true } });
  if (!product) return res.status(404).json({ error: 'not found' });

  await prisma.stockLedgerEntry.create({
    data: { productId: id, type, quantity, note },
  });

  res.json({ ok: true });
});

router.delete('/:id', async (req, res) => {
  const id = String(req.params.id);
  const now = new Date();

  await prisma.$transaction(async (tx) => {
    await tx.product.updateMany({ where: { id, deletedAt: null }, data: { deletedAt: now } });
    await tx.productDetail.updateMany({ where: { productId: id, deletedAt: null }, data: { deletedAt: now } });
  });

  res.json({ ok: true });
});
