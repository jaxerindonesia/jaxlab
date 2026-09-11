import assert from 'node:assert/strict';
import { randomUUID } from 'node:crypto';
import { test } from 'node:test';
import express from 'express';
import { router } from './members';
import { router as orders } from './orders';
import { prisma } from '../lib/prisma';

test('member sessions, affiliate uploads and account cart isolation', async () => {
  const app = express();
  app.use(express.json({ limit: '20mb' }));
  app.use('/api/members', router);
  app.use('/api/orders', orders);
  const server = app.listen(0, '127.0.0.1');
  await new Promise<void>((resolve) => server.once('listening', resolve));
  const address = server.address() as { port: number };
  const base = `http://127.0.0.1:${address.port}/api`;
  const emails: string[] = [];
  const send = (path: string, body?: unknown, cookie = '', method = 'POST') => fetch(`${base}${path}`, { method, headers: { 'Content-Type': 'application/json', cookie }, ...(body === undefined ? {} : { body: JSON.stringify(body) }) });
  const payload = () => {
    const email = `test-${randomUUID()}@example.invalid`;
    emails.push(email);
    return { email, name: 'Integration test', password: randomUUID(), address: 'Test only', phoneWa: '0800000000', shippingDestinationId: 68423, shippingDestination: 'Test destination', province: 'Test', city: 'Test', postalCode: '12345', isAffiliate: false };
  };
  try {
    const one = payload();
    const invalid = await send('/members/login', { email: one.email, password: 'wrong' });
    assert.equal(invalid.status, 401);
    assert.match((await invalid.json()).error, /Email atau password salah/);
    const first = await send('/members/register', one);
    assert.equal(first.status, 200);
    const memberA = await first.json();
    const cookieA = first.headers.get('set-cookie')!.split(';')[0];
    assert.match(first.headers.get('set-cookie')!, /HttpOnly/);
    assert.ok(Math.abs(Date.parse(memberA.expiresAt) - Date.now() - 86400000) < 5000);
    assert.equal(memberA.isAffiliate, false);
    assert.equal('passwordHash' in memberA, false);
    assert.equal((await send('/members/register', { ...payload(), isAffiliate: true, affiliatePhotos: [] })).status, 400);
    assert.equal((await send('/members/register', { ...payload(), isAffiliate: true, affiliatePhotos: ['data:image/png;base64,aGVsbG8='] })).status, 400);
    const image = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+jRZkAAAAASUVORK5CYII=';
    const two = payload();
    const second = await send('/members/register', { ...two, isAffiliate: true, affiliatePhotos: [image] });
    assert.equal(second.status, 200);
    const memberB = await second.json();
    const cookieB = second.headers.get('set-cookie')!.split(';')[0];
    assert.equal(memberB.isAffiliate, true);
    assert.deepEqual((await prisma.member.findUniqueOrThrow({ where: { id: memberB.id }, select: { affiliatePhotos: true } })).affiliatePhotos, [image]);
    assert.equal((await send('/members/cart', { memberId: memberA.id, items: [{ productId: 'test-product', qty: 2 }] }, cookieA, 'PUT')).status, 200);
    assert.deepEqual((await (await send('/members/cart', undefined, cookieB, 'GET')).json()).items, []);
    assert.equal((await send('/members/cart', { memberId: memberA.id, items: [] }, cookieB, 'PUT')).status, 409);
    assert.equal((await send('/members/cart', { memberId: memberA.id, items: [{ productId: 'test', qty: -1 }] }, cookieA, 'PUT')).status, 400);
    assert.equal((await send('/orders/history', undefined, '', 'GET')).status, 401);
    await prisma.memberSession.updateMany({ where: { memberId: memberA.id }, data: { expiresAt: new Date(Date.now() - 1) } });
    assert.equal((await send('/members/session', undefined, cookieA, 'GET')).status, 401);
    assert.equal((await send('/members/cart', undefined, cookieA, 'GET')).status, 401);
    const relogin = await send('/members/login', { email: one.email, password: one.password });
    const freshCookie = relogin.headers.get('set-cookie')!.split(';')[0];
    assert.deepEqual((await (await send('/members/cart', undefined, freshCookie, 'GET')).json()).items, [{ productId: 'test-product', qty: 2 }]);
    await send('/members/logout', {}, freshCookie);
    assert.equal((await send('/members/session', undefined, freshCookie, 'GET')).status, 401);
  } finally {
    await prisma.member.deleteMany({ where: { email: { in: emails } } });
    await prisma.$disconnect();
    await new Promise<void>((resolve, reject) => server.close((error) => error ? reject(error) : resolve()));
  }
});
