# Build stage
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN REACT_APP_API_URL=/api npm run build
# Debug: List build contents
RUN ls -la /app/build || echo "Build directory not found"

# Production stage with custom nginx config
FROM nginx:alpine
# Remove default nginx files
RUN rm -rf /usr/share/nginx/html/*
# Copy React build files to correct nginx directory
COPY --from=build /app/build /usr/share/nginx/html/
# Copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf
# Debug: Verify files are copied correctly
RUN ls -la /usr/share/nginx/html/ && ls -la /etc/nginx/conf.d/
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]