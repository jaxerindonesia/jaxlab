import { api } from './client';

export async function loginAdmin(password: string): Promise<void> {
  await api<{ ok: true }>('/api/admin/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ password }),
  });
}

export async function resetToDefaults(): Promise<void> {
  await api<{ ok: true }>('/api/admin/reset', { method: 'POST' });
}

export const getReferralSetting = () => api<{ percentage: number }>('/api/admin/referral-setting');

export const updateReferralSetting = (percentage: number) => api<{ percentage: number }>('/api/admin/referral-setting', {
  method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ percentage }),
});
