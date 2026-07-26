import { z } from 'zod';
import { db } from '@/server/db/client';
import { fromError, ok } from '@/server/lib/http';
import { StampService } from '@/server/service/stamp.service';

const schema = z.object({
  // The server derives the transaction hash from this envelope; callers may
  // not submit a client-chosen txHash as confirmation evidence.
  signedXdr: z.string().min(1).max(100_000),
});

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = schema.parse(await req.json());
    const svc = new StampService(db);
    const data = await svc.confirmStampIntent(id, body.signedXdr);
    return ok(data);
  } catch (err) {
    return fromError(err);
  }
}
