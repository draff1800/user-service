# ---------- BUILD ----------
FROM node:22-alpine AS builder
WORKDIR /app

# Copy and install dependencies
COPY package.json package-lock.json ./
RUN npm ci

# Copy and build app
COPY tsconfig.json tsconfig.build.json ./
COPY src ./src
RUN npm run build


# ---------- RUNTIME ----------
FROM node:22-alpine AS runtime
WORKDIR /app

# Metadata
LABEL org.opencontainers.image.title="User Service"
LABEL org.opencontainers.image.description="A microservice which handles user registration, authentication and account management."
LABEL org.opencontainers.image.version="1.0.0"

# Accept NODE_ENV from build script argument (Default = development)
ARG NODE_ENV=development
ENV NODE_ENV=$NODE_ENV

# Copy build and dependencies
COPY --from=builder /app/dist ./dist
COPY package.json package-lock.json ./

# Install dependencies (If NODE_ENV = production, strip Husky script & exclude dev dependencies)
RUN if [ "$NODE_ENV" = "production" ]; then \
        npm pkg set scripts.prepare="exit 0" && npm ci --omit=dev ; \
    else \
        npm ci ; \
    fi

# Set up health-check script
RUN apk add --no-cache curl
COPY scripts/health-check.sh /usr/local/bin/healthcheck.sh
RUN chmod +x /usr/local/bin/healthcheck.sh

# Become non-root user for extra security
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

# Document default port, add health checks and run the built server
EXPOSE 3000
HEALTHCHECK CMD ["healthcheck.sh"]
CMD ["node", "dist/server.js"]
