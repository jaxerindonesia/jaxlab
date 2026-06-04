import type { MemberDto } from '../models/MemberDto';
import { api } from './client';

export async function registerMember(payload: { name: string; email: string; address: string; phoneWa: string; password: string }): Promise<MemberDto> {
  return await api<MemberDto>('/api/members/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
}

export async function loginMember(payload: { email: string; password: string }): Promise<MemberDto> {
  return await api<MemberDto>('/api/members/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
}
