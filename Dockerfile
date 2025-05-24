FROM node:22-alpine


WORKDIR /app

# Set environment variables
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production
ENV DATABASE_URL=DATABASE_URL
ENV RAWG_API_KEY=RAWG_API_KEY
ENV RAPID_API_KEY=RAPID_API_KEY
ENV NEXT_PUBLIC_RAWG_API_KEY=RAWG_API_KEY

COPY package*.json ./
COPY prisma ./prisma/

# Install production dependencies (and dev dependencies if needed during build)
RUN npm install --omit=dev


COPY . .

# Generate Prisma client
RUN npx prisma generate

# Build the Next.js app (production build)
RUN npm run build


EXPOSE 3000

# Start the application in production mode
CMD ["npm", "start"]
