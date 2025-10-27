# StudyShare - Collaborative Learning Resource Platform

A full-stack web application for students and teachers to upload, share, and access academic resources.

## Technology Stack
- **Frontend**: React + TypeScript + Tailwind CSS
- **Backend**: Django REST Framework
- **Database**: PostgreSQL

## Setup Instructions

### Backend Setup
1. Navigate to backend directory: `cd backend`
2. Create virtual environment: `python -m venv venv`
3. Activate virtual environment: `venv\Scripts\activate` (Windows) or `source venv/bin/activate` (Mac/Linux)
4. Install dependencies: `pip install -r requirements.txt`
5. Setup database: `python manage.py migrate`
6. Create superuser: `python manage.py createsuperuser`
7. Run server: `python manage.py runserver`

### Frontend Setup
1. Navigate to frontend directory: `cd frontend`
2. Install dependencies: `npm install`
3. Start development server: `npm start`

## API Endpoints
- `/api/register/` - User registration
- `/api/login/` - User authentication
- `/api/logout/` - Logout
- `/api/users/` - User profile management
- `/api/resources/` - Resource CRUD operations
- `/api/tags/` - Tag management
- `/api/ratings/` - Resource ratings
- `/api/comments/` - Resource comments
- `/api/search/` - Search resources

## Features
- User authentication with JWT
- File upload with cloud storage
- Resource search and filtering
- Rating and comment system
- Responsive design
- Dark/Light mode toggle