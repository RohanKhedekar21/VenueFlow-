# Stage 1: Build the React frontend
FROM node:20 AS build-env
WORKDIR /app

# Copy and install frontend dependencies
COPY frontend/package*.json ./frontend/
RUN cd frontend && npm install

# Copy frontend source and build
COPY frontend/ ./frontend/
RUN cd frontend && npm run build

# Stage 2: Setup the Node.js backend
FROM node:20-slim
WORKDIR /app

# Copy backend dependencies and install
COPY backend/package*.json ./backend/
RUN cd backend && npm install --only=production

# Copy backend source and the built frontend from Stage 1
COPY backend/ ./backend/
COPY --from=build-env /app/frontend/dist ./frontend/dist

EXPOSE 8080
CMD ["node", "backend/src/index.js"]