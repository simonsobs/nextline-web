#!/bin/bash
# Source docker-entrypoint.sh from Nginx image after setting environment
# variables with default values if not set

export PUBLIC_PATH="${PUBLIC_PATH:-/}"
export API_HTTP="${API_HTTP:-http://localhost:8000}"
export API_NAME="${API_NAME:-localhost}"

echo + "PUBLIC_PATH=${PUBLIC_PATH}"
echo + "API_HTTP=${API_HTTP}"
echo + "API_NAME=${API_NAME}"

source /docker-entrypoint.sh
