# Stage 1: Build the application
FROM node:20 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Run the application
FROM node:20
WORKDIR /app
COPY package*.json ./
RUN npm install --only=production
COPY --from=builder /app/dist ./dist
COPY .env .
COPY wait-for-it.sh .
RUN chmod +x wait-for-it.sh
EXPOSE 3001
CMD ["./wait-for-it.sh", "mysql:3306", "--", "node", "dist/main.js"]
