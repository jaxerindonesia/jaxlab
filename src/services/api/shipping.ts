import { api } from './client';

export type ShippingDestination = { id: number; label: string; province_name: string; city_name: string; district_name: string; subdistrict_name: string; zip_code: string };
export type ShippingOption = { name: string; code: string; service: string; description: string; cost: number; etd: string };

export const searchShippingDestinations = (search: string) =>
  api<ShippingDestination[]>(`/api/shipping/destinations?search=${encodeURIComponent(search)}`);

export const getShippingCosts = (destinationId: number, quantity: number) =>
  api<ShippingOption[]>('/api/shipping/costs', {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ destinationId, quantity }),
  });
