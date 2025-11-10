# StudyShare Docker Commands

# Build and start all services
up:
	docker-compose up -d

# Build and start with development frontend
dev:
	docker-compose --profile dev up -d

# Stop all services
down:
	docker-compose down

# View logs
logs:
	docker-compose logs -f

# Rebuild and start
rebuild:
	docker-compose down
	docker-compose build --no-cache
	docker-compose up -d

# Create superuser
superuser:
	docker-compose exec web python manage.py createsuperuser

# Run migrations
migrate:
	docker-compose exec web python manage.py migrate

# Collect static files
collectstatic:
	docker-compose exec web python manage.py collectstatic --noinput

# Clean up containers and volumes
clean:
	docker-compose down -v
	docker system prune -f

# Show status
status:
	docker-compose ps

.PHONY: up dev down logs rebuild superuser migrate collectstatic clean status