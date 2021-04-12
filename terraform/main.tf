

locals {

  tags    = {}
  domain  = "noad.cz"
  region  = "eu-central-1"
  project = "noad"
}

terraform {
  backend "s3" {
    region         = "eu-central-1"
    bucket         = "node-graphql-boilerplate-terraform-up-and-running-state"
    key            = "react-boilerplate"
    encrypt        = true
    dynamodb_table = "node-graphql-boilerplate-terraform-up-and-running-locks"
    acl            = "bucket-owner-full-control"
  }

  required_version = "v0.14.8"
}

provider "aws" {
  profile = "default"
  region  = var.region
}

provider "aws" {
  profile = "default"
  region  = "us-east-1"
  alias   = "us_east_1"
}

module "static_site_app__production" {
  source = "./modules/static_site_app"

  environment          = "production"
  subdomain_dot_prefix = ""

  region  = local.region
  domain  = local.domain
  project = local.project
}

module "static_site_app__stage-1" {
  source = "./modules/static_site_app"

  environment          = "stage1"
  subdomain_dot_prefix = "stage-1."

  region  = local.region
  domain  = local.domain
  project = local.project
}
