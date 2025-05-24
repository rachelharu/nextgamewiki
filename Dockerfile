FROM node:22-alpine AS builder

WORKDIR /app

# Set environment variables
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

COPY package*.json ./
COPY prisma ./prisma/

# Install production dependencies 
RUN npm install \
    && npx prisma generate

#not permanent fix
RUN npm install -g eslint typescript @types/node @types/react

COPY . .

# Build the Next.js app (production build)
RUN npm run build

# --- Stage 2: Production Runtime Image ---
FROM node:22-alpine AS runner

WORKDIR /app

ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

COPY --from=builder /app/package*.json ./               
COPY --from=builder /app/node_modules/ ./node_modules/   
COPY --from=builder /app/.next/ ./.next/                 
COPY --from=builder /app/public/ ./public/              
COPY --from=builder /app/prisma/ ./prisma/               

EXPOSE 3000

# Start the application in production mode
CMD ["npm", "start"]
