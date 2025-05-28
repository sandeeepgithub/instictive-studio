# Base image
FROM node:22-alpine

# Set working directory
WORKDIR /app

ENV DOCKER_MONGO_URL=true

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy rest of the app
COPY . .

# Make the entrypoint script executable
COPY entrypoint.sh /app/entrypoint.sh
RUN chmod +x /app/entrypoint.sh

# Build the app
RUN npm run build

# Expose the app port
EXPOSE 3000

# Default command
CMD ["sh", "/app/entrypoint.sh"]
