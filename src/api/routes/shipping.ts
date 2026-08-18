import { Router } from 'express';

export const router = Router();

const baseUrl = () => (process.env.RAJAONGKIR_BASE_URL ?? 'https://rajaongkir.komerce.id/api/v1').replace(/\/$/, '');
const apiKey = () => {
  const key = process.env.RAJAONGKIR_API_KEY ?? '';
  if (!key) throw new Error('RAJAONGKIR_API_KEY belum di-set');
  return key;
};

export type ShippingOption = {
  name: string;
  code: string;
  service: string;
  description: string;
  cost: number;
  etd: string;
};

async function rajaOngkir(path: string, init?: RequestInit) {
  const response = await fetch(`${baseUrl()}${path}`, {
    ...init,
    headers: { key: apiKey(), ...init?.headers },
    signal: AbortSignal.timeout(12_000),
  });
  const body = await response.json().catch(() => null) as { data?: unknown; meta?: { message?: string } } | null;
  if (!response.ok || !body) throw new Error(body?.meta?.message || `RajaOngkir error ${response.status}`);
  return body.data;
}

export async function calculateShipping(destinationId: number, weight: number): Promise<ShippingOption[]> {
  const origin = Number(process.env.RAJAONGKIR_ORIGIN_ID);
  if (!Number.isInteger(origin) || origin <= 0) throw new Error('RAJAONGKIR_ORIGIN_ID belum valid');
  const form = new URLSearchParams({
    origin: String(origin),
    destination: String(destinationId),
    weight: String(Math.max(1, Math.round(weight))),
    courier: process.env.RAJAONGKIR_COURIERS ?? 'jne:sicepat:jnt:anteraja:pos:tiki',
    price: 'lowest',
  });
  const data = await rajaOngkir('/calculate/domestic-cost', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: form,
  });
  return Array.isArray(data) ? data as ShippingOption[] : [];
}

router.get('/destinations', async (req, res) => {
  const search = String(req.query.search ?? '').trim();
  if (search.length < 3) return res.status(400).json({ error: 'Ketik minimal 3 karakter' });
  try {
    const params = new URLSearchParams({ search, limit: '10', offset: '0' });
    const data = await rajaOngkir(`/destination/domestic-destination?${params}`);
    return res.json(Array.isArray(data) ? data : []);
  } catch (error) {
    return res.status(502).json({ error: error instanceof Error ? error.message : 'Gagal mencari tujuan' });
  }
});

router.post('/costs', async (req, res) => {
  const destinationId = Number(req.body?.destinationId);
  const quantity = Math.max(1, Number(req.body?.quantity ?? 1));
  if (!Number.isInteger(destinationId) || destinationId <= 0) return res.status(400).json({ error: 'Tujuan tidak valid' });
  try {
    const gramsPerItem = Math.max(1, Number(process.env.RAJAONGKIR_DEFAULT_WEIGHT_GRAMS ?? 1000));
    return res.json(await calculateShipping(destinationId, quantity * gramsPerItem));
  } catch (error) {
    return res.status(502).json({ error: error instanceof Error ? error.message : 'Gagal menghitung ongkir' });
  }
});
