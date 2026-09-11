import { api } from './client';

export async function getCategories(): Promise<string[]> {
  return await api<string[]>('/api/categories');
}

export async function addCategory(name: string): Promise<void> {
  await api<{ ok: true }>('/api/categories', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name }),
  });
}

export async function deleteCategory(name: string): Promise<void> {
  await api<{ ok: true }>('/api/categories', {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name }),
  });
}
