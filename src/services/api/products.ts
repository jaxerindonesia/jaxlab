import type { ProductDto } from '../models/ProductDto';
import { api } from './client';
import { cachedProducts, clearProductCache } from './product-cache';

export async function getAllProducts(): Promise<ProductDto[]> {
  return cachedProducts('all', () => api<ProductDto[]>('/api/products'));
}

export async function getProductById(id: string, inlineImages = false): Promise<ProductDto | null> {
  return await api<ProductDto>(`/api/products/${encodeURIComponent(id)}${inlineImages ? '?images=inline' : ''}`).catch(() => null);
}

export async function getFeaturedProducts(): Promise<ProductDto[]> {
  return cachedProducts('featured', () => api<ProductDto[]>('/api/products/featured'));
}

export async function addProduct(product: Omit<ProductDto, 'id'>): Promise<ProductDto | null> {
  const created = await api<ProductDto | null>('/api/products', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(product),
  });
  clearProductCache();
  return created;
}

export async function updateProduct(product: ProductDto): Promise<void> {
  await api<{ ok: true }>(`/api/products/${encodeURIComponent(product.id)}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(product),
  });
  clearProductCache();
}

export async function deleteProduct(id: string): Promise<void> {
  await api<{ ok: true }>(`/api/products/${encodeURIComponent(id)}`, { method: 'DELETE' });
  clearProductCache();
}

export async function addStockEntry(
  id: string,
  payload: { type: 'IN' | 'OUT'; quantity: number; note?: string }
): Promise<void> {
  await api<{ ok: true }>(`/api/products/${encodeURIComponent(id)}/stock-entries`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  clearProductCache();
}
