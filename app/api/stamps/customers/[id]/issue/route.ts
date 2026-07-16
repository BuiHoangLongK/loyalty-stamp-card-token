import { z } from 'zod';
import { db } from '@/server/db/client';
import { fromError, ok } from '@/server/lib/http';
import { StampService } from '@/server/service/stamp.service';

const schema = z.object({
  merchantId: z.string().uuid(),
  amount: z.number().int().positive().default(1),
});

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = schema.parse(await req.json());
    const svc = new StampService(db);
    const data = await svc.issueStamp(id, body.merchantId, body.amount);
    return ok(data, { status: 201 });
  } catch (err) {
    return fromError(err);
  }
}
