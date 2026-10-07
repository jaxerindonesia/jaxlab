import { PrismaClient } from '@prisma/client';

const db = new PrismaClient();
const remote = 'https://jaxlabofficial.id/api/products';

type Product = {
  id: string; name: string; subtitle: string; description: string; longDescription: string;
  price: number; originalPrice?: number; category: string; badge?: string; rating: number;
  reviewCount: number; images: string[]; specs: unknown[]; benefits: string[];
  marketplaceLinks: unknown[];
};

const list = await fetch(remote).then(async (response) => {
  if (!response.ok) throw new Error(`Production API ${response.status}`);
  return response.json() as Promise<Product[]>;
});
const full = await Promise.all(list.map((product) => fetch(`${remote}/${product.id}?images=inline`).then((response) => response.json() as Promise<Product>)));
if (!full.length) throw new Error('Production API tidak mengembalikan produk');

await db.$transaction(async (tx) => {
  const ids = full.map((product) => product.id);
  await tx.product.updateMany({ where: { id: { notIn: ids }, deletedAt: null }, data: { deletedAt: new Date() } });
  for (const product of full) {
    const category = await tx.category.upsert({ where: { name: product.category || 'Jaxlab' }, update: { deletedAt: null }, create: { name: product.category || 'Jaxlab' } });
    await tx.product.upsert({
      where: { id: product.id },
      update: { name: product.name, categoryId: category.id, shortDescription: product.description, sellPrice: product.price, strikeThroughPrice: product.originalPrice ?? null, deletedAt: null },
      create: { id: product.id, name: product.name, categoryId: category.id, shortDescription: product.description, sellPrice: product.price, strikeThroughPrice: product.originalPrice ?? null },
    });
    await tx.productDetail.upsert({
      where: { productId: product.id },
      update: { description: product.longDescription, subtitle: product.subtitle, badge: product.badge ?? null, rating: product.rating, reviewCount: product.reviewCount, images: product.images, specs: product.specs, benefits: product.benefits, marketplaceLinks: product.marketplaceLinks, deletedAt: null },
      create: { productId: product.id, description: product.longDescription, subtitle: product.subtitle, badge: product.badge ?? null, rating: product.rating, reviewCount: product.reviewCount, images: product.images, specs: product.specs, benefits: product.benefits, marketplaceLinks: product.marketplaceLinks },
    });
  }
});
console.log(`Synced ${full.length} products from ${remote}`);
await db.$disconnect();
