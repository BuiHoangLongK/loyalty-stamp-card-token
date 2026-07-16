import { z } from 'zod';

const publicEnvSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  NEXT_PUBLIC_APP_NAME: z.string().default('StampChain'),
  NEXT_PUBLIC_APP_URL: z.string().url().default('http://localhost:3003'),
  NEXT_PUBLIC_DEMO_MODE: z
    .string()
    .default('false')
    .transform((v) => v === 'true' || v === '1'),
});

const parsed = publicEnvSchema.safeParse({
  NODE_ENV: process.env.NODE_ENV,
  NEXT_PUBLIC_APP_NAME: process.env.NEXT_PUBLIC_APP_NAME,
  NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
  NEXT_PUBLIC_DEMO_MODE: process.env.NEXT_PUBLIC_DEMO_MODE,
});

if (!parsed.success) {
  throw new Error('Invalid public environment variables');
}

export const publicEnv = parsed.data;
export type PublicEnv = typeof publicEnv;
