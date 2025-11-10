# StudyShare
Empowering African students through collaborative learning and resource sharing

## African Context
In many African universities, students face challenges accessing quality study materials due to limited library resources, expensive textbooks, and inadequate digital infrastructure. StudyShare addresses this by creating a collaborative platform where students and teachers can freely share academic resources, fostering a community-driven approach to education that aligns with African values of ubuntu and collective learning.

## Team Members
- AJANG CHOL AGUER DENG - Full Stack Developer 
- COLLINS JUNIOR - Frontend Developer  
- LATJOR WOUN - Frontend Developer

## Project Overview
StudyShare is a comprehensive web-based platform designed to democratize access to educational resources across African universities. The application enables students and educators to upload, share, and access study materials including lecture notes, past examination papers, research documents, and multimedia content.

The platform promotes collaborative learning by allowing users to rate resources, provide feedback through comments, and discover high-quality materials through an intelligent search system. By leveraging modern web technologies, StudyShare creates an inclusive digital learning environment that transcends geographical and economic barriers.

## Target Users
- University students seeking quality study materials
- Educators wanting to share resources with broader academic community
- Academic institutions looking to enhance resource accessibility
- Study groups and learning communities

## Core Features
- **Resource Sharing**: Upload and download academic materials in multiple formats (PDF, DOCX, images, videos)
- **Collaborative Rating System**: Community-driven quality assurance through ratings and comments
- **Advanced Search & Filtering**: Find resources by subject, topic, course code, or uploader
- **User Authentication**: Secure JWT-based authentication with role-based access (Student/Teacher)
- **Responsive Design**: Mobile-friendly interface accessible on all devices
- **File Management**: Organized storage with preview capabilities and download tracking
- **Real-time Notifications**: Get notified when resources are commented on or rated
- **Bookmark System**: Save favorite resources for quick access
- **Category Management**: Organize resources by academic subjects and courses
- **Download Analytics**: Track resource popularity and usage statistics
- **Content Moderation**: Report inappropriate content and admin review system
- **Offline Access**: Download resources for offline studying
- **Multi-language Support**: Interface available in English, French, and Swahili
- **Dark/Light Theme**: Toggle between themes for comfortable viewing

## Technology Stack
- **Backend**: Django REST Framework (Python)
- **Frontend**: React + TypeScript + Tailwind CSS
- **Database**: PostgreSQL
- **Authentication**: JWT (JSON Web Tokens)
- **File Storage**: Local file system with download API
- **Caching**: Redis for session management
- **Search Engine**: Elasticsearch for advanced search capabilities
- **File Processing**: Celery for background tasks
- **API Documentation**: Swagger/OpenAPI
- **Testing**: Jest (Frontend), Pytest (Backend)
- **Deployment**: Docker, Nginx, Gunicorn
- **Monitoring**: Sentry for error tracking
- **Other**: Axios for API calls, React Router for navigation

## Getting Started

### Prerequisites
- Docker and Docker Compose (recommended)
- OR Python 3.11+, Node.js 18+, PostgreSQL 15+
- Git

### Quick Start with Docker (Recommended)

1. **Clone the repository**
   ```bash
   git clone https://github.com/Ajang-Deng98/studyshare
   cd studyshare
   ```

2. **Run with Docker Compose**
   ```bash
   docker-compose up --build
   ```

3. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000/api/
   - Admin Panel: http://localhost:8000/admin/

### Manual Installation (Alternative)

1. **Clone the repository**
   ```bash
   git clone https://github.com/Ajang-Deng98/studyshare
   cd studyshare
   ```

2. **Backend Setup**
   ```bash
   cd backend
   python -m venv venv
   venv\Scripts\activate  # Windows
   # source venv/bin/activate  # Mac/Linux
   pip install -r requirements.txt
   ```

3. **Database Setup**
   ```bash
   python manage.py makemigrations
   python manage.py migrate
   python manage.py createsuperuser
   ```

4. **Frontend Setup**
   ```bash
   cd ../frontend
   npm install
   ```

### Run the application manually

1. **Start Backend Server**
   ```bash
   cd backend
   python manage.py runserver
   ```

2. **Start Frontend Server**
   ```bash
   cd frontend
   npm start
   ```

3. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000/api/
   - Admin Panel: http://localhost:8000/admin/

### Docker Commands

**Development:**
- **Build and start all services**: `docker-compose up --build`
- **Start in background**: `docker-compose up -d`
- **Stop all services**: `docker-compose down`
- **View logs**: `docker-compose logs -f`
- **Rebuild specific service**: `docker-compose build backend`

**Production:**
- **Setup environment**: `cp .env.docker .env` (then edit .env with your values)
- **Deploy**: `docker-compose -f docker-compose.prod.yml up -d --build`
- **Stop**: `docker-compose -f docker-compose.prod.yml down`

**Individual Services:**
- **Backend only**: `docker build -t studyshare-backend ./backend`
- **Frontend only**: `docker build -t studyshare-frontend ./frontend`
- **Combined app**: `docker build -t studyshare-app .`

## Usage

1. **Registration**: Create account as Student or Teacher
2. **Upload Resources**: Share study materials with title, description, and tags
3. **Search & Download**: Find resources using filters and download files
4. **Rate & Comment**: Provide feedback on resource quality
5. **Profile Management**: View uploaded resources and manage account

## Project Structure
```
formative_1_group3/
├── backend/
│   ├── studyshare/          # Django project settings
│   ├── api/                 # Main API application
│   │   ├── models.py        # Database models
│   │   ├── views.py         # API endpoints
│   │   ├── serializers.py   # Data serialization
│   │   └── urls.py          # URL routing
│   ├── media/               # Uploaded files
│   └── requirements.txt     # Python dependencies
├── frontend/
│   ├── src/
│   │   ├── components/      # Reusable React components
│   │   ├── pages/           # Page components
│   │   ├── hooks/           # Custom React hooks
│   │   ├── types/           # TypeScript interfaces
│   │   └── utils/           # Utility functions
│   ├── public/              # Static assets
│   └── package.json         # Node.js dependencies
└── README.md
```

## API Endpoints

### Authentication
- `POST /api/auth/register/` - User registration
- `POST /api/auth/login/` - User login
- `POST /api/auth/logout/` - User logout
- `GET /api/auth/profile/` - Get user profile

### Resources
- `GET /api/resources/` - List all resources
- `POST /api/resources/` - Upload new resource
- `GET /api/resources/{id}/` - Get resource details
- `PUT /api/resources/{id}/` - Update resource
- `DELETE /api/resources/{id}/` - Delete resource
- `POST /api/resources/{id}/rate/` - Rate resource
- `GET /api/resources/search/` - Search resources

## Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

### Code Style
- Follow PEP 8 for Python code
- Use ESLint and Prettier for JavaScript/TypeScript
- Write meaningful commit messages
- Add tests for new features

## Testing

### Backend Tests
```bash
cd backend
python manage.py test
```

### Frontend Tests
```bash
cd frontend
npm test
```

## Deployment

### Production Setup
1. Set environment variables in `.env`
2. Configure PostgreSQL database
3. Set up Redis for caching
4. Configure Nginx for static files
5. Use Gunicorn for WSGI server

### Environment Variables
```bash
DEBUG=False
SECRET_KEY=your-secret-key
DATABASE_URL=postgresql://user:pass@localhost/dbname
REDIS_URL=redis://localhost:6379
ALLOWED_HOSTS=yourdomain.com
```

## Troubleshooting

### Common Issues
- **CORS errors**: Check CORS settings in Django settings
- **File upload fails**: Verify MEDIA_ROOT and file permissions
- **Database connection**: Ensure PostgreSQL is running
- **Frontend build fails**: Clear node_modules and reinstall

## Roadmap

- [ ] Mobile app development (React Native)
- [ ] AI-powered resource recommendations
- [ ] Integration with university LMS systems
- [ ] Video streaming capabilities
- [ ] Collaborative study rooms
- [ ] Gamification features
- [ ] Multi-university network

## Links
- [Project Repository](https://github.com/Ajang-Deng98/studyshare)
- [API Documentation](API_Documentation.md)
- [Setup Guide](setup.md)
- [Live Demo](https://studyshare-demo.com)
- [Bug Reports](https://github.com/Ajang-Deng98/studyshare/issues)

## License
MIT License

## Acknowledgments
- African Development Bank for inspiration
- Open source community for tools and libraries
- Beta testers from various African universities
- Contributors and maintainers