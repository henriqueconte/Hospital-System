resource "aws_ecs_task_definition" "mysql" {
  family                = "mysql"
  container_definitions = file("../mysql-task-definition.json")
}

resource "aws_ecs_task_definition" "api-hospital-system" {
  family                = "api-hospital-system"
  container_definitions = file("../api-task-definition.json")
}
