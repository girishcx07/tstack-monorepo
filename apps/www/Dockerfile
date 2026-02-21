FROM node:24-alpine AS base

WORKDIR /app

ENV NODE_ENV=production
ENV TURBO_TELEMETRY_DISABLED=1
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
ENV CI=1

RUN corepack enable pnpm

# =========================================================================== #

FROM base AS builder

RUN pnpm install --global turbo@^2

COPY . .

# https://turbo.build/repo/docs/guides/tools/docker#the-solution
RUN turbo prune www --docker

# =========================================================================== #

FROM base AS installer

ARG PUBLIC_SERVER_URL
ENV PUBLIC_SERVER_URL=${PUBLIC_SERVER_URL}

ARG PUBLIC_SERVER_API_PATH
ENV PUBLIC_SERVER_API_PATH=${PUBLIC_SERVER_API_PATH}

COPY --from=builder /app/out/json/ .
RUN pnpm install --frozen-lockfile

COPY --from=builder /app/out/full/ .
RUN pnpm build --filter www

# =========================================================================== #

FROM nginx:stable-alpine AS production

WORKDIR /app

# Install Node.js in the Nginx alpine image to run the Nitro server
RUN apk add --no-cache nodejs

COPY apps/www/nginx.conf /etc/nginx/nginx.conf

# Copy the built start application
COPY --from=installer /app/apps/www/.output /app/.output
COPY --from=installer /app/apps/www/.output/public /usr/share/nginx/html

# Expose Nginx port
EXPOSE 80

HEALTHCHECK --interval=30s --timeout=10s --retries=3 \
  CMD curl --fail --silent http://0.0.0.0:80/healthcheck || exit 1

# Start Nitro server in the background (port 3000) and Nginx in the foreground
CMD node .output/server/index.mjs & nginx -g "daemon off;"
