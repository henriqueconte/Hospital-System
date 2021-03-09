
data "aws_iam_policy_document" "ecs-instance-policy" {
  statement {
    actions = ["sts:AssumeRole"]

    principals {
      type        = "Service"
      identifiers = ["ec2.amazonaws.com"]
    }
  }
}

resource "aws_iam_role" "ecs-instance-role" {
  name               = "ecs-instance-role-hospital-system"
  path               = "/"
  assume_role_policy = data.aws_iam_policy_document.ecs-instance-policy.json
}


resource "aws_iam_role_policy_attachment" "ecs-instance-role-attachment" {
  role       = aws_iam_role.ecs-instance-role.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonEC2ContainerServiceforEC2Role"
}

resource "aws_iam_instance_profile" "ecs-instance-profile" {
  name = "ecs-instance-profile-hospital-system"
  path = "/"
  role = aws_iam_role.ecs-instance-role.id
}


resource "aws_iam_role_policy_attachment" "ec2-instance-role-attachment-ecr-pull" {
  role       = aws_iam_role.ecs-instance-role.name
  policy_arn = aws_iam_policy.ecr-pull.arn
}

resource "aws_iam_role_policy_attachment" "ec2-instance-role-attachment-ecr-push" {
  role       = aws_iam_role.ecs-instance-role.name
  policy_arn = aws_iam_policy.ecr-uploader.arn
}