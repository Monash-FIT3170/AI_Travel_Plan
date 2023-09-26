variable "region" {
  type = string
  description = "The AWS Region to create resources in"
  validation {
    condition = var.region != "" && var.region != null
    error_message = "Must specify region"
  }
}

variable "environment" {
  type = string
  description = "The deployment environment"
  validation {
    condition = var.environment != "" && var.environment != null
    error_message = "The environment must be Staging or Production"
  }
}

variable "application-version" {
  type = string
  validation {
    condition = var.application-version != "" && var.application-version != null
    error_message = "The application-version must be greater than 0"
  }
}

variable "ecs-cluster-name" {
  type = string
  description = "The name of the ecs cluster to deploy services into"
  validation {
    condition = var.ecs-cluster-name != "" && var.ecs-cluster-name != null
    error_message = "ECS Cluster Name must be provided"
  }
}
