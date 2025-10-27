# StudyShare Setup Guide

## Prerequisites
- Python 3.8+
- Node.js 16+
- PostgreSQL 12+

## Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Create and activate virtual environment:**
   ```bash
   python -m venv venv
   venv\Scripts\activate  # Windows
   # source venv/bin/activate  # Mac/Linux
   ```

3. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Setup environment variables:**
   - Copy `.env.example` to `.env`
   - Update database credentials and Cloudinary settings

5. **Setup database:**
   ```bash
   python manage.py makemigrations
   python manage.py migrate
   python manage.py createsuperuser
   ```

6. **Run development server:**
   ```bash
   python manage.py runserver
   ```

## Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start development server:**
   ```bash
   npm start
   ```

## Database Configuration

Create PostgreSQL database:
```sql
CREATE DATABASE studyshare;
CREATE USER studyshare_user WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE studyshare TO studyshare_user;
```

## Cloudinary Setup

1. Create account at https://cloudinary.com
2. Get your cloud name, API key, and API secret
3. Add to `.env` file

## Access Points

- Frontend: http://localhost:3000
- Backend API: http://localhost:8000/api/
- Admin Panel: http://localhost:8000/admin/

## API Endpoints

- `POST /api/register/` - User registration
- `POST /api/login/` - User login
- `POST /api/logout/` - User logout
- `GET /api/users/` - User profile
- `GET/POST /api/resources/` - Resources CRUD
- `GET /api/search/` - Search resources
- `GET/POST /api/resources/{id}/ratings/` - Resource ratings
- `GET/POST /api/resources/{id}/comments/` - Resource comments