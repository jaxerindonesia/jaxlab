import type { MemberDto } from '../models/MemberDto';
import { api } from './client';

export type ProfileInput = Pick<MemberDto, 'name' | 'email' | 'address' | 'phoneWa' | 'shippingDestinationId' | 'shippingDestination' | 'province' | 'city' | 'postalCode'> & { currentPassword?: string };
export const getProfile = () => api<MemberDto>('/api/members/profile');
export const updateProfile = (profile: ProfileInput) => api<{ member: MemberDto; pendingEmail: string | null }>('/api/members/profile', {
  method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(profile),
}, 60_000);
export const requestPasswordReset = (email: string) => api<{ message: string }>('/api/members/forgot-password', {
  method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email }),
});
export const resetPassword = (token: string, password: string) => api<{ message: string }>('/api/members/reset-password', {
  method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ token, password }),
});
export const verifyEmail = (token: string) => api<{ message: string }>('/api/members/verify-email', {
  method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ token }),
});

export async function registerMember(payload: { name: string; email: string; address: string; phoneWa: string; password: string; shippingDestinationId: number; shippingDestination: string; province: string; city: string; postalCode: string; referredByCode?: string; isAffiliate: boolean; affiliatePhotos: string[] }): Promise<MemberDto> {
  return await api<MemberDto>('/api/members/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  }, 60000);
}

export type ReferralSummary = {
  referralCode: string;
  percentage: number;
  registeredCount: number;
  successfulCount: number;
  totalBonus: number;
};

export async function getReferralSummary(memberId: string): Promise<ReferralSummary> {
  return api<ReferralSummary>('/api/members/referral-summary', { headers: { 'x-member-id': memberId } });
}

export async function loginMember(payload: { email: string; password: string }): Promise<MemberDto> {
  return await api<MemberDto>('/api/members/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
}
