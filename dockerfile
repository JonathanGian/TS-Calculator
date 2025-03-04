# Stage 1: Build the TypeScript application
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the source code
COPY . .

# Build the app (this produces a static site in dist/)
RUN npm run build
RUN ls -l /app/dist

# Stage 2: Production image
FROM node:20-alpine

WORKDIR /app

# Copy only the build output from the builder stage
COPY --from=builder /app/dist ./dist

# Install a static server globally
RUN npm install -g serve

# Expose the port the app will run on
EXPOSE 3000

# Serve the static files from dist using serve
CMD ["serve", "-s", "dist", "-l", "3000"]