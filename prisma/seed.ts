import { PrismaClient } from '@prisma/client';
import { seedCategories, seedProducts } from './seed-data.ts';

const prisma = new PrismaClient();

async function main() {
  await prisma.productDetail.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();

  const categoryByName = new Map<string, { id: string }>();
  for (const name of seedCategories) {
    const c = await prisma.category.create({ data: { name } });
    categoryByName.set(name, { id: c.id });
  }

  for (const p of seedProducts) {
    const categoryId = categoryByName.get(p.category)?.id;
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

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

