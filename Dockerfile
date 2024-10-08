# Stage 1: Build the application
FROM node:20 AS builder
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Stage 2: Run the application
FROM node:20-slim
WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY --from=builder /app/dist ./dist

# Expone el puerto 3001
EXPOSE 3001

# Comando de inicio
CMD ["node", "dist/main.js"]
