import { db } from '@/server/db/client';
import { merchants } from '@/server/db/schema';
import { fromError, ok } from '@/server/lib/http';

export async function GET() {
  try {
    const data = await db.select().from(merchants);
    return ok(data);
  } catch (err) {
    return fromError(err);
  }
}
