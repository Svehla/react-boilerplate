data "aws_canonical_user_id" "current_user" {}

resource "aws_s3_bucket" "this" {
  bucket = "${var.project}-s3-web-${var.env}"

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
