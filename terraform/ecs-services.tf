resource "aws_ecs_service" "mysql" {
  name                               = "mysql-hospital-system"
  cluster                            = aws_ecs_cluster.hospital-system-cluster.id
  task_definition                    = aws_ecs_task_definition.mysql.arn
  desired_count                      = 1
  deployment_minimum_healthy_percent = 0
  deployment_maximum_percent         = 100

}

resource "aws_ecs_service" "api-hospital-system" {
  name                               = "api-hospital-system"
  cluster                            = aws_ecs_cluster.hospital-system-cluster.id
  task_definition                    = aws_ecs_task_definition.api-hospital-system.arn
  desired_count                      = 1
  deployment_minimum_healthy_percent = 0
  deployment_maximum_percent         = 100
}
