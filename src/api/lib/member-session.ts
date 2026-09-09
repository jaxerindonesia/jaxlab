import { createHash, randomBytes } from 'node:crypto';
import type { Request, Response, NextFunction } from 'express';
import { prisma } from './prisma';

const COOKIE = 'jaxlab_session';
export const SESSION_MS = 24 * 60 * 60 * 1000;
const digest = (value: string) => createHash('sha256').update(value).digest('hex');
function token(req: Request) {
  return (req.headers.cookie ?? '').split(';').map((part) => part.trim()).find((part) => part.startsWith(`${COOKIE}=`))?.slice(COOKIE.length + 1) ?? '';
}
function cookieOptions() {
  return { httpOnly: true, sameSite: 'lax' as const, secure: (process.env.PUBLIC_BASE_URL ?? '').startsWith('https://'), path: '/api' };
}
export async function createMemberSession(memberId: string, res: Response) {
  const value = randomBytes(32).toString('hex');
  const expiresAt = new Date(Date.now() + SESSION_MS);
  await prisma.memberSession.create({ data: { tokenHash: digest(value), memberId, expiresAt } });
  res.cookie(COOKIE, value, { ...cookieOptions(), maxAge: SESSION_MS });
  return expiresAt.toISOString();
}
export async function revokeMemberSession(req: Request, res: Response) {
  const value = token(req);
  if (value) await prisma.memberSession.deleteMany({ where: { tokenHash: digest(value) } });
  res.clearCookie(COOKIE, cookieOptions());
}
export async function requireMember(req: Request, res: Response, next: NextFunction) {
  const value = token(req);
  const session = value ? await prisma.memberSession.findUnique({ where: { tokenHash: digest(value) } }) : null;
  if (!session || session.expiresAt.getTime() <= Date.now()) {
    res.clearCookie(COOKIE, cookieOptions());
    return res.status(401).json({ error: 'Sesi berakhir. Silakan masuk kembali.' });
  }
  req.headers['x-member-id'] = session.memberId;
  res.locals.memberId = session.memberId;
  res.locals.expiresAt = session.expiresAt.toISOString();
  next();
}
