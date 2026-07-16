import { describe, expect, it } from 'vitest';
import { AppError, created, fail, fromError, ok } from '@/server/lib/http';

async function body<T>(res: Response): Promise<T> {
  return (await res.json()) as T;
}

describe('ok', () => {
  it('wraps data in success envelope', async () => {
    const res = ok({ hello: 'world' });
    const json = await body<{ ok: boolean; data: { hello: string } }>(res);
    expect(json.ok).toBe(true);
    expect(json.data.hello).toBe('world');
  });
  it('honors custom status via init', async () => {
    const res = ok({ a: 1 }, { status: 201 });
    expect(res.status).toBe(201);
  });
});

describe('created', () => {
  it('returns 201', async () => {
    const res = created({ id: 'x' });
    expect(res.status).toBe(201);
    const json = await body<{ ok: boolean }>(res);
    expect(json.ok).toBe(true);
  });
});

describe('fail', () => {
  it('returns error envelope with status', async () => {
    const res = fail('NOT_FOUND', 'missing', 404);
    expect(res.status).toBe(404);
    const json = await body<{ ok: boolean; error: { code: string; message: string } }>(res);
    expect(json.ok).toBe(false);
    expect(json.error.code).toBe('NOT_FOUND');
    expect(json.error.message).toBe('missing');
  });
});

describe('AppError', () => {
  it('uses status not statusCode', () => {
    const err = new AppError('FORBIDDEN', 'no', 403);
    expect(err.status).toBe(403);
    expect(err.code).toBe('FORBIDDEN');
  });
  it('defaults status to 400', () => {
    const err = new AppError('INVALID_INPUT', 'bad');
    expect(err.status).toBe(400);
  });
});

describe('fromError', () => {
  it('maps AppError to its status', async () => {
    const res = fromError(new AppError('NOT_FOUND', 'gone', 404));
    expect(res.status).toBe(404);
    const json = await body<{ error: { code: string } }>(res);
    expect(json.error.code).toBe('NOT_FOUND');
  });
  it('maps ZodError-shaped object to 400 INVALID_INPUT', async () => {
    const zodLike = { name: 'ZodError', issues: [{ path: ['merchantId'], message: 'Required' }] };
    const res = fromError(zodLike);
    expect(res.status).toBe(400);
    const json = await body<{ error: { code: string; message: string } }>(res);
    expect(json.error.code).toBe('INVALID_INPUT');
    expect(json.error.message).toBe('Required');
  });
  it('maps INVALID_PUBLIC_KEY zod message to that code', async () => {
    const zodLike = { name: 'ZodError', issues: [{ path: [], message: 'INVALID_PUBLIC_KEY' }] };
    const res = fromError(zodLike);
    const json = await body<{ error: { code: string } }>(res);
    expect(json.error.code).toBe('INVALID_PUBLIC_KEY');
  });
  it('maps unknown errors to 500 INTERNAL', async () => {
    const res = fromError(new Error('boom'));
    expect(res.status).toBe(500);
    const json = await body<{ error: { code: string } }>(res);
    expect(json.error.code).toBe('INTERNAL');
  });
});
