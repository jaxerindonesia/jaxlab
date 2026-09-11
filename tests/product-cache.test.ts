import assert from 'node:assert/strict';
import { afterEach, test } from 'node:test';
import { cachedProducts, clearProductCache } from '../src/services/api/product-cache.ts';

afterEach(clearProductCache);

test('shares concurrent requests and reuses completed catalogue data', async () => {
  let calls = 0;
  const fetcher = async () => { calls += 1; return ['product']; };
  const results = await Promise.all([cachedProducts('all', fetcher), cachedProducts('all', fetcher)]);
  assert.deepEqual(results, [['product'], ['product']]);
  assert.deepEqual(await cachedProducts('all', fetcher), ['product']);
  assert.equal(calls, 1);
});

test('expired data is fetched again', async (t) => {
  t.mock.method(Date, 'now', () => 1000);
  let calls = 0;
  const fetcher = async () => ++calls;
  assert.equal(await cachedProducts('all', fetcher), 1);
  t.mock.method(Date, 'now', () => 31_001);
  assert.equal(await cachedProducts('all', fetcher), 2);
});

test('a failed request is not cached', async () => {
  await assert.rejects(cachedProducts('all', async () => { throw new Error('offline'); }));
  assert.equal(await cachedProducts('all', async () => 'recovered'), 'recovered');
});

test('invalidated in-flight data cannot replace a fresh result', async () => {
  let resolveOld!: (value: string) => void;
  const old = cachedProducts('all', () => new Promise<string>((resolve) => { resolveOld = resolve; }));
  await Promise.resolve();
  clearProductCache();
  assert.equal(await cachedProducts('all', async () => 'new'), 'new');
  resolveOld('old');
  await old;
  assert.equal(await cachedProducts('all', async () => 'unexpected'), 'new');
});
