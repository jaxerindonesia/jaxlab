import assert from 'node:assert/strict';
import { test } from 'node:test';
import { calculateShipping } from './shipping';
import { getProductWeight } from '../lib/product-weight';

test('RajaOngkir request and failure handling', async () => {
  const originalFetch = globalThis.fetch;
  const originalEnv = { ...process.env };
  process.env.RAJAONGKIR_API_KEY = 'test-key';
  process.env.RAJAONGKIR_ORIGIN_ID = '31555';
  process.env.RAJAONGKIR_BASE_URL = 'https://rajaongkir.komerce.id/api/v1';
  process.env.RAJAONGKIR_COURIERS = 'jne:jnt';
  process.env.RAJAONGKIR_DEFAULT_WEIGHT_GRAMS = '1000';
  try {
    const option = { name: 'JNE', code: 'jne', service: 'REG', description: 'Regular', cost: 16000, etd: '2 day' };
    globalThis.fetch = async (url, init) => {
      assert.equal(String(url), 'https://rajaongkir.komerce.id/api/v1/calculate/domestic-cost');
      assert.equal(new Headers(init?.headers).get('key'), 'test-key');
      assert.equal(init?.method, 'POST');
      const body = new URLSearchParams(String(init?.body));
      assert.equal(body.get('origin'), '31555');
      assert.equal(body.get('destination'), '17473');
      assert.equal(body.get('weight'), '3000');
      assert.equal(body.get('courier'), 'jne:jnt');
      return Response.json({ meta: { code: 200, status: 'success' }, data: [option] });
    };
    assert.deepEqual(await calculateShipping(17473, getProductWeight([]).weightGrams * 3), [option]);
    assert.equal(getProductWeight([{ label: 'Berat pengiriman', value: '1,5 kg' }]).weightGrams, 1500);
    await assert.rejects(calculateShipping(0, 1000), /Tujuan/);
    await assert.rejects(calculateShipping(17473, NaN), /Berat/);
    globalThis.fetch = async () => Response.json({ meta: { code: 400, status: 'error', message: 'Quota exceeded' }, data: null });
    await assert.rejects(calculateShipping(17473, 1000), /Quota exceeded/);
    globalThis.fetch = async () => Response.json({ data: [{ ...option, cost: -1 }] });
    await assert.rejects(calculateShipping(17473, 1000), /Tarif/);
    globalThis.fetch = async () => Response.json({ data: [] });
    assert.deepEqual(await calculateShipping(17473, 1000), []);
    globalThis.fetch = async () => Response.json({ data: null });
    await assert.rejects(calculateShipping(17473, 1000), /Respons/);
  } finally {
    globalThis.fetch = originalFetch;
    process.env = originalEnv;
  }
});
