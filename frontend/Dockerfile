# Build stage
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN REACT_APP_API_URL=/api npm run build

# Production stage with custom nginx config
FROM nginx:alpine
# Remove default nginx files
RUN rm -rf /usr/share/nginx/html/*
# Copy React build files to correct nginx directory
COPY --from=build /app/build /usr/share/nginx/html/
# Copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]