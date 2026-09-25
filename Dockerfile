# syntax=docker/dockerfile:1
ARG NODE_VERSION=24-alpine

FROM node:${NODE_VERSION} AS base
WORKDIR /app

FROM base AS dev
ENV NODE_ENV=development
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
EXPOSE 3000
CMD ["npm", "run", "dev"]

FROM base AS deps
COPY package.json package-lock.json ./
RUN npm ci

FROM base AS builder
ENV NODE_ENV=production
# NEXT_PUBLIC_* vars are inlined by `next build` itself — must be present as a
# build ARG, since .dockerignore excludes .env*.local from the build context.
ARG NEXT_PUBLIC_GA_ID
ENV NEXT_PUBLIC_GA_ID=$NEXT_PUBLIC_GA_ID
ARG NEXT_PUBLIC_POSTHOG_API_KEY
ENV NEXT_PUBLIC_POSTHOG_API_KEY=$NEXT_PUBLIC_POSTHOG_API_KEY
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM base AS runner
ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0
RUN mkdir .next && chown node:node .next
COPY --from=builder --chown=node:node /app/public ./public
COPY --from=builder --chown=node:node /app/.next/standalone ./
COPY --from=builder --chown=node:node /app/.next/static ./.next/static
USER node
EXPOSE 3000
CMD ["node", "server.js"]
