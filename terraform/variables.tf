variable "aws_region" {
  description = "AWS region"
  type        = string
  default     = "us-east-1"
}

variable "project_name" {
  description = "Name of the project"
  type        = string
  default     = "studyshare"
}

variable "environment" {
  description = "Environment name"
  type        = string
  default     = "prod"
}

variable "vpc_cidr" {
  description = "CIDR block for VPC"
  type        = string
  default     = "10.0.0.0/16"
}

variable "public_subnet_cidr" {
  description = "CIDR block for public subnet"
  type        = string
  default     = "10.0.1.0/24"
}

variable "private_subnet_cidr" {
  description = "CIDR block for private subnet"
  type        = string
  default     = "10.0.2.0/24"
}

variable "db_username" {
  description = "Database username"
  type        = string
  default     = "studyshare_user"
}

variable "db_password" {
  description = "Database password"
  type        = string
  sensitive   = true
}

variable "key_pair_name" {
  description = "AWS Key Pair name for EC2 instances"
  type        = string
  default     = "studyshare-key"
}

variable "TF_VAR_key_pair_name" {
  description = "AWS Key Pair name for EC2 instances (TF_VAR format)"
  type        = string
  default     = "studyshare-key"
}

variable "TF_VAR_db_password" {
  description = "Database password (TF_VAR format)"
  type        = string
  sensitive   = true
  default     = "SecurePassword123!"
}