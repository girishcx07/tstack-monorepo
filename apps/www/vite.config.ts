import tailwindcss from '@tailwindcss/vite';
import { devtools } from '@tanstack/devtools-vite';
import { tanstackStart } from '@tanstack/react-start/plugin/vite';
import viteReact from '@vitejs/plugin-react';
import { nitro } from 'nitro/vite';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import * as v from 'valibot';

const envSchema = v.object({
  /**
   * Since vite is only used during development, we can assume the structure
   * will resemble a URL such as: http://localhost:3035.
   * This will then be used to set the vite dev server's host and port.
   */
  PUBLIC_WEB_URL: v.pipe(
    v.string(),
    v.url(),
  ),
  PORT: v.string(),

  /**
   * Set this if you want to run or deploy your app at a base URL. This is
   * usually required for deploying a repository to Github/Gitlab pages.
   */
  PUBLIC_BASE_PATH: v.pipe(v.optional(v.string(), '/'), v.startsWith('/')),
});

const env = v.parse(envSchema, process.env);
const webUrl = new URL(env.PUBLIC_WEB_URL);
const host = webUrl.hostname;
const port = parseInt(env.PORT, 10);

const config = defineConfig({
  base: env.PUBLIC_BASE_PATH,
  envPrefix: 'PUBLIC_',
  server: { port: port, open: true, strictPort: true, host },
  plugins: [
    devtools(),
    // TODO: nitro is parked here for future use (e.g. custom server configuration).
    // Do not remove — may be needed for advanced deployment scenarios.
    nitro({ rollupConfig: { external: [/^@sentry\//] } }),
    tsconfigPaths({ projects: ['./tsconfig.json'] }),
    tailwindcss(),
    tanstackStart(),
    viteReact(),
  ],
});

export default config;
