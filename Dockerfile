# Multi-stage build for production
FROM node:18-alpine AS frontend-build

WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ ./
RUN TSC_COMPILE_ON_ERROR=true GENERATE_SOURCEMAP=false npm run build

# Debug: Check if build was created
RUN echo "=== Build directory contents ===" && ls -la /app/frontend/build/ || echo "Build directory not found"

# Production backend stage
FROM python:3.11-slim

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PIP_NO_CACHE_DIR=1

# Create non-root user
RUN groupadd -r appuser && useradd -r -g appuser appuser

# Install system dependencies
RUN apt-get update && apt-get install -y \
    curl \
    nginx \
    && rm -rf /var/lib/apt/lists/*

# Set work directory
WORKDIR /app

# Install Python dependencies
COPY backend/requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

# Copy backend code
COPY backend/ ./

# Copy built frontend to nginx directory
COPY --from=frontend-build /app/frontend/build /usr/share/nginx/html/

# Remove all default nginx configs and setup custom config
RUN rm -rf /etc/nginx/sites-enabled/* /etc/nginx/sites-available/* /etc/nginx/conf.d/* /usr/share/nginx/html/index.html

# Copy nginx configuration
COPY frontend/nginx.conf /etc/nginx/conf.d/default.conf

# Debug: Verify setup
RUN echo "=== Nginx config ===" && cat /etc/nginx/conf.d/default.conf && \
    echo "=== HTML files ===" && ls -la /usr/share/nginx/html/

# Create necessary directories and set permissions
RUN mkdir -p media logs /var/lib/nginx/body /var/log/nginx && \
    chown -R appuser:appuser /app && \
    chmod 755 /var/lib/nginx/body /var/log/nginx

# Expose ports
EXPOSE 80 8000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
    CMD curl -f http://localhost/ || exit 1

# Start application (run as root for nginx, but Django runs as appuser)
CMD ["sh", "-c", "su appuser -c 'python manage.py collectstatic --noinput && python manage.py migrate && python manage.py runserver 0.0.0.0:8000' & nginx -g 'daemon off;'"]