import type { CartItemDto } from './models/CartItemDto';
import { getMember } from './auth';
import { api } from './api/client';
import { toast } from 'sonner';

const cartKey = () => `jaxlab_cart:${getMember()?.id ?? 'guest'}`;
const CART_EVENT = 'jaxlab:cart-changed';
const syncing = new Map<string, Promise<boolean>>();

export function getCart(): CartItemDto[] {
  const raw = localStorage.getItem(cartKey());
  if (!raw) return [];
  try {
    const items = JSON.parse(raw);
    return Array.isArray(items) ? items.filter((item) => item && typeof item.productId === 'string' && Number.isSafeInteger(item.qty) && item.qty > 0 && item.qty <= 999) : [];
  } catch { return []; }
}

export function setCart(items: CartItemDto[]): void {
  const key = cartKey();
  localStorage.setItem(key, JSON.stringify(items));
  if (getMember()) localStorage.setItem(`${key}:dirty`, '1');
  window.dispatchEvent(new Event(CART_EVENT));
  void syncCart();
}

export function addToCart(productId: string, qty = 1): void {
  if (!Number.isSafeInteger(qty) || qty < 1) return;
  const cart = getCart();
  const idx = cart.findIndex((x) => x.productId === productId);
  if (idx >= 0) cart[idx].qty = Math.min(999, cart[idx].qty + qty);
  else cart.push({ productId, qty: Math.min(999, qty) });
  setCart(cart);
}

export function clearCart(): void { setCart([]); }

export const CART_CHANGED_EVENT = CART_EVENT;

export async function claimGuestCart(): Promise<void> {
  const member = getMember();
  if (!member) return;
  if (!await syncCart()) return;
  if (getMember()?.id !== member.id) return;
  const raw = localStorage.getItem('jaxlab_cart:guest');
  if (!raw) return;
  try {
    const guest: CartItemDto[] = JSON.parse(raw);
    if (!Array.isArray(guest) || !guest.length) return;
    const combined = getCart();
    for (const item of guest) {
      if (!item || typeof item.productId !== 'string' || !Number.isSafeInteger(item.qty) || item.qty < 1) continue;
      const existing = combined.find((entry) => entry.productId === item.productId);
      if (existing) existing.qty = Math.min(999, existing.qty + item.qty);
      else combined.push({ productId: item.productId, qty: Math.min(999, item.qty) });
    }
    setCart(combined);
    localStorage.removeItem('jaxlab_cart:guest');
  } catch { /* Ignore invalid guest data. */ }
}

export function syncCart(): Promise<boolean> {
  const member = getMember();
  if (!member) return Promise.resolve(false);
  const key = `jaxlab_cart:${member.id}`;
  const running = syncing.get(key);
  if (running) return running;
  const task = (async () => {
    try {
      do {
        if (getMember()?.id !== member.id) return false;
        if (localStorage.getItem(`${key}:dirty`)) {
          const snapshot = localStorage.getItem(key) ?? '[]';
          await api('/api/members/cart', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ memberId: member.id, items: JSON.parse(snapshot) }) });
          if (localStorage.getItem(key) === snapshot) localStorage.removeItem(`${key}:dirty`);
        } else {
          const result = await api<{ memberId: string; items: CartItemDto[] }>('/api/members/cart');
          if (getMember()?.id !== member.id || result.memberId !== member.id) return false;
          if (!localStorage.getItem(`${key}:dirty`)) {
            const next = JSON.stringify(result.items);
            if (localStorage.getItem(key) !== next) {
              localStorage.setItem(key, next);
              window.dispatchEvent(new Event(CART_EVENT));
            }
          }
        }
      } while (localStorage.getItem(`${key}:dirty`));
      return true;
    } catch (error) {
      if (getMember()?.id === member.id) toast.error(error instanceof Error ? error.message : 'Keranjang belum tersinkron. Coba kembali saat terhubung.', { id: 'cart-sync' });
      return false;
    }
  })().finally(() => syncing.delete(key));
  syncing.set(key, task);
  return task;
}
