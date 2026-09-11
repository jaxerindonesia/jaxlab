import { createHash } from 'node:crypto';
import type { ApiProduct } from '../contexts/product';

type ImageAsset = { bytes: Buffer; mime: string };
const assets = new Map<string, ImageAsset>();
let size = 0;
const MAX_BYTES = 32 * 1024 * 1024;

export function decodeProductImage(source: string): ImageAsset | null {
  const match = /^data:(image\/(?:png|jpeg|webp|gif|avif));base64,([A-Za-z0-9+/=\s]+)$/.exec(source);
  return match ? { mime: match[1], bytes: Buffer.from(match[2], 'base64') } : null;
}

export function getCachedProductImage(key: string) { return assets.get(key); }

export function withProductImageUrls(product: ApiProduct): ApiProduct {
  return { ...product, images: product.images.map((source, index) => {
    if (!source.startsWith('data:image/')) return source;
    const version = createHash('sha256').update(source).digest('hex').slice(0, 20);
    const key = `${product.id}/${index}/${version}`;
    if (!assets.has(key)) {
      const asset = decodeProductImage(source);
      if (!asset) return source;
      if (asset.bytes.length <= MAX_BYTES) {
        while (size + asset.bytes.length > MAX_BYTES && assets.size) {
          const oldest = assets.keys().next().value!;
          size -= assets.get(oldest)!.bytes.length;
          assets.delete(oldest);
        }
        assets.set(key, asset);
        size += asset.bytes.length;
      }
    }
    return `/api/products/${encodeURIComponent(product.id)}/images/${index}?v=${version}`;
  }) };
}
