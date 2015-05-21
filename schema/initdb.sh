#!/bin/bash

# Create test DB (dev DB has already been created at Docker container initialization)
gosu postgres postgres --single -jE <<-EOSQL
	CREATE DATABASE marcell_test ;
EOSQL
echo

# Init SQL schema
gosu postgres postgres --single -jE marcell < /app/schema/beta_user.sql
gosu postgres postgres --single -jE marcell_test < /app/schema/beta_user.sql
