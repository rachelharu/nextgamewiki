# --- Stage 1: Build Image ---
FROM node:22 AS builder

WORKDIR /app

# Set environment variables
ENV NEXT_TELEMETRY_DISABLED=1
# No ENV NODE_ENV=production here, to ensure all dependencies (including dev) are installed

COPY package*.json ./
COPY prisma ./prisma/

RUN npm install

COPY . .

RUN npx prisma generate

# Set NODE_ENV to production before building for Next.js optimizations
ENV NODE_ENV=production

# Build the Next.js app (production build)
RUN npm run build

# --- Stage 2: Production Runtime Image ---
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

# Start the application in production mode
CMD ["npm", "start"]