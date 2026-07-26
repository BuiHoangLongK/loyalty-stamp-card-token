import { db } from '@/server/db/client';
import { merchants } from '@/server/db/schema';
import { env } from '@/server/config/env';
import { fromError, ok } from '@/server/lib/http';
import { getDemoStore } from '@/server/service/demo.store';

export async function GET() {
  try {
    if (env.DEMO_MODE) return ok(getDemoStore().listMerchants());
    if (!db) throw new Error('Database is not configured');
    const data = await db.select().from(merchants);
    return ok(data);
  } catch (err) {
    return fromError(err);
  }
}
