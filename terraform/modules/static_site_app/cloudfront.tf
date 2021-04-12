resource "aws_cloudfront_distribution" "this" {
  origin {
    domain_name = aws_s3_bucket.this.bucket_regional_domain_name
    origin_id   = local.base_origin_id
  }

  enabled             = true
  is_ipv6_enabled     = true
  default_root_object = "index.html"


  aliases     = ["www.${var.subdomain_dot_prefix}${var.domain}", "${var.subdomain_dot_prefix}${var.domain}"]
  price_class = "PriceClass_100"
  tags = merge(
    local.tags,
    { Name = "${var.project}-${var.environment}" }
  )

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  default_cache_behavior {
    allowed_methods        = ["HEAD", "GET", "OPTIONS"]
    cached_methods         = ["HEAD", "GET", "OPTIONS"]
    compress               = true
    max_ttl                = 60
    target_origin_id       = local.base_origin_id
    viewer_protocol_policy = "redirect-to-https"
    forwarded_values {
      cookies {
        forward = "all"
      }
      query_string = true
    }
  }

  viewer_certificate {
    acm_certificate_arn = aws_acm_certificate_validation.cloudfront.certificate_arn
    ssl_support_method  = "sni-only"
  }

  custom_error_response {
    error_caching_min_ttl = 0
    error_code            = 404
    response_code         = 200
    response_page_path    = "/index.html"
  }

  custom_error_response {
    error_caching_min_ttl = 0
    error_code            = 403
    response_code         = 200
    response_page_path    = "/index.html"
  }

}
