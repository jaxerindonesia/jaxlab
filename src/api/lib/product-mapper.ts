import type { ApiProduct } from '../contexts/product';

type ProductRow = {
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
    images: unknown;
    specs: unknown;
    benefits: unknown;
    marketplaceLinks: unknown;
  } | null;
  stockEntries?: { type: string; quantity: number }[];
};

function toStockStatus(balance: number): ApiProduct['stockStatus'] {
  if (balance <= 0) return 'Habis';
  if (balance <= 10) return 'Terbatas';
  return 'Tersedia';
}

export function toApiProduct(row: ProductRow): ApiProduct {
  const detail = row.detail;
  const balance = (row.stockEntries ?? []).reduce((sum, e) => {
    if (e.type === 'IN') return sum + e.quantity;
    if (e.type === 'OUT') return sum - e.quantity;
    return sum;
  }, 0);
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
    stockStatus: toStockStatus(balance),
    currentStock: balance,
    images: (detail?.images ?? []) as string[],
    specs: (detail?.specs ?? []) as { label: string; value: string }[],
    benefits: (detail?.benefits ?? []) as string[],
    marketplaceLinks: (detail?.marketplaceLinks ?? []) as { label: string; url: string }[],
  };
}
