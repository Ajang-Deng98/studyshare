terraform { 
  cloud { 
    organization = "studyshare" 
    workspaces { 
      name = "studyshare_workspace" 
    } 
  } 
}

provider "aws" {
  region = var.aws_region
}

# Data sources
data "aws_availability_zones" "available" {
  state = "available"
}

data "aws_ami" "ubuntu" {
  most_recent = true
  owners      = ["099720109477"] # Canonical

  filter {
    name   = "name"
    values = ["ubuntu/images/hvm-ssd/ubuntu-22.04-amd64-server-*"]
  }

  filter {
    name   = "virtualization-type"
    values = ["hvm"]
  }

  filter {
    name   = "state"
    values = ["available"]
  }
}

# EC2 Instances with fixed AMI
resource "aws_instance" "bastion" {
  ami           = "ami-000c63f74be5cb1c7"  # fixed AMI
  instance_type = "t2.micro"
  key_name      = var.key_pair_name
  subnet_id     = aws_subnet.public.id
  vpc_security_group_ids = [aws_security_group.app_sg.id]

  tags = { Name = "bastion-host" }
}


