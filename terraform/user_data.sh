#!/bin/bash
set -e

# Update system
apt-get update
apt-get upgrade -y

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh
usermod -aG docker ubuntu

# Install Docker Compose
curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose

# Install AWS CLI
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip awscliv2.zip
./aws/install

# Create application directory
mkdir -p /opt/studyshare
chown ubuntu:ubuntu /opt/studyshare

# Configure Docker to use ECR
echo '#!/bin/bash' > /usr/local/bin/ecr-login.sh
echo 'aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin ${ecr_repository_url}' >> /usr/local/bin/ecr-login.sh
chmod +x /usr/local/bin/ecr-login.sh