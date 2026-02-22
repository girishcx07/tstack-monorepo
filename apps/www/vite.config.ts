import { defineConfig } from 'vite';
import { devtools } from '@tanstack/devtools-vite';
import tsconfigPaths from 'vite-tsconfig-paths';

import { tanstackStart } from '@tanstack/react-start/plugin/vite';

import viteReact from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { nitro } from 'nitro/vite';

// Extract port from VITE_PUBLIC_WEB_URL env (e.g. http://localhost:3001 → 3001)
const wwwPort = Number(
  process.env.VITE_PUBLIC_WEB_URL?.match(/:(\d+)/)?.[1] ?? 3002,
);

const config = defineConfig({
  server: { port: wwwPort, open: true },
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
