import assert from 'node:assert/strict';
import { test } from 'node:test';
import { createShippingCache } from './shipping-cache';

test('quotes share in-flight requests, expire, and separate destinations/weights', async () => {
  const originalNow = Date.now;
  let now = 1000;
  Date.now = () => now;
  try {
    const quote = createShippingCache<number>();
    let calls = 0;
    const fetcher = async () => ++calls;
    assert.deepEqual(await Promise.all([quote('A:1000', fetcher), quote('A:1000', fetcher)]), [1, 1]);
    assert.equal(await quote('A:1000', fetcher), 1);
    assert.equal(await quote('B:1000', fetcher), 2);
    assert.equal(await quote('A:2000', fetcher), 3);
    now += 15_001;
    assert.equal(await quote('A:1000', fetcher), 4);
  } finally { Date.now = originalNow; }
});

test('failed quotes can be retried and cache size is bounded', async () => {
  const quote = createShippingCache<number>(15_000, 2);
  await assert.rejects(quote('a', async () => { throw new Error('timeout'); }), /timeout/);
  assert.equal(await quote('a', async () => 1), 1);
  await quote('b', async () => 2);
  await quote('c', async () => 3);
  assert.equal(await quote('a', async () => 4), 4);
});
