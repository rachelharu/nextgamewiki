FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install
COPY . .
RUN npx prisma generate
RUN npm run build

# --- Stage 2: Production Runtime Image ---
FROM node:22-alpine AS runner

WORKDIR /app

ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production
ENV DATABASE_URL=DATABASE_URL
ENV RAWG_API_KEY=RAWG_API_KEY
ENV RAPID_API_KEY=RAPID_API_KEY
ENV NEXT_PUBLIC_RAWG_API_KEY=RAWG_API_KEY

COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules/ ./node_modules/
COPY --from=builder /app/.next/ ./.next/
COPY --from=builder /app/public/ ./public/
COPY --from=builder /app/prisma/ ./prisma/

EXPOSE 3000

CMD ["npm", "start"]
