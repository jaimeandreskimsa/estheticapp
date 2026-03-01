# ── Stage 1: Build ──────────────────────────────────────────────────────────
FROM node:18-slim AS builder

WORKDIR /app

# Dependencias del sistema para compilar módulos nativos (sharp, etc.)
RUN apt-get update && apt-get install -y --no-install-recommends \
    python3 make g++ \
    && rm -rf /var/lib/apt/lists/*

COPY package*.json ./
RUN npm install

COPY src ./src
COPY tsconfig.json ./
RUN npm run build

# ── Stage 2: Production ──────────────────────────────────────────────────────
FROM node:18-slim

WORKDIR /app

COPY package*.json ./
RUN npm install --omit=dev

COPY --from=builder /app/dist ./dist

# Railway inyecta PORT automáticamente
EXPOSE 8000

HEALTHCHECK --interval=30s --timeout=10s --start-period=60s --retries=3 \
  CMD node -e "require('http').get('http://localhost:' + (process.env.PORT||8000) + '/health', (r) => {if (r.statusCode !== 200) throw new Error(r.statusCode)})"

CMD ["npm", "start"]
