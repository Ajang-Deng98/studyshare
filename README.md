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

## Technology Stack
- **Backend**: Django REST Framework (Python)
- **Frontend**: React + TypeScript + Tailwind CSS
- **Database**: PostgreSQL
- **Authentication**: JWT (JSON Web Tokens)
- **File Storage**: Local file system with download API
- **Other**: Axios for API calls, React Router for navigation

## Getting Started

### Prerequisites
- Python 3.8+
- Node.js 16+
- PostgreSQL 12+
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Ajang-Deng98/studyshare
   cd formative_1_group3
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

### Run the application

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

## Links
- [Project Repository](https://github.com/Ajang-Deng98/studyshare)
- [API Documentation](API_Documentation.md)
- [Setup Guide](setup.md)

## License
MIT License