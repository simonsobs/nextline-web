#!/bin/echo to be sourced
# This file is source by other files in this directory. 

PUBLIC_PATH="${PUBLIC_PATH:-/}"
API_HTTP="${API_HTTP:-http://localhost:8000}"
API_NAME="${API_NAME:-localhost}"

PUBLIC_PATH="${PUBLIC_PATH%/}/" # ensure trailing slash

echo + "PUBLIC_PATH=${PUBLIC_PATH}"
echo + "API_HTTP=${API_HTTP}"
echo + "API_NAME=${API_NAME}"

DIST_DIR="/app/dist"
SITE_DIR_ROOT="/app/site"

SITE_DIR=$(echo $SITE_DIR_ROOT/$PUBLIC_PATH | tr -s /)
SITE_DIR=${SITE_DIR%/} # e.g., /app/site/vue

PUBLIC_PATH_PLACEHOLDER="/public_path_placeholder/"
