import { z } from 'zod';

const EnvSchema = z.object({
  BETTER_AUTH_SECRET: z.string(),
  BETTER_AUTH_URL: z.string().url(),
  DATABASE_URL: z.string().url(),
  NODE_ENV: z.enum(['development', 'production']).default('development'),
});

export type Environment = z.infer<typeof EnvSchema>;

export function parseEnv(data: any) {
  const { data: env, error } = EnvSchema.safeParse(data);

  if (error) {
    const errorMessage = `error: invalid env:\n${Object.entries(
      error.flatten().fieldErrors,
    )
      .map(([key, errors]) => `${key}: ${errors.join(', ')}`)
      .join('\n')}`;
    throw new Error(errorMessage);
  }

  return env;
}
