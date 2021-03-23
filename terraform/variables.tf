variable "project" {
  description = "The name of the project"
  type        = string
}


variable "env" {
  description = "The enviroment"
  type        = string
}

variable "tags" {
  type = map(string)
}

variable "region" {
  description = "aws region"
  type        = string
}

variable "domain" {
  description = "domain"
}
