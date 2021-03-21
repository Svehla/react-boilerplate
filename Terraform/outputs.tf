output "cloud_front_domain" {
  value = aws_cloudfront_distribution.this.domain_name
}

output "base_url" {
  value = "https://${aws_route53_record.root_domain.name}"
}
