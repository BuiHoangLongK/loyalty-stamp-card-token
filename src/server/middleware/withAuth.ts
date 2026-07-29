import { eq } from 'drizzle-orm';
import { env } from '@/server/config/env';
import { db } from '@/server/db/client';
import { sessions } from '@/server/db/schema';
import { readSessionCookie } from '@/server/lib/cookies';
import { AppError } from '@/server/lib/http';
import { getDemoStore } from '@/server/service/demo.store';
import type { Middleware } from './compose';

export const withAuth: Middleware = (handler) => async (req, ctx) => {
  const sessionId = readSessionCookie(req);
  if (!sessionId) {
    throw new AppError('UNAUTHORIZED', 'Missing session', 401);
  }
  const row = env.DEMO_MODE
    ? getDemoStore().getSession(sessionId)
    : (await db?.select().from(sessions).where(eq(sessions.id, sessionId)).limit(1))?.[0];
  if (!row) {
    throw new AppError('UNAUTHORIZED', 'Invalid session', 401);
  }
  if (row.expiresAt.getTime() < Date.now()) {
    throw new AppError('UNAUTHORIZED', 'Session expired', 401);
  }
  ctx.publicKey = row.publicKey;
  return handler(req, ctx);
};
