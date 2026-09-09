import type { MemberDto } from './models/MemberDto';

const KEY = 'jaxlab_member';
const AUTH_EVENT = 'jaxlab:auth-changed';

export function getMember(): MemberDto | null {
  const raw = localStorage.getItem(KEY);
  if (!raw) return null;
  try {
    const member = JSON.parse(raw) as MemberDto;
    return member.id && Date.parse(member.expiresAt) > Date.now() ? member : null;
  } catch { return null; }
}

export function setMember(member: MemberDto): void {
  localStorage.setItem(KEY, JSON.stringify(member));
  window.dispatchEvent(new Event(AUTH_EVENT));
}

export function clearMember(): void {
  void fetch('/api/members/logout', { method: 'POST' }).catch(() => undefined);
  forgetMember();
}

export function forgetMember(): void {
  localStorage.removeItem(KEY);
  window.dispatchEvent(new Event(AUTH_EVENT));
}

export function isMemberLoggedIn(): boolean {
  return !!getMember();
}

export const AUTH_CHANGED_EVENT = AUTH_EVENT;

export function watchSession(onExpire: () => void): () => void {
  let timer: ReturnType<typeof setTimeout>;
  const check = () => {
    clearTimeout(timer);
    const raw = localStorage.getItem(KEY);
    const member = getMember();
    if (raw && !member) { forgetMember(); onExpire(); return; }
    if (member) timer = setTimeout(check, Math.max(1, Date.parse(member.expiresAt) - Date.now()));
  };
  check();
  window.addEventListener(AUTH_EVENT, check);
  window.addEventListener('storage', check);
  window.addEventListener('focus', check);
  document.addEventListener('visibilitychange', check);
  return () => {
    clearTimeout(timer);
    window.removeEventListener(AUTH_EVENT, check);
    window.removeEventListener('storage', check);
    window.removeEventListener('focus', check);
    document.removeEventListener('visibilitychange', check);
  };
}
