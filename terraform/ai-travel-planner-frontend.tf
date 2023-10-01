resource "aws_cloudwatch_log_group" "ai-travel-planner-frontend" {
  name = "ai-travel-planner-frontend"
  retention_in_days = 3
}

resource "aws_ecs_task_definition" "ai-travel-planner-frontend" {
  family = "ai-travel-planner-frontend"
  requires_compatibilities = []
  tags = {
  }
  container_definitions = jsonencode(
    [
      {
        name = "ai-travel-planner-frontend"
        image = "ghcr.io/monash-fit3170/ai_travel_plan/aitravelplannerfrontend:${var.application-version}"
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
            awslogs-group = aws_cloudwatch_log_group.ai-travel-planner-frontend.name
            awslogs-region = var.region
            awslogs-stream-prefix = "ai-travel-planner-frontend"
          }
        }
      }
    ]
  )
}

resource "aws_ecs_service" "ai-travel-planner-frontend" {
  name = "ai-travel-planner-frontend"
  cluster = data.aws_ecs_cluster.ecs-cluster.id
  task_definition = aws_ecs_task_definition.ai-travel-planner-frontend.arn
  desired_count = 1
  deployment_maximum_percent = 100
  deployment_minimum_healthy_percent = 0
  launch_type = "EC2"
  wait_for_steady_state = true
}
