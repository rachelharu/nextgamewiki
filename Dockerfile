FROM node:22-alpine


WORKDIR /app

# Set environment variables
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production


COPY package*.json ./

# Install production dependencies (and dev dependencies if needed during build)
RUN npm install --production


COPY . .

# Generate Prisma client
RUN npx prisma generate

# Build the Next.js app (production build)
RUN npm run build


EXPOSE 3000

# Start the application in production mode
CMD ["npm", "start"]
