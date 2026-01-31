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
RUN turbo prune docs --docker

# =========================================================================== #

FROM base AS installer

ARG PUBLIC_SERVER_URL
ENV PUBLIC_SERVER_URL=${PUBLIC_SERVER_URL}

ARG PUBLIC_SERVER_API_PATH
ENV PUBLIC_SERVER_API_PATH=${PUBLIC_SERVER_API_PATH}

ARG PUBLIC_DOCS_URL
ENV PUBLIC_DOCS_URL=${PUBLIC_DOCS_URL}

ARG BETTER_AUTH_URL
ENV BETTER_AUTH_URL=${BETTER_AUTH_URL}

ARG BETTER_AUTH_SECRET
ENV BETTER_AUTH_SECRET=${BETTER_AUTH_SECRET}

COPY --from=builder /app/out/json/ .
RUN pnpm install --no-frozen-lockfile

COPY --from=builder /app/out/full/ .
RUN pnpm --filter=docs build

# =========================================================================== #

FROM nginx:stable-alpine AS production

# Install Node.js in the nginx container to run the SSR server
RUN apk add --no-cache nodejs npm

WORKDIR /app

# Copy nginx configuration (reverse proxy setup)
COPY apps/docs/nginx.conf /etc/nginx/nginx.conf

# Copy the built output from installer stage
COPY --from=installer /app/apps/docs/.output /app/.output
COPY --from=installer /app/apps/docs/public /app/public

# Create startup script to run both Node.js and nginx
RUN echo '#!/bin/sh' > /start.sh && \
  echo 'cd /app && node .output/server/index.mjs &' >> /start.sh && \
  echo 'nginx -g "daemon off;"' >> /start.sh && \
  chmod +x /start.sh

# Expose ports
EXPOSE 80

# Set environment variables for the Node.js server
ENV HOST=127.0.0.1
ENV PORT=3000

HEALTHCHECK --interval=30s --timeout=10s --retries=3 \
  CMD wget --quiet --spider http://127.0.0.1:80/healthcheck || exit 1

# Run startup script
CMD ["/start.sh"]
