resource "aws_ecs_task_definition" "mysql" {
  lifecycle {
    ignore_changes = [
      container_definitions,
    ]
  }


  family                = "mysql"
  container_definitions = file("../mysql-task-definition.json")
}

resource "aws_ecs_task_definition" "api-hospital-system" {
  
  lifecycle {
    ignore_changes = [
      container_definitions,
    ]
  }

  
  family                = "api-hospital-system"
  container_definitions = file("../api-task-definition.json")
}
