import { api } from './client';

export async function initDB(): Promise<void> {
  await api<{ ok: true }>('/api/health');
}
