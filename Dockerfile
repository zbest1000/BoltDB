FROM node:18-alpine

# Set working directory
WORKDIR /app

# Install dependencies for sharp and other native packages
RUN apk add --no-cache \
    libc6-compat \
    python3 \
    make \
    g++

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Expose port
EXPOSE 3000

# Start command
CMD ["npm", "run", "dev"]