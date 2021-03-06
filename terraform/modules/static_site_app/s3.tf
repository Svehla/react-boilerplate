data "aws_canonical_user_id" "current_user" {}

resource "aws_s3_bucket" "this" {
  bucket = "${var.project}-public-${var.subdomain_dot_prefix}${var.domain}"

  # TODO: add owner access into s3 bucket

  grant {
    permissions = [
      "READ_ACP",
    ]
    type = "Group"
    uri  = "http://acs.amazonaws.com/groups/global/AllUsers"
  }
  grant {
    permissions = [
      "READ_ACP",
    ]
    type = "Group"
    uri  = "http://acs.amazonaws.com/groups/global/AuthenticatedUsers"
  }

  grant {
    id = data.aws_canonical_user_id.current_user.id
    permissions = [
      "FULL_CONTROL",
    ]
    type = "CanonicalUser"
  }


  cors_rule {
    allowed_origins = ["https://www.${var.subdomain_dot_prefix}${var.domain}", "https://${var.subdomain_dot_prefix}${var.domain}"]
    allowed_methods = ["GET"]
    max_age_seconds = 3000
  }


  tags = merge(local.tags,
    {
      Name = "${var.project}-${var.environment}"
    }
  )
}
