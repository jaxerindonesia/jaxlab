import { api } from './client';

export type ShippingDestination = { id: number; label: string; province_name: string; city_name: string; district_name: string; subdistrict_name: string; zip_code: string };
export type ShippingOption = { name: string; code: string; service: string; description: string; cost: number; etd: string };

export const searchShippingDestinations = (search: string, offset = 0, signal?: AbortSignal) =>
  api<ShippingDestination[]>(`/api/shipping/destinations?search=${encodeURIComponent(search)}&offset=${offset}`, { signal });

export const getShippingCosts = (destinationId: number, items: { productId: string; qty: number }[], signal?: AbortSignal) =>
  api<ShippingOption[]>('/api/shipping/costs', {
    method: 'POST', headers: { 'Content-Type': 'application/json' }, signal,
    body: JSON.stringify({ destinationId, items }),
  });
