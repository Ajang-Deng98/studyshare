@echo off
REM StudyShare Development Setup Script
REM Author: Collins Junior

echo ========================================
echo StudyShare Development Setup
echo ========================================
echo.

echo Checking if Docker is running...
docker --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Docker is not installed or not running
    echo Please install Docker Desktop and try again
    pause
    exit /b 1
)

echo Docker found! Setting up development environment...
echo.

echo Stopping any existing containers...
docker-compose down

echo Building and starting containers...
docker-compose up --build -d

echo.
echo Waiting for services to start...
timeout /t 10 /nobreak >nul

echo.
echo Running database migrations...
docker-compose exec web python manage.py migrate

echo.
echo ========================================
echo Setup Complete!
echo ========================================
echo.
echo Your StudyShare application is now running:
echo - Frontend: http://localhost:3000
echo - Backend API: http://localhost:8000/api/
echo - Admin Panel: http://localhost:8000/admin/
echo.
echo To create a superuser, run:
echo docker-compose exec web python manage.py createsuperuser
echo.
echo To stop the application, run:
echo docker-compose down
echo.
pause