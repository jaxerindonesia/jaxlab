import type { ProductDto } from '../models/ProductDto';
import { api } from './client';

export async function getAllProducts(): Promise<ProductDto[]> {
  return await api<ProductDto[]>('/api/products');
}

export async function getProductById(id: string): Promise<ProductDto | null> {
  return await api<ProductDto>(`/api/products/${encodeURIComponent(id)}`).catch(() => null);
}

export async function getFeaturedProducts(): Promise<ProductDto[]> {
  return await api<ProductDto[]>('/api/products/featured');
}

export async function addProduct(product: Omit<ProductDto, 'id'>): Promise<ProductDto | null> {
  return await api<ProductDto | null>('/api/products', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(product),
  });
}

export async function updateProduct(product: ProductDto): Promise<void> {
  await api<{ ok: true }>(`/api/products/${encodeURIComponent(product.id)}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(product),
  });
}

export async function deleteProduct(id: string): Promise<void> {
  await api<{ ok: true }>(`/api/products/${encodeURIComponent(id)}`, { method: 'DELETE' });
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
}
