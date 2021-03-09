resource "aws_cloudwatch_log_group" "hospital-system-mysql" {
  name              = "/ecs/hospital-system-mysql"
  retention_in_days = 7
}

resource "aws_cloudwatch_log_group" "hospital-system-api" {
  name              = "/ecs/hospital-system-api"
  retention_in_days = 7
}
