# Multi-stage Dockerfile for StudyShare Application
# Stage 1: Build React frontend
FROM node:18-alpine AS frontend-builder

# Set working directory for frontend build
WORKDIR /app/frontend

# Copy package files for dependency installation
COPY studyshare/frontend/package*.json ./

# Install frontend dependencies
RUN npm ci --only=production

# Copy frontend source code
COPY studyshare/frontend/ ./

# Build the React application for production
RUN npm run build

# Stage 2: Setup Python backend and serve application
FROM python:3.11-slim AS production

# Set environment variables for Python optimization and security
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    DEBIAN_FRONTEND=noninteractive \
    PIP_NO_CACHE_DIR=1 \
    PIP_DISABLE_PIP_VERSION_CHECK=1

# Install system dependencies required for PostgreSQL and cleanup in same layer
RUN apt-get update && apt-get install -y \
    libpq-dev \
    gcc \
    curl \
    && rm -rf /var/lib/apt/lists/* \
    && apt-get clean

# Create non-root user for security
RUN groupadd -r appuser && useradd -r -g appuser appuser

# Set working directory
WORKDIR /app

# Copy and install Python dependencies (including gunicorn for production)
COPY studyshare/backend/requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt gunicorn==21.2.0

# Copy backend source code
COPY studyshare/backend/ ./

# Copy built frontend files to Django static files directory
COPY --from=frontend-builder /app/frontend/build ./static/

# Create necessary directories for Django
RUN mkdir -p media staticfiles logs

# Collect static files for production
RUN python manage.py collectstatic --noinput --clear || true

# Change ownership of application files to non-root user
RUN chown -R appuser:appuser /app

# Switch to non-root user for security
USER appuser

# Expose port 8000 for Django application
EXPOSE 8000

# Health check to ensure application is running properly
HEALTHCHECK --interval=30s --timeout=10s --start-period=30s --retries=3 \
    CMD curl -f http://localhost:8000/api/ || exit 1

# Run Django application with gunicorn for production deployment
CMD ["gunicorn", "--bind", "0.0.0.0:8000", "--workers", "3", "--timeout", "120", "studyshare.wsgi:application"]