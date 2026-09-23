import { api } from './client';

export type ShippingDestination = { id: number; label: string; province_name: string; city_name: string; district_name: string; subdistrict_name: string; zip_code: string };
export type ShippingOption = { name: string; code: string; service: string; description: string; cost: number; etd: string };

const TTL_MS = 2 * 60 * 1000;

type CostEntry = { value?: ShippingOption[]; expiresAt: number; pending?: Promise<ShippingOption[]> };
type DestinationEntry = { value?: ShippingDestination[]; expiresAt: number; pending?: Promise<ShippingDestination[]> };

const costCache = new Map<string, CostEntry>();
const destCache = new Map<string, DestinationEntry>();

function signature(destinationId: number, items: { productId: string; qty: number }[]) {
  const sorted = [...items].sort((a, b) => a.productId.localeCompare(b.productId));
  return `${destinationId}:${sorted.map((i) => `${i.productId}:${i.qty}`).join(',')}`;
}

export const searchShippingDestinations = (search: string, offset = 0, signal?: AbortSignal) => {
  const key = `${search.toLowerCase().trim()}:${offset}`;
  const existing = destCache.get(key);
  if (existing?.pending) return existing.pending;
  if (existing && existing.expiresAt > Date.now()) return Promise.resolve(existing.value as ShippingDestination[]);

  const entry: DestinationEntry = { expiresAt: 0 };
  const pending = Promise.resolve().then(async () => {
    const value = await api<ShippingDestination[]>(`/api/shipping/destinations?search=${encodeURIComponent(search)}&offset=${offset}`, { signal });
    if (destCache.get(key) === entry) {
      entry.value = value;
      entry.expiresAt = Date.now() + TTL_MS;
      entry.pending = undefined;
    }
    return value;
  }).catch((err) => {
    if (destCache.get(key) === entry) destCache.delete(key);
    throw err;
  });
  entry.pending = pending;
  destCache.set(key, entry);
  return pending;
};

export const getShippingCosts = (destinationId: number, items: { productId: string; qty: number }[], signal?: AbortSignal) => {
  const key = signature(destinationId, items);
  const existing = costCache.get(key);
  if (existing?.pending) return existing.pending;
  if (existing && existing.expiresAt > Date.now()) return Promise.resolve(existing.value as ShippingOption[]);

  const entry: CostEntry = { expiresAt: 0 };
  const pending = Promise.resolve().then(async () => {
    const value = await api<ShippingOption[]>('/api/shipping/costs', {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, signal,
      body: JSON.stringify({ destinationId, items }),
    });
    if (costCache.get(key) === entry) {
      entry.value = value;
      entry.expiresAt = Date.now() + TTL_MS;
      entry.pending = undefined;
    }
    return value;
  }).catch((err) => {
    if (costCache.get(key) === entry) costCache.delete(key);
    throw err;
  });
  entry.pending = pending;
  costCache.set(key, entry);
  return pending;
};

export function clearShippingCache(): void {
  costCache.clear();
  destCache.clear();
}
