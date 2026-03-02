import cors from 'cors';
import express from 'express';
import { PrismaClient } from '@prisma/client';
import { seedCategories, seedProducts } from '../prisma/seed-data.ts';

process.env.DATABASE_URL ??= 'file:./prisma/dev.db';

const prisma = new PrismaClient();
const app = express();

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

type ApiProduct = {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  longDescription: string;
  price: number;
  originalPrice?: number;
  category: string;
  badge?: string;
  rating: number;
  reviewCount: number;
  stockStatus: 'Tersedia' | 'Habis' | 'Terbatas';
  images: string[];
  specs: { label: string; value: string }[];
  benefits: string[];
};

function toApiProduct(row: {
  id: string;
  name: string;
  shortDescription: string;
  sellPrice: number;
  strikeThroughPrice: number | null;
  category: { name: string } | null;
  detail: {
    description: string;
    subtitle: string | null;
    badge: string | null;
    rating: number;
    reviewCount: number;
    stockStatus: string;
    images: unknown;
    specs: unknown;
    benefits: unknown;
  } | null;
}): ApiProduct {
  const detail = row.detail;
  const images = (detail?.images ?? []) as string[];
  const specs = (detail?.specs ?? []) as { label: string; value: string }[];
  const benefits = (detail?.benefits ?? []) as string[];
  const stockStatus = (detail?.stockStatus ?? 'Tersedia') as ApiProduct['stockStatus'];

  return {
    id: row.id,
    name: row.name,
    subtitle: detail?.subtitle ?? '',
    description: row.shortDescription,
    longDescription: detail?.description ?? '',
    price: row.sellPrice,
    originalPrice: row.strikeThroughPrice ?? undefined,
    category: row.category?.name ?? '',
    badge: detail?.badge ?? undefined,
    rating: detail?.rating ?? 0,
    reviewCount: detail?.reviewCount ?? 0,
    stockStatus,
    images,
    specs,
    benefits,
  };
}

async function ensureCategoryIdByName(name: string | undefined): Promise<string | null> {
  const trimmed = name?.trim();
  if (!trimmed) return null;

  const category = await prisma.category.upsert({
    where: { name: trimmed },
    update: { deletedAt: null },
    create: { name: trimmed },
    select: { id: true },
  });

  return category.id;
}

async function resetAndSeed(): Promise<void> {
  await prisma.productDetail.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();

  const categoryByName = new Map<string, { id: string }>();
  for (const name of seedCategories) {
    const c = await prisma.category.create({ data: { name } });
    categoryByName.set(name, { id: c.id });
  }

  for (const p of seedProducts) {
    const categoryId = categoryByName.get(p.category)?.id ?? null;
    const product = await prisma.product.create({
      data: {
        name: p.name,
        categoryId,
        shortDescription: p.description,
        sellPrice: p.price,
        strikeThroughPrice: p.originalPrice ?? null,
        purchasePrice: null,
      },
    });

    await prisma.productDetail.create({
      data: {
        productId: product.id,
        description: p.longDescription,
        specs: p.specs,
        marketplaceLinks: [],
        images: p.images,
        benefits: p.benefits,
        subtitle: p.subtitle,
        badge: p.badge ?? null,
        rating: p.rating,
        reviewCount: p.reviewCount,
        stockStatus: p.stockStatus,
      },
    });
  }
}

app.get('/api/health', (_req, res) => {
  res.json({ ok: true });
});

app.get('/api/categories', async (_req, res) => {
  const cats = await prisma.category.findMany({
    where: { deletedAt: null },
    orderBy: { name: 'asc' },
    select: { name: true },
  });
  res.json(cats.map((c) => c.name));
});

app.post('/api/categories', async (req, res) => {
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

app.delete('/api/categories', async (req, res) => {
  const name = String(req.body?.name ?? '').trim();
  if (!name) return res.status(400).json({ error: 'name is required' });

  await prisma.category.updateMany({
    where: { name, deletedAt: null },
    data: { deletedAt: new Date() },
  });

  res.json({ ok: true });
});

app.get('/api/products', async (_req, res) => {
  const rows = await prisma.product.findMany({
    where: { deletedAt: null },
    orderBy: { createdAt: 'desc' },
    include: {
      category: { select: { name: true } },
      detail: {
        where: { deletedAt: null },
        select: {
          description: true,
          subtitle: true,
          badge: true,
          rating: true,
          reviewCount: true,
          stockStatus: true,
          images: true,
          specs: true,
          benefits: true,
        },
      },
    },
  });

  res.json(rows.map((r) => toApiProduct({ ...r, detail: r.detail ?? null })));
});

app.get('/api/products/featured', async (_req, res) => {
  const rows = await prisma.product.findMany({
    where: {
      deletedAt: null,
      detail: {
        is: {
          deletedAt: null,
          badge: { in: ['Best Seller', 'New'] },
        },
      },
    },
    orderBy: { createdAt: 'desc' },
    take: 3,
    include: {
      category: { select: { name: true } },
      detail: {
        where: { deletedAt: null },
        select: {
          description: true,
          subtitle: true,
          badge: true,
          rating: true,
          reviewCount: true,
          stockStatus: true,
          images: true,
          specs: true,
          benefits: true,
        },
      },
    },
  });

  res.json(rows.map((r) => toApiProduct({ ...r, detail: r.detail ?? null })));
});

app.get('/api/products/:id', async (req, res) => {
  const id = String(req.params.id);
  const row = await prisma.product.findFirst({
    where: { id, deletedAt: null },
    include: {
      category: { select: { name: true } },
      detail: {
        where: { deletedAt: null },
        select: {
          description: true,
          subtitle: true,
          badge: true,
          rating: true,
          reviewCount: true,
          stockStatus: true,
          images: true,
          specs: true,
          benefits: true,
        },
      },
    },
  });

  if (!row) return res.status(404).json({ error: 'not found' });
  res.json(toApiProduct({ ...row, detail: row.detail ?? null }));
});

app.post('/api/products', async (req, res) => {
  const p = req.body as Partial<ApiProduct>;
  const name = String(p?.name ?? '').trim();
  console.log('Received product:', name);
  console.log('Images received:', p.images?.length || 0, 'images');
  console.log('First image length:', p.images?.[0]?.length || 0);
  
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
        marketplaceLinks: [],
        images: Array.isArray(p.images) ? p.images : [],
        benefits: Array.isArray(p.benefits) ? p.benefits : [],
        subtitle: String(p.subtitle ?? ''),
        badge: p.badge ? String(p.badge) : null,
        rating: typeof p.rating === 'number' ? p.rating : 0,
        reviewCount: typeof p.reviewCount === 'number' ? p.reviewCount : 0,
        stockStatus: String(p.stockStatus ?? 'Tersedia'),
      },
    });

    return product.id;
  });

  const row = await prisma.product.findFirst({
    where: { id: created },
    include: {
      category: { select: { name: true } },
      detail: {
        select: {
          description: true,
          subtitle: true,
          badge: true,
          rating: true,
          reviewCount: true,
          stockStatus: true,
          images: true,
          specs: true,
          benefits: true,
        },
      },
    },
  });

  res.json(row ? toApiProduct({ ...row, detail: row.detail ?? null }) : null);
});

app.put('/api/products/:id', async (req, res) => {
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
        images: Array.isArray(p.images) ? p.images : [],
        benefits: Array.isArray(p.benefits) ? p.benefits : [],
        subtitle: String(p.subtitle ?? ''),
        badge: p.badge ? String(p.badge) : null,
        rating: typeof p.rating === 'number' ? p.rating : 0,
        reviewCount: typeof p.reviewCount === 'number' ? p.reviewCount : 0,
        stockStatus: String(p.stockStatus ?? 'Tersedia'),
      },
    });
  });

  res.json({ ok: true });
});

app.delete('/api/products/:id', async (req, res) => {
  const id = String(req.params.id);
  const now = new Date();

  await prisma.$transaction(async (tx) => {
    await tx.product.updateMany({ where: { id, deletedAt: null }, data: { deletedAt: now } });
    await tx.productDetail.updateMany({ where: { productId: id, deletedAt: null }, data: { deletedAt: now } });
  });

  res.json({ ok: true });
});

app.post('/api/admin/reset', async (_req, res) => {
  await resetAndSeed();
  res.json({ ok: true });
});

const port = Number(process.env.PORT ?? 3001);
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`[jaxlab] api listening on http://localhost:${port}`);
});

