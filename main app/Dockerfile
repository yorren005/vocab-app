FROM node:20-alpine

# Install Git, OpenSSH, and certificates for repository syncing
RUN apk add --no-cache git openssh-client ca-certificates

WORKDIR /app

# Copy dependency specifications
COPY package*.json ./
RUN npm install --omit=dev

# Copy application files
COPY . .

# Ensure entrypoint is executable
RUN chmod +x docker-entrypoint.sh

# Default environment configurations
ENV PORT=3080
ENV VAULT_PATH=/data/vault
ENV NODE_ENV=production

EXPOSE 3080

VOLUME ["/data/vault"]

ENTRYPOINT ["./docker-entrypoint.sh"]
