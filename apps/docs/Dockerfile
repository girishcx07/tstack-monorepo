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

WORKDIR /app

COPY apps/docs/nginx.conf /etc/nginx/nginx.conf
COPY --from=installer /app/apps/docs/.output/public /usr/share/nginx/html

HEALTHCHECK --interval=30s --timeout=10s --retries=3 \
  CMD curl --fail --silent http://0.0.0.0:80/healthcheck || exit 1

CMD ["nginx", "-g", "daemon off;"]
