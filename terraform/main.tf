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

# Using fixed Ubuntu AMI ID
locals {
  ubuntu_ami = "ami-000c63f74be5cb1c7"
}



