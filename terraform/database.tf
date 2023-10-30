

resource "aws_db_instance" "db-intents" {
  identifier                  = "tothemast"
  allocated_storage           = 20
  max_allocated_storage       = 20
  db_name                     = "tothemast_intents"
  engine                      = "postgres"
  engine_version              = "15.3"
  instance_class              = "db.t3.micro"
  username                    = "root"
  skip_final_snapshot         = true
  manage_master_user_password = true
}
