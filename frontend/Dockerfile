# Build frontend
FROM node:18-alpine AS frontend-build

WORKDIR /app/frontend
COPY package*.json ./
RUN npm install
COPY . ./
RUN TSC_COMPILE_ON_ERROR=true GENERATE_SOURCEMAP=false npm run build

# Backend + nginx
FROM python:3.11-slim

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PIP_NO_CACHE_DIR=1

RUN apt-get update && apt-get install -y nginx curl && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Install Python deps
COPY ../backend/requirements.txt .
RUN pip install -r requirements.txt

# Copy backend
COPY ../backend/ .

# Copy frontend build
COPY --from=frontend-build /app/frontend/build /app/static/

# Overwrite default nginx config
COPY nginx.conf /etc/nginx/nginx.conf

# Create dirs
RUN mkdir -p media logs && \
    chown -R www-data:www-data /app

EXPOSE 80

HEALTHCHECK --interval=20s --timeout=5s \
  CMD curl -f http://localhost/ || exit 1

CMD ["sh", "-c", "\
    python manage.py collectstatic --noinput && \
    python manage.py migrate && \
    gunicorn studyshare.wsgi:application --bind 0.0.0.0:8000 --workers 3 & \
    nginx -g 'daemon off;' \
"]