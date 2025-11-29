# Build stage
FROM node:18-alpine AS build
WORKDIR /app
# Cache bust
RUN echo "Build timestamp: $(date)" > /tmp/build-info
COPY package*.json ./
RUN npm install
COPY . .
RUN REACT_APP_API_URL=/api npm run build

# Production stage
FROM nginx:alpine
# Remove default nginx files
RUN rm -rf /usr/share/nginx/html/*
# Copy React build files
COPY --from=build /app/build /usr/share/nginx/html/
# Copy our custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf
# Verify files are copied correctly
RUN ls -la /usr/share/nginx/html/ && cat /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]