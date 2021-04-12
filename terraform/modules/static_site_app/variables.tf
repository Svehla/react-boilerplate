variable "project" {
  description = "The name of the project"
  type        = string
}

variable "environment" {
  description = "The enviroment"
  type        = string
}

variable "tags" {
  type    = map(string)
  default = {}
}

variable "region" {
  description = "aws region"
  type        = string
}

variable "domain" {
  description = "domain"
}

variable "subdomain_dot_prefix" {
  description = "this variable has to end with dot. for example my-subdom."
  type        = string
}
