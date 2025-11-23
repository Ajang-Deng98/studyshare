# Video Demo Script (10-15 minutes)

## Demo Flow: Git-to-Production Workflow

### 1. Introduction (1 minute)
- Show live application: http://studyshare-alb-1137467487.us-east-1.elb.amazonaws.com/
- Demonstrate working features (login, upload, search)
- Explain the goal: Show complete Git-to-Production workflow

### 2. Architecture Overview (2 minutes)
- Show README.md architecture diagram
- Explain components:
  - AWS infrastructure (VPC, ALB, EC2, RDS)
  - Terraform for IaC
  - Ansible for configuration
  - GitHub Actions for CI/CD
  - Docker containers

### 3. Code Change (2 minutes)
- Make a visible change in the frontend
- Example: Change button text or color in `frontend/src/pages/Landing.tsx`
- Show the specific line being changed
- Commit to feature branch

### 4. Pull Request Creation (3 minutes)
- Create Pull Request on GitHub
- Show CI pipeline automatically triggering
- Demonstrate security scans running:
  - Trivy filesystem scan
  - tfsec infrastructure scan
  - Terraform validation
- Show all checks must pass (green checkmarks)

### 5. Merge and CD Pipeline (4 minutes)
- Merge PR to main branch
- Show CD pipeline automatically triggering
- Demonstrate deployment steps:
  - Security scanning
  - Docker image build and push to ECR
  - Ansible playbook execution
  - Application deployment

### 6. Live Verification (2 minutes)
- Refresh live application URL
- Show the change is now live
- Demonstrate the change took effect
- Show application still fully functional

### 7. Infrastructure & Security (1 minute)
- Show AWS console briefly:
  - Load balancer health checks
  - ECR with new image
  - RDS database running
- Highlight security features implemented

## Key Points to Emphasize

1. **Full Automation**: No manual steps in deployment
2. **Security First**: Scans run on every change
3. **Infrastructure as Code**: Everything version controlled
4. **Zero Downtime**: Rolling deployment with health checks
5. **Scalable Architecture**: Load balanced and database managed

## Recording Tips

- Use screen recording software (OBS, Loom, etc.)
- Show browser, GitHub, and terminal side by side
- Speak clearly and explain each step
- Keep total time between 10-15 minutes
- Upload to YouTube/Google Drive for sharing