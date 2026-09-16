import { createHash, randomBytes, scrypt, timingSafeEqual } from 'node:crypto';
import { promisify } from 'node:util';

const derive = promisify(scrypt);
export async function hashPassword(password: string) {
  const salt = randomBytes(16).toString('hex');
  const key = await derive(password, salt, 64) as Buffer;
  return `scrypt:${salt}:${key.toString('hex')}`;
}

export async function verifyPassword(password: string, stored: string) {
  if (stored.startsWith('scrypt:')) {
    const [, salt, digest] = stored.split(':');
    if (!/^[a-f0-9]{32}$/.test(salt ?? '') || !/^[a-f0-9]{128}$/.test(digest ?? '')) return false;
    return timingSafeEqual(await derive(password, salt, 64) as Buffer, Buffer.from(digest, 'hex'));
  }
  // Existing accounts can still log in with their original password.
  if (!/^[a-f0-9]{64}$/.test(stored)) return false;
  return timingSafeEqual(createHash('sha256').update(password).digest(), Buffer.from(stored, 'hex'));
}
