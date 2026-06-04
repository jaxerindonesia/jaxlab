import {
  seedCategories,
  seedCompanyInfo,
  seedFeatures,
  seedProducts,
  seedStats,
  seedTestimonials,
} from '../../../prisma/seed-data.ts';
import { prisma } from './prisma';

export async function ensureCategoryIdByName(name: string | undefined): Promise<string | null> {
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

export async function resetAndSeed(): Promise<void> {
  await prisma.productDetail.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.badge.deleteMany();
  await prisma.testimonial.deleteMany();
  await prisma.feature.deleteMany();
  await prisma.stat.deleteMany();
  await prisma.companyInfo.deleteMany();

  const categoryByName = new Map<string, { id: string }>();
  for (const name of seedCategories) {
    const c = await prisma.category.create({ data: { name } });
    categoryByName.set(name, { id: c.id });
  }

  const seedBadges = Array.from(new Set(seedProducts.map((p) => p.badge).filter(Boolean))) as string[];
  for (const name of seedBadges) {
    await prisma.badge.create({ data: { name } });
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
      },
    });
  }

  await prisma.companyInfo.create({
    data: {
      ...seedCompanyInfo,
      socialMedia: seedCompanyInfo.socialMedia,
    },
  });
  await prisma.testimonial.createMany({ data: seedTestimonials.map((t) => ({ ...t })) });
  await prisma.feature.createMany({ data: seedFeatures.map((f) => ({ ...f })) });
  await prisma.stat.createMany({ data: seedStats.map((s) => ({ ...s })) });
}
