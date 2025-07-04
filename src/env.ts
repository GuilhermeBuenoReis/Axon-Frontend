import { z } from 'zod';

export const envSchema = z.object({
  JWT_SECRET: z.string(),
  BASE_URL: z.string(),
});

export const env = envSchema.parse(process.env);
