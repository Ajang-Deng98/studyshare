# StudyShare API Documentation

## Base URL
```
http://localhost:8000/api/
```

## Authentication
The API uses JWT (JSON Web Token) authentication. Include the token in the Authorization header:
```
Authorization: Bearer <access_token>
```

## Endpoints

### Authentication

#### Register User
- **POST** `/register/`
- **Body:**
```json
{
  "name": "John Doe",
  "university_name": "University of Example",
  "email": "john@example.com",
  "password": "password123",
  "role": "student"
}
```
- **Response:**
```json
{
  "user": {
    "id": 1,
    "name": "John Doe",
    "university_name": "University of Example",
    "email": "john@example.com",
    "role": "student",
    "date_joined": "2024-01-01T00:00:00Z"
  },
  "access": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...",
  "refresh": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9..."
}
```

#### Login User
- **POST** `/login/`
- **Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

#### Logout User
- **POST** `/logout/`
- **Body:**
```json
{
  "refresh": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9..."
}
```

### User Profile

#### Get/Update User Profile
- **GET/PUT** `/users/`
- **Headers:** `Authorization: Bearer <token>`

### Resources

#### List/Create Resources
- **GET/POST** `/resources/`
- **Query Parameters (GET):**
  - `subject` - Filter by subject
  - `topic` - Filter by topic
  - `course_code` - Filter by course code
  - `uploader` - Filter by uploader ID

- **POST Body:**
```json
{
  "title": "Calculus Notes",
  "description": "Comprehensive calculus study notes",
  "subject": "Mathematics",
  "topic": "Calculus",
  "course_code": "MATH101",
  "tag_names": ["notes", "calculus", "math"],
  "file": "<file_upload>"
}
```

#### Get/Update/Delete Resource
- **GET/PUT/DELETE** `/resources/{id}/`

### Search

#### Search Resources
- **GET** `/search/`
- **Query Parameters:**
  - `query` - Search term
  - `subject` - Filter by subject
  - `topic` - Filter by topic
  - `uploader` - Filter by uploader name

### Ratings

#### List/Create Ratings
- **GET/POST** `/resources/{resource_id}/ratings/`
- **POST Body:**
```json
{
  "rating_value": 5
}
```

### Comments

#### List/Create Comments
- **GET/POST** `/resources/{resource_id}/comments/`
- **POST Body:**
```json
{
  "content": "Great resource, very helpful!"
}
```

### Tags

#### List/Create Tags
- **GET/POST** `/tags/`

## Error Responses

### 400 Bad Request
```json
{
  "field_name": ["Error message"]
}
```

### 401 Unauthorized
```json
{
  "detail": "Authentication credentials were not provided."
}
```

### 404 Not Found
```json
{
  "detail": "Not found."
}
```

## File Upload

Files are uploaded to Cloudinary. Supported formats:
- PDF (.pdf)
- Word Documents (.docx, .doc)
- Images (.jpg, .jpeg, .png)

Maximum file size: 10MB