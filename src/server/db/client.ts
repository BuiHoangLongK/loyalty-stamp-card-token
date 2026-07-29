import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { env } from '@/server/config/env';
import * as schema from '@/server/db/schema';

const globalForDb = globalThis as unknown as {
  pgPool: Pool | undefined;
};

// Do not even construct a pg pool in demo mode. This lets Vercel render the
// seeded demo without a PostgreSQL connection string or a reachable database.
const pool = env.DEMO_MODE
  ? undefined
  : (globalForDb.pgPool ??
    new Pool({
      connectionString: env.DRIZZLE_DATABASE_URL,
      max: 10,
    }));

if (pool && env.NODE_ENV !== 'production') {
  globalForDb.pgPool = pool;
}

export const db = pool ? drizzle(pool, { schema }) : undefined;
export type Database = NonNullable<typeof db>;
