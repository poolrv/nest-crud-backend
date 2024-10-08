# Stage 1: Build the application
FROM node:20 AS builder
WORKDIR /app

COPY package*.json ./
RUN npm install  # Cambia npm ci por npm install

COPY . .
RUN npm run build

# Stage 2: Run the application
FROM node:20-slim
WORKDIR /app

COPY package*.json ./
RUN npm install --only=production  # Cambia npm ci por npm install

COPY --from=builder /app/dist ./dist

# Expone el puerto 3001
EXPOSE 3001

# Comando de inicio
CMD ["node", "dist/main.js"]
