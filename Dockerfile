# syntax=docker/dockerfile:1.7

# --- builder ---
FROM node:22-alpine AS builder
WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci

COPY astro.config.mjs tsconfig.json tailwind.config.mjs ./
COPY src ./src
COPY content ./content
COPY public ./public

RUN npx astro telemetry disable && npm run build

# --- runtime ---
FROM nginx:1.27-alpine AS runtime
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
HEALTHCHECK --interval=30s --timeout=3s --retries=3 \
  CMD wget -q -O - http://127.0.0.1/ > /dev/null || exit 1
