import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { mock, test } from 'node:test';
import express from 'express';
import nodemailer from 'nodemailer';
import { prisma } from '../lib/prisma';
import { accountRouter } from './member-account';
import { verifyPassword } from '../lib/password';

// All database and SMTP operations are mocked. Never touches configured customer data or sends email.
test('profile ownership, email verification, reset expiry/replay, and session revocation', async () => {
  const environment = { ...process.env };
  Object.assign(process.env, { SMTP_HOST: 'smtp.example.invalid', SMTP_USER: 'test', SMTP_PASSWORD: 'test', SMTP_FROM: 'Jaxlab <test@example.invalid>', PUBLIC_BASE_URL: 'https://jaxlab.example.invalid' });
  let member = { id: 'member-a', name: 'Buyer', email: 'old@example.invalid', address: 'Old street', phoneWa: '08123456789', shippingDestinationId: 1, shippingDestination: 'Area', province: 'Province', city: 'City', postalCode: '12345', referralCode: 'TEST', isAffiliate: false, passwordHash: createHash('sha256').update('old-password').digest('hex') };
  type Token = { tokenHash: string; memberId: string; purpose: string; email: string; expiresAt: Date; createdAt: Date };
  let tokens: Token[] = [];
  let sessions = true;
  const mail: string[] = [];
  let deliveryFails = false;
  let attempts = 0;
  const memberDelegate = prisma.member;
  const memberSessionDelegate = prisma.memberSession;
  const memberActionTokenDelegate = prisma.memberActionToken;
  // Prisma exposes delegate functions through a Proxy, without value descriptors.
  for (const [delegate, names] of [
    [memberDelegate, ['findUnique', 'findUniqueOrThrow', 'update']],
    [memberSessionDelegate, ['findUnique', 'deleteMany']],
    [memberActionTokenDelegate, ['findUnique', 'create', 'deleteMany']],
  ] as const) {
    for (const name of names) Object.defineProperty(delegate, name, {
      value: () => { throw new Error(`Unexpected Prisma call: ${name}`); }, configurable: true, writable: true,
    });
  }
  mock.method(nodemailer, 'createTransport', () => ({ sendMail: async (message: { text: string }) => {
    attempts++;
    if (deliveryFails) throw new Error('SMTP unavailable');
    mail.push(message.text);
  } }));
  mock.method(memberDelegate, 'findUnique', async ({ where }: { where: { email?: string; id?: string } }) => where.email && where.email !== member.email ? null : { ...member });
  mock.method(memberDelegate, 'findUniqueOrThrow', async () => ({ ...member }));
  mock.method(memberDelegate, 'update', async ({ where, data, select }: { where: { id: string }; data: Partial<typeof member>; select?: Record<string, boolean> }) => {
    assert.equal(where.id, 'member-a');
    member = { ...member, ...data };
    return select ? Object.fromEntries(Object.entries(member).filter(([key]) => select[key])) : { ...member };
  });
  mock.method(memberSessionDelegate, 'findUnique', async () => sessions ? { memberId: member.id, expiresAt: new Date(Date.now() + 60_000) } : null);
  mock.method(memberSessionDelegate, 'deleteMany', async () => { sessions = false; return { count: 1 }; });
  mock.method(memberActionTokenDelegate, 'findUnique', async ({ where }: { where: { tokenHash?: string; memberId_purpose?: { memberId: string; purpose: string } } }) => tokens.find(t => where.tokenHash ? t.tokenHash === where.tokenHash : t.memberId === where.memberId_purpose?.memberId && t.purpose === where.memberId_purpose?.purpose) ?? null);
  mock.method(memberActionTokenDelegate, 'create', async ({ data }: { data: Omit<Token, 'createdAt'> }) => { const token = { ...data, createdAt: new Date() }; tokens.push(token); return token; });
  mock.method(memberActionTokenDelegate, 'deleteMany', async ({ where }: { where: { tokenHash?: string; memberId?: string; purpose?: string; expiresAt?: { gt: Date } } }) => {
    const before = tokens.length;
    tokens = tokens.filter(t => !((!where.tokenHash || t.tokenHash === where.tokenHash) && (!where.memberId || t.memberId === where.memberId) && (!where.purpose || t.purpose === where.purpose) && (!where.expiresAt || t.expiresAt > where.expiresAt.gt)));
    return { count: before - tokens.length };
  });
  mock.method(prisma, '$queryRaw', async () => [{ id: member.id }]);
  mock.method(prisma, '$transaction', async (callback: (tx: typeof prisma) => Promise<unknown>) => {
    const snapshot = { member: { ...member }, tokens: [...tokens], sessions };
    try { return await callback(prisma); }
    catch (error) { member = snapshot.member; tokens = snapshot.tokens; sessions = snapshot.sessions; throw error; }
  });
  const app = express(); app.use(express.json()); app.use('/api/members', accountRouter);
  const server = app.listen(0, '127.0.0.1');
  await new Promise<void>(resolve => server.once('listening', resolve));
  const base = `http://127.0.0.1:${(server.address() as { port: number }).port}/api/members`;
  const send = (path: string, body: unknown, cookie = '', method = 'POST') => fetch(base + path, { method, headers: { 'Content-Type': 'application/json', cookie }, body: JSON.stringify(body) });
  const waitFor = async (condition: () => boolean) => { for (let i = 0; i < 100 && !condition(); i++) await new Promise(r => setTimeout(r, 10)); assert.ok(condition()); };
  const mailToken = () => new URLSearchParams(new URL(mail.at(-1)!.match(/https:\/\/\S+/)![0]).hash.slice(1)).get('token')!;
  try {
    const update = { ...member, id: 'attacker-selected-id', name: 'Updated Buyer' };
    assert.equal((await send('/profile', update, '', 'PUT')).status, 401);
    const saved = await send('/profile', update, 'jaxlab_session=test', 'PUT');
    assert.equal(saved.status, 200);
    assert.equal((await saved.json()).member.passwordHash, undefined);
    assert.equal(member.name, 'Updated Buyer');
    assert.equal((await send('/profile', { ...update, email: 'new@example.invalid', currentPassword: 'wrong' }, 'jaxlab_session=test', 'PUT')).status, 400);
    const pending = await send('/profile', { ...update, email: 'new@example.invalid', currentPassword: 'old-password' }, 'jaxlab_session=test', 'PUT');
    assert.equal(pending.status, 200);
    assert.equal((await pending.json()).pendingEmail, 'new@example.invalid');
    assert.equal(member.email, 'old@example.invalid');
    const changeToken = mailToken();
    assert.notEqual(tokens[0].tokenHash, changeToken);
    assert.equal((await send('/reset-password', { token: changeToken, password: 'new-password' })).status, 400);
    assert.equal((await send('/verify-email', { token: changeToken })).status, 200);
    assert.equal(member.email, 'new@example.invalid');
    assert.equal(sessions, false);
    assert.equal((await send('/verify-email', { token: changeToken })).status, 400);
    const unknown = await send('/forgot-password', { email: 'unknown@example.invalid' });
    const known = await send('/forgot-password', { email: member.email });
    assert.equal(known.status, unknown.status);
    assert.deepEqual(await known.json(), await unknown.json());
    await waitFor(() => mail.length === 2);
    const resetToken = mailToken();
    await send('/forgot-password', { email: member.email });
    assert.equal(mail.length, 2, 'cooldown prevents duplicate emails');
    tokens[0].expiresAt = new Date(Date.now() - 1);
    assert.equal((await send('/reset-password', { token: resetToken, password: 'new-password' })).status, 400);
    tokens[0].expiresAt = new Date(Date.now() + 60_000);
    assert.equal((await send('/reset-password', { token: resetToken, password: 'short' })).status, 400);
    sessions = true;
    assert.equal((await send('/reset-password', { token: resetToken, password: 'new-password' })).status, 200);
    assert.equal(await verifyPassword('new-password', member.passwordHash), true);
    assert.equal(await verifyPassword('old-password', member.passwordHash), false);
    assert.equal(sessions, false);
    assert.equal(tokens.length, 0);
    assert.equal((await send('/reset-password', { token: resetToken, password: 'other-password' })).status, 400);
    deliveryFails = true;
    await send('/forgot-password', { email: member.email });
    await waitFor(() => attempts === 3 && tokens.length === 0);
    delete process.env.SMTP_HOST;
    assert.equal((await send('/forgot-password', { email: member.email })).status, 503);
  } finally {
    await new Promise<void>(resolve => server.close(() => resolve()));
    mock.restoreAll(); process.env = environment;
  }
});
