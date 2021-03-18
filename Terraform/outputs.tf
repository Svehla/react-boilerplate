output "cloud_front_domain" {
    value = aws_cloudfront_distribution.this.domain_name
}