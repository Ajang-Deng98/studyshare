# StudyShare - Collaborative Learning Platform

## 🌐 Live Application
**URL**: http://studyshare-alb-1137467487.us-east-1.elb.amazonaws.com/

## 📋 Overview
StudyShare is a collaborative platform where students and teachers can upload, share, and access academic resources like notes, past papers, and flashcards. Built with modern DevOps practices and deployed on AWS.

## 🏗️ Architecture

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Internet      │    │  Application     │    │   Private       │
│   Gateway       │────│  Load Balancer   │────│   Subnet        │
└─────────────────┘    └──────────────────┘    └─────────────────┘
                                │                        │
                                │                ┌───────────────┐
                                │                │  App Server   │
                                │                │  (Docker)     │
                                │                └───────────────┘
┌─────────────────┐             │                        │
│  Public Subnet  │             │                        │
│                 │             │                ┌───────────────┐
│ ┌─────────────┐ │             │                │  RDS Database │
│ │ Bastion     │ │─────────────┘                │  (PostgreSQL) │
│ │ Host        │ │                              └───────────────┘
│ └─────────────┘ │
└─────────────────┘
```

## 🛠️ Technology Stack

### Frontend
- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **React Router** for navigation
- **Axios** for API communication

### Backend
- **Django 4.2** with Django REST Framework
- **PostgreSQL** database
- **JWT Authentication**
- **File upload/download** functionality

### Infrastructure
- **AWS EC2** for compute
- **AWS RDS** for database
- **AWS ALB** for load balancing
- **AWS ECR** for container registry
- **Terraform** for Infrastructure as Code
- **Ansible** for configuration management

### DevOps
- **Docker** containerization
- **GitHub Actions** CI/CD
- **Trivy** security scanning
- **tfsec** infrastructure scanning

## 🚀 Setup Instructions

### Prerequisites
- AWS Account with appropriate permissions
- Terraform >= 1.0
- Ansible >= 2.9
- Docker >= 20.0
- Node.js >= 18
- Python >= 3.11

### 1. Infrastructure Deployment

```bash
# Clone repository
git clone <repository-url>
cd studyshare

# Deploy infrastructure
cd terraform
terraform init
terraform plan
terraform apply

# Note the outputs for Ansible configuration
```

### 2. Application Deployment

```bash
# Configure Ansible inventory with Terraform outputs
cd ../ansible
# Update inventory.yml with server IPs
# Update vars.yml with database credentials

# Deploy application
ansible-playbook -i inventory.yml playbook.yml
```

### 3. CI/CD Setup

1. Configure GitHub Secrets:
   - `AWS_ACCESS_KEY_ID`
   - `AWS_SECRET_ACCESS_KEY`
   - `SSH_PRIVATE_KEY`
   - `BASTION_PUBLIC_IP`
   - `APP_SERVER_PRIVATE_IP`
   - `DB_HOST`
   - `DB_USER`
   - `DB_PASSWORD`
   - `SECRET_KEY`

2. Push to main branch to trigger deployment

## 🔄 Git-to-Production Workflow

1. **Developer makes changes** and creates Pull Request
2. **CI Pipeline runs** on PR:
   - Security scanning (Trivy, tfsec)
   - Code linting and validation
   - Infrastructure validation
3. **PR Review** and merge to main
4. **CD Pipeline triggers**:
   - Builds Docker images
   - Pushes to ECR
   - Deploys via Ansible
5. **Live application updated** automatically

## 🔒 Security Features

- **Container scanning** with Trivy
- **Infrastructure scanning** with tfsec
- **Private subnets** for application servers
- **Bastion host** for secure access
- **Security groups** with minimal required access
- **JWT authentication** for API access
- **HTTPS-ready** configuration

## 📁 Project Structure

```
studyshare/
├── terraform/           # Infrastructure as Code
│   ├── main.tf
│   ├── variables.tf
│   ├── outputs.tf
│   └── ...
├── ansible/            # Configuration Management
│   ├── playbook.yml
│   ├── inventory.yml
│   └── templates/
├── backend/            # Django API
│   ├── manage.py
│   ├── requirements.txt
│   └── ...
├── frontend/           # React Application
│   ├── package.json
│   ├── src/
│   └── ...
├── .github/workflows/  # CI/CD Pipelines
│   └── cd.yml
└── docker-compose.yml
```

## 🎯 Features

### User Management
- User registration and authentication
- Profile management
- JWT-based security

### Resource Management
- Upload academic resources (PDFs, images, documents)
- Download and view resources
- Search and filter by subject, topic, course code
- Rating and commenting system

### Responsive Design
- Mobile-friendly interface
- Dark/light theme support
- Accessible design

## 🔧 Operations Manual

### Monitoring
- Check application health: `curl http://<alb-url>/`
- View container logs: `docker logs <container-name>`
- Database connectivity: Check RDS console

### Troubleshooting
- **502 Bad Gateway**: Check container status and logs
- **Database connection**: Verify RDS security groups
- **Deployment failures**: Check GitHub Actions logs

### Scaling
- Increase EC2 instance size in Terraform
- Add additional app servers behind ALB
- Configure RDS read replicas for read scaling

## 📊 Performance
- **Load Balancer**: Distributes traffic across instances
- **Database**: Managed RDS with automated backups
- **CDN-ready**: Static assets can be served via CloudFront
- **Container optimization**: Multi-stage builds for smaller images

## 🤝 Contributing
1. Fork the repository
2. Create feature branch
3. Make changes and test locally
4. Create Pull Request
5. Wait for CI checks to pass
6. Merge after review

## 📄 License
This project is licensed under the MIT License.

## 👥 Team
- **DevOps Engineer**: Infrastructure and deployment automation
- **Full-Stack Developer**: Application development
- **Security Engineer**: Security scanning and compliance

---
**Last Updated**: November 2025
**Version**: 1.0.0