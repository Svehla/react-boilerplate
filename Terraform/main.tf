terraform {
  backend "s3" {
    region         = "eu-central-1"
    bucket         = "serverless-example-terraform-up-and-running-state"
    key            = "react-boilerplate"
    encrypt        = true
    dynamodb_table = "terraform-up-and-running-locks"
    acl            = "bucket-owner-full-control"
  }

  # verify terraform version
  required_version = "v0.14.7"
}

provider "aws" {
  region = var.region
}

provider "aws" {
  region = "us-east-1"
  alias  = "us_east_1"
}

locals {
  tags = merge(var.tags, {
    project = var.project
    env     = var.env
  })

  base_origin_id = "Origin${aws_s3_bucket.this.bucket}"
}
