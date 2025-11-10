@echo off
echo Building StudyShare Docker Image...

REM Build the Docker image
docker build -t studyshare:latest .

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ✅ Docker image built successfully!
    echo.
    echo To run the application:
    echo   docker-compose up -d
    echo.
    echo To run just the container:
    echo   docker run -p 8000:8000 studyshare:latest
    echo.
    echo Access the application at: http://localhost:8000
) else (
    echo.
    echo ❌ Docker build failed!
    echo Please check the error messages above.
)