data "aws_vpc" "vpc" {
  id = "vpc-0914f8c23bab99eea"
}

data "aws_internet_gateway" "default" {
  filter {
    name   = "attachment.vpc-id"
    values = [data.aws_vpc.vpc.id]
  }
}

data "aws_subnet" "sn-1a-vpc" {
  availability_zone = "sa-east-1a"
  vpc_id            = data.aws_vpc.vpc.id
}

