resource "aws_eip" "hospital-system" {
  instance = aws_spot_instance_request.hospital-system-cluster-instance.spot_instance_id
  vpc      = true

  lifecycle {
    prevent_destroy = true
  }
}

