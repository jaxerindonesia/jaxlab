import { Router } from 'express';
import { prisma } from '../lib/prisma';
import { getProductWeight } from '../lib/product-weight';
import { createShippingCache } from '../lib/shipping-cache';

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

const cachedQuote = createShippingCache<ShippingOption[]>(60_000);
const cachedDestinations = createShippingCache<unknown>(60_000);

async function rajaOngkir(path: string, init?: RequestInit, timeoutMs = 8_000) {
  const timerLabel = `rajaongkir-request-${Date.now()}-${Math.random().toString(36).slice(2)}`;
  console.time(timerLabel);
  try {
    const response = await fetch(`${baseUrl()}${path}`, {
      ...init,
      headers: { key: apiKey(), ...init?.headers },
      signal: AbortSignal.timeout(timeoutMs),
    });
    const body = await response.json().catch(() => null) as { data?: unknown; meta?: { code?: number; status?: string; message?: string } } | null;
    if (!response.ok || !body || (body.meta?.code !== undefined && body.meta.code >= 400) || body.meta?.status === 'error') {
      throw new Error(body?.meta?.message || `RajaOngkir error ${response.status}`);
    }
    return body.data;
  } finally {
    console.timeEnd(timerLabel);
  }
}

export async function calculateShipping(destinationId: number, weight: number): Promise<ShippingOption[]> {
  if (!Number.isInteger(destinationId) || destinationId <= 0) throw new Error('Tujuan pengiriman belum valid');
  if (!Number.isFinite(weight) || weight <= 0) throw new Error('Berat pengiriman belum valid');
  const origin = Number(process.env.RAJAONGKIR_ORIGIN_ID);
  if (!Number.isInteger(origin) || origin <= 0) throw new Error('RAJAONGKIR_ORIGIN_ID belum valid');
  const couriers = [...new Set((process.env.RAJAONGKIR_COURIERS ?? 'jne:sicepat:jnt:tiki:lion:pos:ncs:rpx:sentral:star:wahana').split(':').map(code => code.trim()).filter(Boolean))];
  const request = (courier: string, timeoutMs?: number) => {
    const form = new URLSearchParams({
      origin: String(origin),
      destination: String(destinationId),
      weight: String(Math.max(1, Math.round(weight))),
      courier,
      price: 'lowest',
    });
    return rajaOngkir('/calculate/domestic-cost', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: form,
    }, timeoutMs);
  };
  const validate = (data: unknown): ShippingOption[] => {
    if (!Array.isArray(data)) throw new Error('Respons tarif RajaOngkir tidak valid');
    if (data.some((option) => !option || typeof option !== 'object' || !Number.isFinite(Number((option as { cost?: unknown }).cost)) || Number((option as { cost?: unknown }).cost) < 0)) {
      throw new Error('Tarif RajaOngkir tidak valid');
    }
    return data as ShippingOption[];
  };

  if (couriers.length <= 3) return validate(await request(couriers.join(':')));

  const results = await Promise.allSettled(couriers.map(courier => request(courier, 2_500).then(validate)));
  const options = results.flatMap(result => result.status === 'fulfilled' ? result.value : []);
  const unique = new Map(options.map(option => [`${option.code}:${option.service}`, option]));
  if (unique.size) return [...unique.values()];
  const failure = results.find((result): result is PromiseRejectedResult => result.status === 'rejected')?.reason;
  throw failure instanceof Error ? failure : new Error('RajaOngkir tidak mengembalikan tarif');
}

router.get('/destinations', async (req, res) => {
  const search = String(req.query.search ?? '').trim();
  const offset = Number(req.query.offset ?? 0);
  if (!Number.isSafeInteger(offset) || offset < 0) return res.status(400).json({ error: 'Halaman pencarian tidak valid' });
  if (search.length < 3) return res.status(400).json({ error: 'Ketik minimal 3 karakter' });
  try {
    const params = new URLSearchParams({ search, limit: '10', offset: String(offset) });
    const key = JSON.stringify([baseUrl(), search.toLocaleLowerCase('id'), offset]);
    const data = await cachedDestinations(key, () => rajaOngkir(`/destination/domestic-destination?${params}`));
    return res.json(Array.isArray(data) ? data : []);
  } catch (error) {
    return res.status(502).json({ error: error instanceof Error ? error.message : 'Gagal mencari tujuan' });
  }
});

router.post('/costs', async (req, res) => {
  const totalTimer = `shipping-total-${Date.now()}-${Math.random().toString(36).slice(2)}`;
  console.time(totalTimer);
  const destinationId = Number(req.body?.destinationId);
  const items = req.body?.items as { productId: string; qty: number }[];
  if (!Array.isArray(items) || !items.length || items.some((item) => !item || typeof item.productId !== 'string' || !Number.isSafeInteger(item.qty) || item.qty <= 0)) {
    console.timeEnd(totalTimer);
    return res.status(400).json({ error: 'Barang tidak valid' });
  }
  if (!Number.isInteger(destinationId) || destinationId <= 0) {
    console.timeEnd(totalTimer);
    return res.status(400).json({ error: 'Tujuan tidak valid' });
  }
  try {
    console.time(`${totalTimer}-database`);
    const products = await prisma.product.findMany({
      where: { id: { in: items.map((item) => item.productId) }, deletedAt: null },
      select: { id: true, detail: { where: { deletedAt: null }, select: { specs: true } } },
    });
    console.timeEnd(`${totalTimer}-database`);
    const weights = new Map(products.map((product) => [product.id, getProductWeight(product.detail?.specs).weightGrams]));
    if (items.some((item) => !weights.has(item.productId))) return res.status(400).json({ error: 'Produk tidak tersedia' });
    const weight = items.reduce((sum, item) => sum + weights.get(item.productId)! * item.qty, 0);
    const key = JSON.stringify([baseUrl(), process.env.RAJAONGKIR_ORIGIN_ID, process.env.RAJAONGKIR_COURIERS, destinationId, weight]);
    return res.json(await cachedQuote(key, () => calculateShipping(destinationId, weight)));
  } catch (error) {
    return res.status(502).json({ error: error instanceof Error ? error.message : 'Gagal menghitung ongkir' });
  } finally {
    console.timeEnd(totalTimer);
  }
});
