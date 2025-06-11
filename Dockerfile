# --- Stage 1: Base Image - Installs common dependencies for all subsequent stages ---
FROM node:22 AS base

WORKDIR /app

ENV NEXT_TELEMETRY_DISABLED=1

COPY package*.json ./

COPY prisma ./prisma/

RUN npm install --frozen-lockfile

# --- Stage 2: Development Image - For local development and debugging ---
FROM base AS development

ENV NODE_ENV=development

COPY . .

RUN npx prisma generate

EXPOSE 3000

EXPOSE 9229
EXPOSE 9230

# No CMD here; the docker-compose.dev.yml will specify `npm run dev`

# --- Stage 3: Build Image - Creates optimized production build artifacts ---
FROM base AS builder

ENV NODE_ENV=production

COPY . .

RUN npx prisma generate

RUN npm run build

# --- Stage 4: Production Runtime Image - Runs the optimized production build ---
FROM node:22 AS runner

WORKDIR /app

ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules/ ./node_modules/
COPY --from=builder /app/.next/ ./.next/
COPY --from=builder /app/public/ ./public/
COPY --from=builder /app/prisma/ ./prisma/
COPY --from=builder /app/node_modules/.prisma/client/ ./node_modules/.prisma/client/ 

EXPOSE 3000

CMD ["npm", "start"]
