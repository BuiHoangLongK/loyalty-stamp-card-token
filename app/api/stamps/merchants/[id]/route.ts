import { db } from '@/server/db/client';
import { fromError, ok } from '@/server/lib/http';
import { StampService } from '@/server/service/stamp.service';

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const svc = new StampService(db);
    const data = await svc.getMerchant(id);
    return ok(data);
  } catch (err) {
    return fromError(err);
  }
}
