import * as v from 'valibot';

const DEFAULT_WWW_PORT = 3001;

const createPortSchema = ({ defaultPort }: { defaultPort: number }) =>
  v.pipe(
    v.optional(v.string(), `${defaultPort}`),
    v.transform((s) => parseInt(s, 10)),
    v.integer(),
    v.minValue(0),
    v.maxValue(65535),
  );

export const serverEnvSchema = v.object({
  WWW_PORT: createPortSchema({ defaultPort: DEFAULT_WWW_PORT }),
  DB_POSTGRES_URL: v.pipe(v.string(), v.minLength(1)),
  SERVER_AUTH_SECRET: v.pipe(v.string(), v.minLength(32)),
  VITE_PUBLIC_WEB_URL: v.pipe(v.string(), v.url()),
});

export type ServerEnv = v.InferOutput<typeof serverEnvSchema>;

let cachedServerEnv: ServerEnv | null = null;

export function getServerEnv(): ServerEnv {
  if (cachedServerEnv) {
    return cachedServerEnv;
  }

  cachedServerEnv = v.parse(serverEnvSchema, process.env);
  return cachedServerEnv;
}
