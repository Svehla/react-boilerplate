variable "project" {
  description = "The name of the project"
}

variable "env" {
  description = "The enviroment"
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