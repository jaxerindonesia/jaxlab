import type { MemberDto } from './models/MemberDto';

const KEY = 'jaxlab_member';
const AUTH_EVENT = 'jaxlab:auth-changed';

export function getMember(): MemberDto | null {
  const raw = localStorage.getItem(KEY);
  if (!raw) return null;
  try { return JSON.parse(raw) as MemberDto; } catch { return null; }
}

export function setMember(member: MemberDto): void {
  localStorage.setItem(KEY, JSON.stringify(member));
  window.dispatchEvent(new Event(AUTH_EVENT));
}

export function clearMember(): void {
  localStorage.removeItem(KEY);
  window.dispatchEvent(new Event(AUTH_EVENT));
}

export function isMemberLoggedIn(): boolean {
  return !!getMember();
}

export const AUTH_CHANGED_EVENT = AUTH_EVENT;
