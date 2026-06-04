import type { CartItemDto } from './models/CartItemDto';

const KEY = 'jaxlab_cart';
const CART_EVENT = 'jaxlab:cart-changed';

export function getCart(): CartItemDto[] {
  const raw = localStorage.getItem(KEY);
  if (!raw) return [];
  try { return JSON.parse(raw) as CartItemDto[]; } catch { return []; }
}

export function setCart(items: CartItemDto[]): void {
  localStorage.setItem(KEY, JSON.stringify(items));
  window.dispatchEvent(new Event(CART_EVENT));
}

export function addToCart(productId: string, qty = 1): void {
  const cart = getCart();
  const idx = cart.findIndex((x) => x.productId === productId);
  if (idx >= 0) cart[idx].qty += qty;
  else cart.push({ productId, qty });
  setCart(cart);
}

export function clearCart(): void { setCart([]); }

export const CART_CHANGED_EVENT = CART_EVENT;
