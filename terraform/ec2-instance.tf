resource "aws_spot_instance_request" "hospital-system-cluster-instance" {
  ami                         = "ami-038707d64e5b8e7ba"
  spot_price                  = "0.02"
  instance_type               = "m3.medium"
  availability_zone           = "sa-east-1a"
  instance_interruption_behaviour = "terminate"
  associate_public_ip_address = true
  private_ip                  = "10.0.1.55"
  spot_type                   = "persistent"


  user_data = <<EOF
Content-Type: multipart/mixed; boundary="==BOUNDARY=="
MIME-Version: 1.0

--==BOUNDARY==
Content-Type: text/cloud-boothook; charset="us-ascii"

# Set Docker daemon options
cloud-init-per once docker_options echo "{\"userland-proxy\": false}" > /etc/docker/daemon.json

--==BOUNDARY==
Content-Type: text/x-shellscript; charset="us-ascii"

#!/bin/bash
# Set any ECS agent configuration options
sudo su
echo ECS_CLUSTER=${aws_ecs_cluster.hospital-system-cluster.name} >> /etc/ecs/ecs.config
EOF

  iam_instance_profile   = aws_iam_instance_profile.ecs-instance-profile.id
  vpc_security_group_ids = [aws_security_group.sg_api.id]
  key_name               = "api-hospital-system"
  subnet_id              = data.aws_subnet.sn-1a-vpc.id
  tags = {
    Name        = "ECS Instance - Hospital System Cluster"
    Description = "ECS Instance - Hospital System Cluster"
  }
}




