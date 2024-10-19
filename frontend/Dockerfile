# Stage 1: Build the application
FROM node:18-alpine AS builder

# Set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json/yarn.lock files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Next.js application
RUN npm run build

# Install only production dependencies
RUN npm prune --production

# Stage 2: Serve the application with a smaller image
FROM node:18-alpine AS runner

# Set environment variable
ENV NODE_ENV production

# Set the working directory
WORKDIR /app

# Copy built Next.js application from the builder stage
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/next.config.mjs ./

# Expose port 3000 for the application
EXPOSE 3000

# Start the Next.js application
CMD ["npm", "start"]

