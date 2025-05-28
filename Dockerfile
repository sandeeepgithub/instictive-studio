# Base image
FROM node:20

# Set working directory
WORKDIR /app

# Install netcat for health check (MongoDB availability)
RUN apt-get update && apt-get install -y netcat-openbsd

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
