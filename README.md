# StudyShare - DevOps Final Assignment

## Team Information
**Group**: ADGROUP3
**Members**:
- **Ajang Chol Aguer Deng** - Infrastructure as Code (Terraform)
- **Latjor Dak** - Configuration Management & Continuous Deployment (Ansible)
- **Collins Junior** - Continuous Integration & Security (GitHub Actions)

## Live Application
🚀 **Deployed Application**: [http://studyshare-alb-1137467487.us-east-1.elb.amazonaws.com/](http://studyshare-alb-1137467487.us-east-1.elb.amazonaws.com/)

## Assignment Requirements Completed

### ✅ Infrastructure as Code (IaC) - Terraform
- Complete AWS infrastructure provisioning
- VPC with public/private subnets
- EC2 instances with security groups
- RDS PostgreSQL database
- Application Load Balancer
- ECR container registry
- Modular Terraform configuration

### ✅ Configuration Management - Ansible
- Automated server configuration
- Docker installation and management
- Application deployment automation
- Environment variable management
- Service orchestration

### ✅ Continuous Integration/Continuous Deployment (CI/CD)
- GitHub Actions workflows
- Automated testing and security scanning
- Docker image building and pushing to ECR
- Automated deployment through Ansible
- Branch protection and PR workflows

### ✅ Security Implementation
- Vulnerability scanning with Trivy
- Infrastructure security analysis with tfsec
- Secrets management via GitHub Secrets
- Network security with security groups
- Bastion host for secure access

### ✅ Documentation
- Comprehensive README with setup instructions
- Architecture diagrams
- Deployment procedures
- Troubleshooting guides

## Application Overview
StudyShare is a full-stack web application for educational resource sharing, built with:
- **Frontend**: React with TypeScript
- **Backend**: Django REST Framework
- **Database**: PostgreSQL
- **Deployment**: Containerized with Docker

## DevOps Architecture

### Infrastructure Architecture
```
┌─────────────────────────────────────────────────────────────┐
│                        AWS Cloud                            │
│  ┌─────────────────┐    ┌──────────────────┐              │
│  │   Internet      │    │  Application     │              │
│  │   Gateway       │────│  Load Balancer   │              │
│  └─────────────────┘    └──────────────────┘              │
│                                │                          │
│  ┌─────────────────┐           │         ┌──────────────┐ │
│  │  Public Subnet  │           │         │Private Subnet│ │
│  │ ┌─────────────┐ │           │         │┌────────────┐│ │
│  │ │ Bastion     │ │───────────┼─────────││App Server  ││ │
│  │ │ Host        │ │           │         ││(Docker)    ││ │
│  │ └─────────────┘ │           │         │└────────────┘│ │
│  └─────────────────┘           │         └──────────────┘ │
│                                │                          │
│                        ┌───────────────┐                 │
│                        │  RDS Database │                 │
│                        │  (PostgreSQL) │                 │
│                        └───────────────┘                 │
└─────────────────────────────────────────────────────────────┘
```

### DevOps Pipeline
```
┌──────────────┐   ┌─────────────┐   ┌──────────────┐   ┌─────────────┐
│   GitHub     │──▶│   GitHub    │──▶│     ECR      │──▶│   Ansible   │
│  Repository  │   │   Actions   │   │   Registry   │   │ Deployment  │
└──────────────┘   └─────────────┘   └──────────────┘   └─────────────┘
       │                  │                 │                  │
   Code Push         CI/CD Pipeline    Docker Images      Configuration
   & PR Merge        Security Scans    Storage           Management
```

## DevOps Technology Stack

### Infrastructure & Deployment
- **Cloud Provider**: Amazon Web Services (AWS)
- **Infrastructure as Code**: Terraform
- **Configuration Management**: Ansible
- **Containerization**: Docker
- **Container Registry**: Amazon ECR
- **CI/CD Platform**: GitHub Actions

### Application Stack
- **Frontend**: React with TypeScript, Tailwind CSS
- **Backend**: Django REST Framework
- **Database**: PostgreSQL (Amazon RDS)
- **Web Server**: Nginx
- **Load Balancer**: AWS Application Load Balancer

## Project Structure
```
studyshare/
├── 📁 terraform/              # Infrastructure as Code (IaC)
│   ├── main.tf               # AWS provider & backend config
│   ├── variables.tf          # Input variables
│   ├── outputs.tf            # Output values
│   ├── network.tf            # VPC, subnets, routing
│   ├── compute.tf            # EC2, ALB, target groups
│   ├── database.tf           # RDS PostgreSQL
│   ├── security.tf           # Security groups & IAM
│   └── registry.tf           # ECR repositories
├── 📁 ansible/               # Configuration Management
│   ├── playbook.yml          # Main deployment automation
│   ├── inventory.yml         # Server inventory
│   ├── templates/            # Configuration templates
│   └── vars.yml              # Ansible variables
├── 📁 .github/workflows/     # CI/CD Pipelines
│   └── cd.yml               # GitHub Actions workflow
├── 📁 frontend/              # React Application
│   ├── src/                  # React source code
│   ├── Dockerfile            # Frontend container
│   └── nginx.conf            # Nginx configuration
├── 📁 backend/               # Django REST API
│   ├── api/                  # Django app
│   ├── Dockerfile            # Backend container
│   └── requirements.txt      # Python dependencies
└── 📄 docker-compose.yml     # Local development setup
```

## Deployment Instructions

### Prerequisites
- AWS Account with administrative permissions
- GitHub repository with Actions enabled
- Terraform >= 1.5.0
- Ansible >= 2.9
- Docker (for local development)

### 1. Infrastructure Provisioning (Terraform)
```bash
# Clone repository
git clone <repository-url>
cd studyshare/terraform

# Initialize Terraform
terraform init

# Plan infrastructure
terraform plan

# Apply infrastructure
terraform apply
```

### 2. GitHub Secrets Configuration
Configure the following secrets in GitHub repository settings:
```
AWS_ACCESS_KEY_ID=<your-aws-access-key>
AWS_SECRET_ACCESS_KEY=<your-aws-secret-key>
SSH_PRIVATE_KEY=<ec2-private-key>
BASTION_PUBLIC_IP=<bastion-host-ip>
APP_SERVER_PRIVATE_IP=<app-server-private-ip>
DB_HOST=<rds-endpoint>
DB_USER=<database-username>
DB_PASSWORD=<database-password>
SECRET_KEY=<django-secret-key>
```

### 3. Automated Deployment
```bash
# Push to main branch triggers CI/CD
git add .
git commit -m "Deploy application"
git push origin main
```

### 4. Local Development Setup
```bash
# Start local environment
docker-compose up -d

# Access application
# Frontend: http://localhost:3000
# Backend: http://localhost:8000
```

## DevOps Implementation Details

### Continuous Integration (CI)
**Trigger**: Pull Requests to main branch

**Pipeline Steps**:
1. **Code Checkout** - Retrieve source code
2. **Security Scanning**:
   - **Trivy**: Container vulnerability scanning
   - **tfsec**: Terraform security analysis
   - **Critical vulnerability check**: Fails build if critical issues found
3. **Infrastructure Validation**:
   - Terraform format verification
   - Terraform configuration validation
4. **Quality Gates**: All checks must pass before merge

### Continuous Deployment (CD)
**Trigger**: Merge to main branch

**Deployment Pipeline**:
1. **Pre-deployment Security Scans**
2. **Docker Image Build**:
   - Multi-stage build (React + Django)
   - Image optimization and security hardening
3. **Container Registry Push**:
   - Push to Amazon ECR
   - Tag with commit SHA and 'latest'
4. **Infrastructure Deployment**:
   - SSH tunnel through bastion host
   - Ansible playbook execution
   - Rolling deployment strategy
5. **Health Verification**:
   - Application health checks
   - Load balancer target verification

### Configuration Management (Ansible)
**Responsibilities**:
- Server provisioning and configuration
- Docker installation and management
- Application deployment automation
- Environment variable management
- Service orchestration and monitoring

**Key Playbook Tasks**:
- System updates and security patches
- Docker service configuration
- Container deployment and management
- Nginx proxy configuration
- Health monitoring setup

## Security Implementation

### DevSecOps Integration
- **Shift-Left Security**: Security scanning in CI pipeline
- **Automated Vulnerability Assessment**: Trivy container scanning
- **Infrastructure Security**: tfsec static analysis
- **Build Failure on Critical Issues**: Prevents vulnerable deployments

### Network Security
- **VPC Isolation**: Private network (10.0.0.0/16)
- **Subnet Segmentation**: Public/private subnet architecture
- **Security Groups**: Least privilege firewall rules
- **Bastion Host**: Secure SSH access pattern
- **No Direct Internet Access**: Application servers in private subnets

### Access Control & Secrets
- **IAM Roles**: Principle of least privilege
- **GitHub Secrets**: Encrypted credential storage
- **No Hardcoded Secrets**: Environment-based configuration
- **SSH Key Management**: Secure key distribution

## Assignment Deliverables

### 1. Infrastructure as Code (IaC) ✅
- **Terraform Configuration**: Complete AWS infrastructure provisioning
- **Modular Design**: Separate modules for network, compute, database, security
- **State Management**: Remote state with proper backend configuration
- **Resource Optimization**: Cost-effective resource sizing and configuration

### 2. Configuration Management ✅
- **Ansible Automation**: Complete server configuration and application deployment
- **Idempotent Operations**: Repeatable and consistent deployments
- **Template Management**: Dynamic configuration file generation
- **Service Orchestration**: Multi-service application management

### 3. CI/CD Implementation ✅
- **GitHub Actions**: Complete CI/CD pipeline implementation
- **Automated Testing**: Security scanning and validation
- **Deployment Automation**: Zero-touch production deployments
- **Pipeline Security**: Integrated security scanning with build failures

### 4. Security Integration ✅
- **DevSecOps**: Security scanning integrated into CI/CD pipeline
- **Vulnerability Management**: Automated scanning with Trivy and tfsec
- **Network Security**: Secure architecture with bastion host pattern
- **Secrets Management**: Proper handling of sensitive information

### 5. Documentation & Operations ✅
- **Comprehensive Documentation**: Setup, deployment, and troubleshooting guides
- **Architecture Diagrams**: Visual representation of infrastructure and pipelines
- **Operational Procedures**: Clear instructions for maintenance and updates
- **Live Deployment**: Functional application accessible via public URL

## Team Contributions

### Ajang Chol Aguer Deng - Infrastructure as Code
- Designed and implemented complete Terraform infrastructure
- Created modular, reusable infrastructure components
- Configured AWS services (VPC, EC2, RDS, ALB, ECR)
- Implemented security best practices in infrastructure code

### Latjor Dak - Configuration Management & Deployment
- Developed comprehensive Ansible playbooks
- Automated application deployment and configuration
- Implemented container orchestration and management
- Created deployment templates and service configurations

### Collins Junior - CI/CD & Security
- Built complete GitHub Actions CI/CD pipeline
- Integrated security scanning (Trivy, tfsec)
- Implemented automated testing and deployment workflows
- Configured branch protection and security policies

## Conclusion

This project successfully demonstrates a complete DevOps implementation following industry best practices. The solution provides:

- **Automated Infrastructure**: Complete AWS infrastructure provisioned via Terraform
- **Secure Deployment**: Multi-stage security scanning and secure deployment patterns
- **Operational Excellence**: Automated configuration management and deployment
- **Scalable Architecture**: Cloud-native design supporting future growth
- **Security First**: Integrated security throughout the development lifecycle

The live application demonstrates the successful integration of all DevOps components, providing a fully functional, secure, and scalable web application deployment.

---

**Assignment Completed**: ✅ All requirements fulfilled  
**Live Application**: [StudyShare Platform](http://studyshare-alb-1137467487.us-east-1.elb.amazonaws.com/)  
**Repository**: Complete DevOps implementation with IaC, CM, and CI/CD
