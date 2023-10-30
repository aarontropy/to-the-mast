terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.16"
    }
  }

  cloud {
    organization = "tothemast"

    workspaces {
      name = "tothemast-platform"
    }
  }

  required_version = ">= 1.2.0"
}


provider "aws" {
  region = "us-east-1"
}

resource "aws_cognito_user_pool_client" "webapp-client" {
  name = "webapp-client"

  user_pool_id                         = aws_cognito_user_pool.pool.id
  allowed_oauth_flows                  = ["code", "implicit"]
  allowed_oauth_flows_user_pool_client = true
  allowed_oauth_scopes = [
    "aws.cognito.signin.user.admin",
    "email",
    "openid",
    "profile",
  ]
  callback_urls                = ["https://tothemast.app"]
  logout_urls                  = ["https://tothemast.app"]
  supported_identity_providers = ["COGNITO"]


}

resource "aws_cognito_user_pool_domain" "tothemast" {
  domain          = "auth.tothemast.app"
  certificate_arn = data.aws_acm_certificate.tothemast.arn
  user_pool_id    = aws_cognito_user_pool.pool.id
}

data "aws_route53_zone" "tothemast" {
  name = "tothemast.app"
}

data "aws_acm_certificate" "tothemast" {
  domain      = "*.tothemast.app"
  types       = ["AMAZON_ISSUED"]
  most_recent = true
}


resource "aws_route53_record" "auth-cognito-A" {
  name    = aws_cognito_user_pool_domain.tothemast.domain
  type    = "A"
  zone_id = data.aws_route53_zone.tothemast.zone_id
  alias {
    evaluate_target_health = false

    name    = aws_cognito_user_pool_domain.tothemast.cloudfront_distribution
    zone_id = aws_cognito_user_pool_domain.tothemast.cloudfront_distribution_zone_id
  }
}

data "aws_ses_email_identity" "verification" {
  email = "info@tothemast.app"
}


resource "aws_cognito_user_pool" "pool" {
  name = "to-the-mast-pool"

  auto_verified_attributes = ["email"]
  username_attributes      = ["email"]

  username_configuration {
    case_sensitive = false
  }

  email_configuration {
    email_sending_account = "DEVELOPER"
    from_email_address    = data.aws_ses_email_identity.verification.email
    source_arn            = data.aws_ses_email_identity.verification.arn
  }

  schema {
    attribute_data_type = "String"
    mutable             = true
    name                = "email"
    required            = true
    string_attribute_constraints {
      min_length = 1
      max_length = 2048
    }
  }

  schema {
    attribute_data_type = "String"
    mutable             = true
    name                = "nickname"
    required            = true
    string_attribute_constraints {
      min_length = 1
      max_length = 2048
    }
  }

}
