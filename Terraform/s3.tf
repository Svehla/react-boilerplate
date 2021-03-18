resource "aws_s3_bucket" "this" {
  bucket = "${var.project}-s3-web-${var.env}"


  grant {
    type = "Group"
    uri  = "http://acs.amazonaws.com/groups/global/AllUsers"
    permissions = [
      "READ_ACP"
    ]
  }
  grant {
    permissions = [
      "READ_ACP",
    ]
    type = "Group"
    uri  = "http://acs.amazonaws.com/groups/global/AuthenticatedUsers"
  }


  website {
    index_document = "index.html"
    error_document = "index.html"
  }

  cors_rule {
    allowed_origins = ["https://${var.domain}"]
    allowed_methods = ["GET"]
    max_age_seconds = 3000
  }


  tags = merge(local.tags,
    {
      Name = "${var.project}-${var.env}"
    }
  )
}