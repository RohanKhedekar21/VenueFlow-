# Stage 1: Build the Vite Frontend
FROM node:18-alpine AS frontend-builder
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend .
RUN npm run build

# Stage 2: Create the Backend Production Environment
FROM node:18-alpine
WORKDIR /app

# Copy and install backend dependencies
COPY backend/package*.json ./backend/
RUN cd backend && npm install --production

# Copy backend source
COPY backend/ ./backend/

# Copy the built Vite assets from Stage 1 into the location expected by backend
COPY --from=frontend-builder /app/frontend/dist ./frontend/dist

# Expose Cloud Run default port
EXPOSE 8080

# Start Server
WORKDIR /app/backend
CMD ["node", "server.js"]
