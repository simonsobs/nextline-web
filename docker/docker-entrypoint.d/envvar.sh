#!/bin/echo to be sourced
# This file is source by other files in this directory. 

PUBLIC_PATH="${PUBLIC_PATH:-/}"
API_HTTP="${API_HTTP:-http://localhost:8000}"
API_NAME="${API_NAME:-localhost}"

echo + "PUBLIC_PATH=${PUBLIC_PATH}"
echo + "API_HTTP=${API_HTTP}"
echo + "API_NAME=${API_NAME}"
