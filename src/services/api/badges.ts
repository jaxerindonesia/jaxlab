import { api } from './client';

export async function getBadges(): Promise<string[]> {
  return await api<string[]>('/api/badges');
}

export async function addBadge(name: string): Promise<void> {
  await api<{ ok: true }>('/api/badges', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name }),
  });
}

export async function deleteBadge(name: string): Promise<void> {
  await api<{ ok: true }>('/api/badges', {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name }),
  });
}
