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
  required_version = "v0.14.8"
}

provider "aws" {
  region = var.region
}

locals {
  tags = merge(var.tags, {
    project = var.project
    env     = var.env
  })
}