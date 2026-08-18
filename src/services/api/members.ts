import type { MemberDto } from '../models/MemberDto';
import { api } from './client';

export async function registerMember(payload: { name: string; email: string; address: string; phoneWa: string; password: string; shippingDestinationId: number; shippingDestination: string; province: string; city: string; postalCode: string; referredByCode?: string }): Promise<MemberDto> {
  return await api<MemberDto>('/api/members/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
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
