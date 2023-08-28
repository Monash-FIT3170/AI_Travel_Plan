resource "aws_cloudwatch_log_group" "ai-travel-planner-backend" {
  name = "ai-travel-planner-backend"
  retention_in_days = 3
}

resource "aws_ecs_task_definition" "ai-travel-planner-backend" {
  family = "ai-travel-planner-backend"
  requires_compatibilities = []
  tags = {
  }
  container_definitions = jsonencode(
    [
      {
        name = "ai-travel-planner-backend"
        image = "ghcr.io/monash-fit3170/ai_travel_plan/aitravelplannerbackend:${var.application-version}"
        cpu = 256
        memory = 256
        essential = true
        mountPoints = []
        portMappings = []
        volumesFrom = []
        environment = [
          { name = "DOTNET_ENVIRONMENT", value = var.environment },
        ]
        logConfiguration = {
          logDriver = "awslogs"
          options = {
            awslogs-group = aws_cloudwatch_log_group.ai-travel-planner-backend.name
            awslogs-region = var.region
            awslogs-stream-prefix = "ai-travel-planner-backend"
          }
        }
      }
    ]
  )
}

resource "aws_ecs_service" "ai-travel-planner-backend" {
  name = "ai-travel-planner-backend"
  cluster = data.aws_ecs_cluster.ecs-cluster.id
  task_definition = aws_ecs_task_definition.ai-travel-planner-frontend.arn
  desired_count = 1
  deployment_maximum_percent = 100
  deployment_minimum_healthy_percent = 0
  launch_type = "EC2"
  wait_for_steady_state = true
}
