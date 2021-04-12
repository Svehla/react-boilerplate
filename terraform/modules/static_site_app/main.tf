

provider "aws" {
  profile = "default"
  region  = var.region
}

provider "aws" {
  profile = "default"
  region  = "us-east-1"
  alias   = "us_east_1"
}

locals {
  tags = merge(var.tags, {
    project = var.project
    env     = var.environment
  })

  base_origin_id = "Origin${aws_s3_bucket.this.bucket}"
}
