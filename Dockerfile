# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

ARG VITE_FLASK_BACKEND_URL
ENV VITE_FLASK_BACKEND_URL=$VITE_FLASK_BACKEND_URL

ARG VITE_BASE_PATH
ENV VITE_BASE_PATH=$VITE_BASE_PATH

RUN npm run build

# Production stage
FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 3000

CMD ["nginx", "-g", "daemon off;"]
