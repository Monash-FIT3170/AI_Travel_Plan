terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.7.0"
    }
  }

  backend "s3" { }

  required_version = "~> 1.5.2"
}

provider "aws" {
  region = var.region

  default_tags {
    tags = {
      Environment = var.environment
      Component = "Ai-Travel-Planner"
      Owner = "FIT3170"
      Team = "Group 5"
    }
  }
}
