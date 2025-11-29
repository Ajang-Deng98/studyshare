## Project Name
StudyShare Web

## Team Members
- Ajang Chol Aguer Deng (Role: Terraform / IaC / AWS ECR / Ansible /)
- Latjor Dak (Role: Ansible / CD)
- Collins Junior (Role: CI / Security)

## Live Application
Access Live App: http://studyshare-alb-1137467487.us-east-1.elb.amazonaws.com/

## Architecture Overview
### Architecture Diagram
```
                                 AWS Cloud (VPC)
┌──────────────────────────────────────────────────────────────────────────┐
│                          10.0.0.0/16 (VPC)                               │
│                                                                          │
│  Public Subnets                           Private Subnets                │
│  ┌─────────────────────────────┐         ┌─────────────────────────────┐ │
│  │ Internet Gateway (IGW)      │         │  App Tier (10.0.2.0/24)     │ │
│  │                             │         │  ┌────────────────────────┐ │ │
│  │  ┌───────────────────────┐  │  HTTPS  │  │  Docker Host (EC2)     │ │ │
│  │  │  ALB (HTTP/HTTPS)     │◀─┼────────▶│  │  ┌────────┐  ┌───────┐ │ │ │
│  │  └───────────────────────┘  │         │  │  │Nginx   │  │React │ │ │ │
│  │  ┌───────────────────────┐  │  SSH    │  │  └────────┘  └───────┘ │ │ │
│  │  │ Bastion Host (EC2)    │◀─┼────────▶│  │  ┌───────────────────┐ │ │ │
│  │  └───────────────────────┘  │  (22)   │  │  │Django REST API    │ │ │ │
│  │  ┌───────────────────────┐  │         │  │  └───────────────────┘ │ │ │
│  │  │ NAT Gateway           │  │         │  └────────────────────────┘ │ │
│  │  └───────────────────────┘  │         └─────────────────────────────┘ │
│                                                                          │
│                         ┌────────────────────────────┐                    │
│                         │ RDS PostgreSQL (Private)   │◀─ Security Group  │
│                         │ 5432 only from App SG      │                    │
│                         └────────────────────────────┘                    │
│                                                                          │
│  Security Groups:                                                        │
│  - ALB SG: 80/443 from 0.0.0.0/0                                         │
│  - Bastion SG: 22 from your IP                                           │
│  - App SG: 80/8000 from ALB SG; egress to DB                             │
│  - DB SG: 5432 from App SG only                                          │
└──────────────────────────────────────────────────────────────────────────┘

External Services
┌──────────────────────────────┐       Push/Pull Images        ┌──────────┐
│ GitHub Actions (CI/CD)       │ ─────────────────────────────▶│   ECR    │
│  - Build & scan images       │                               └──────────┘
│  - Terraform + tfsec         │                                   ▲
│  - Ansible deploy via SSH    │  Deploy via Bastion (SSH)         │
└──────────────────────────────┘ ────────────────────────────────┘
```

### Component Description
- VPC with public & private subnets (isolation and security).
- Application Load Balancer routes HTTP traffic to ECS/EC2 hosted containers.
- Bastion host enables controlled administrative access.
- RDS PostgreSQL for persistent data storage.
- ECR registry stores versioned container images.
- Security groups enforce least-privilege ingress/egress.

### Communication Flow
Client → ALB → Backend API (Django) & Frontend (React static assets via Nginx) → Database (RDS). Bastion used only for admin/Ansible SSH. All private components deny direct public access.

### Security Controls
- Network segmentation (public vs private subnets).
- Security groups restricting ports (80/443, 22 via bastion only, DB internal only).
- IAM roles for resource-level access (ECR, RDS).
- Secrets injected via GitHub Actions & environment variables.
- Automated vulnerability and IaC scanning (Trivy, tfsec).

## Technology Stack
- Cloud Provider: AWS
- Application: Django REST Framework (backend) + React TypeScript (frontend)
- Database: PostgreSQL (Amazon RDS)
- Container Registry: Amazon ECR
- IaC: Terraform
- Config Management: Ansible
- CI/CD: GitHub Actions
- Security Tools: Trivy, tfsec

## Repository Structure
```
studyshare/
├─ terraform/        # Terraform IaC definitions
├─ ansible/          # Playbooks, inventory, templates
├─ backend/          # Django project & API app
├─ frontend/         # React + TS client
├─ docker-compose.yml# Local dev orchestration
├─ Dockerfile        # Root (if any additional build)
├─ .github/workflows # CI/CD pipelines
└─ README.md
```

## Setup Instructions
### Prerequisites
- AWS account (programmatic access keys)
- Terraform >= 1.5
- Ansible >= 2.9
- Docker & Docker Compose
- GitHub account (for Actions & secrets)
- SSH key pair for bastion/App hosts

### Deployment Steps
1. Clone repository:
   ```bash
   git clone https://github.com/Ajang-Deng98/studyshare
   cd studyshare/terraform
   ```
2. Configure Terraform variables in `terraform/variables.tf` or via `terraform.tfvars`:
   ```hcl
   aws_region = "us-east-1"
   db_username = "studyshare"
   db_password = "<secure-password>"
   ```
3. Initialize & provision infrastructure:
   ```bash
   terraform init
   terraform plan
   terraform apply -auto-approve
   ```
4. Capture outputs (ALB DNS, DB endpoint) from `terraform output`.
5. Add GitHub Secrets (Repository Settings → Secrets):
   - `AWS_ACCESS_KEY_ID`
   - `AWS_SECRET_ACCESS_KEY`
   - `DB_HOST`, `DB_USER`, `DB_PASSWORD`
   - `SECRET_KEY` (Django)
   - `SSH_PRIVATE_KEY` (private key for bastion/App)
   - `BASTION_PUBLIC_IP`, `APP_SERVER_PRIVATE_IP`
6. Push code to trigger CI/CD:
   ```bash
   git add .
   git commit -m "Initial deployment"
   git push origin main
   ```
7. Verify deployment via ALB DNS URL.

### Local Development
```bash
docker-compose up -d
# Frontend: http://localhost:3000
# Backend:  http://localhost:8000
```

### Tearing Down
```bash
cd terraform
terraform destroy -auto-approve
```
Clean up ECR images manually if required and remove GitHub Secrets.

## CI/CD Pipeline
### CI Pipeline
- Trigger: Pull Requests to `main`.
- Steps: Checkout → Dependency setup → Terraform validate/format → Security scanning (tfsec, Trivy) → Build & test → Report status.
- Security Scans: Trivy (containers), tfsec (Terraform), dependency checks.

### CD Pipeline
- Trigger: Merge to `main`.
- Flow: Re-run security scans → Build & tag images → Push to ECR → Ansible deploy via bastion → Health checks (ALB targets) → Completion notification.

## Security Measures
- Vulnerability Scanning: Trivy (images) each build.
- IaC Scanning: tfsec on Terraform code.
- Network: Private subnets, restricted security groups, bastion-only SSH.
- Secrets: Managed via GitHub Actions secrets; never committed.
- Principle of Least Privilege: Tight IAM policies for deployment roles.

## Challenges & Solutions
- Bastion Access: Implemented SSH proxying to reach private App host securely.
- Secrets Management: Centralized environment injection via GitHub Secrets to avoid hardcoding.
- Container Hardening: Reduced image surface (multi-stage builds, minimal base).
- IaC Drift: Enforced Terraform workflow (plan/apply) via CI to reduce manual changes.
- Vulnerability Noise: Filtered Trivy output to fail only on HIGH/CRITICAL severity.

## Video Demo
Watch Demo Video: https://youtu.be/bNPMC78i6jw

## License
This project is licensed under the terms of the existing `MIT Licensed` file (see repository root).

---
For questions or improvements, open an Issue or Pull Request.
