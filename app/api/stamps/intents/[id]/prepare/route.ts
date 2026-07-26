import { db } from '@/server/db/client';
import { fromError, ok } from '@/server/lib/http';
import { StampService } from '@/server/service/stamp.service';

/** Build an unsigned envelope; signing and submission remain external. */
export async function POST(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const svc = new StampService(db);
    return ok(await svc.prepareStampIntent(id));
  } catch (err) {
    return fromError(err);
  }
}
