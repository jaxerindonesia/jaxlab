import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { test } from 'node:test';
import { hashPassword, verifyPassword } from './password';

test('new passwords are salted and legacy accounts remain compatible', async () => {
  const first = await hashPassword('a secure password');
  assert.notEqual(first, await hashPassword('a secure password'));
  assert.equal(await verifyPassword('a secure password', first), true);
  assert.equal(await verifyPassword('incorrect', first), false);
  assert.equal(await verifyPassword('old-password', createHash('sha256').update('old-password').digest('hex')), true);
  assert.equal(await verifyPassword('anything', 'scrypt:invalid:invalid'), false);
});
