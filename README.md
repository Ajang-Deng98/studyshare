# StudyShare - DevOps Summative Final Project

## Team Members
- AJANG CHOL AGUER DENG - Full Stack Developer & DevOps (Terraform/IaC)
- COLLINS JUNIOR - Frontend Developer & CI/Security  
- LATJOR WOUN - Frontend Developer & Ansible/CD

## Live Application
[Access Live App](http://studyshare-alb-1137467487.us-east-1.elb.amazonaws.com/)

## Project Overview
StudyShare is a comprehensive web-based platform designed to democratize access to educational resources across African universities. The application enables students and educators to upload, share, and access study materials including lecture notes, past examination papers, research documents, and multimedia content.

## Architecture Overview

### Architecture Diagram
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

### Component Description
- **VPC**: Private network (10.0.0.0/16) with DNS support
- **Public Subnet**: Hosts bastion host and ALB for internet access
- **Private Subnet**: Contains application server for security
- **Bastion Host**: SSH jumpbox for secure server access
- **Application Load Balancer**: Distributes traffic with health checks
- **EC2 Instance**: Runs containerized application
- **RDS PostgreSQL**: Managed database with automated backups
- **ECR**: Private container registry for Docker images
- **Security Groups**: Network-level firewall rules

## Technology Stack
- **Cloud Provider**: AWS
- **Application**: Django REST API + React Frontend
- **Database**: PostgreSQL (RDS)
- **Container Registry**: ECR
- **IaC**: Terraform
- **Config Management**: Ansible
- **CI/CD**: GitHub Actions

## Repository Structure
```
studyshare/
├── terraform/           # Infrastructure as Code
│   ├── main.tf         # Provider and backend configuration
│   ├── variables.tf    # Input variables
│   ├── outputs.tf      # Output values
│   ├── network.tf      # VPC, subnets, routing
│   ├── compute.tf      # EC2, ALB, target groups
│   ├── database.tf     # RDS configuration
│   ├── security.tf     # Security groups
│   └── registry.tf     # ECR repositories
├── ansible/            # Configuration Management
│   ├── playbook.yml    # Main deployment playbook
│   ├── inventory.yml   # Server inventory
│   └── templates/      # Configuration templates
├── .github/workflows/  # CI/CD Pipelines
│   └── cd.yml         # Combined CI/CD workflow
├── frontend/           # React Application
├── backend/            # Django API
└── docker-compose.yml  # Local development
```

## Getting Started

### Prerequisites
- AWS account with appropriate permissions
- Terraform installed
- Ansible installed
- GitHub account
- Python 3.8+ (for local development)
- Node.js 16+ (for local development)
- PostgreSQL 12+ (for local development)

### Deployment Steps
1. Clone the repository
2. Configure Terraform variables in `terraform/variables.tf`
3. Initialize and apply Terraform:
   ```bash
   cd terraform
   terraform init
   terraform apply
   ```
4. Configure GitHub Secrets:
   - AWS_ACCESS_KEY_ID
   - AWS_SECRET_ACCESS_KEY
   - SSH_PRIVATE_KEY
   - BASTION_PUBLIC_IP
   - APP_SERVER_PRIVATE_IP
   - DB_HOST, DB_USER, DB_PASSWORD
5. Push to main branch to trigger deployment

### Local Development
1. **Clone the repository**
   ```bash
   git clone [your-repo-url]
   cd studyshare
   ```

2. **Backend Setup**
   ```bash
   cd backend
   python -m venv venv
   venv\Scripts\activate  # Windows
   pip install -r requirements.txt
   python manage.py migrate
   python manage.py createsuperuser
   ```

3. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   npm start
   ```

### Tearing Down
```bash
cd terraform
terraform destroy
```

## CI/CD Pipeline

### CI Pipeline
- **Triggers on**: Pull Requests
- **Steps**:
  1. Checkout code
  2. Setup Terraform
  3. Run security scans (Trivy + tfsec)
  4. Terraform format check
  5. Terraform validation
- **Security scans**: 
  - Trivy: Container and filesystem vulnerability scanning
  - tfsec: Infrastructure security analysis
  - Fails build on critical vulnerabilities

### CD Pipeline
- **Triggers on**: Merge to main branch
- **Deployment process**:
  1. Run all CI checks
  2. Build and push Docker image to ECR
  3. Configure SSH access through bastion
  4. Execute Ansible playbook for deployment
  5. Verify application health

## Security Measures
- **Vulnerability Scanning**: Trivy scans for critical CVEs in containers and dependencies
- **Infrastructure Security**: tfsec validates Terraform for security best practices
- **Network Security**: Private subnets, security groups with least privilege access
- **Access Control**: Bastion host for SSH access, no direct internet access to app servers
- **Secret Management**: GitHub Secrets for sensitive data, no hardcoded credentials

## Challenges & Solutions

### Challenge 1: Infrastructure as Code Implementation
**Problem**: Designing modular Terraform configuration for complete AWS infrastructure including VPC, EC2, RDS, ALB, and ECR while ensuring all components work together
**Solution**: Created separate .tf files for each component (network.tf, compute.tf, database.tf, security.tf, registry.tf) with proper variable management and outputs for seamless integration

### Challenge 2: DevSecOps Integration with Build Failure Logic
**Problem**: Implementing security scanning that automatically fails CI pipeline on critical vulnerabilities while maintaining deployment efficiency
**Solution**: Integrated Trivy and tfsec scans with JSON output parsing to count critical vulnerabilities and exit with code 1, ensuring no vulnerable code reaches production

### Challenge 3: Automated Git-to-Production Workflow
**Problem**: Creating fully automated deployment pipeline that triggers on main branch merge and deploys through bastion host using Ansible
**Solution**: Implemented GitHub Actions workflow with ECR authentication, SSH configuration through bastion, and Ansible playbook execution for zero-touch deployment

## License
MIT License
