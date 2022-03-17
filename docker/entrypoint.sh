#!/bin/bash
# Source docker-entrypoint.sh from Nginx image after setting environment
# variables with default values if not set

export API_HTTP="${API_HTTP:-http://localhost:8000}"
export PUBLIC_PATH="${PUBLIC_PATH:-/}"

echo + "API_HTTP=${API_HTTP}"
echo + "PUBLIC_PATH=${PUBLIC_PATH}"

source /docker-entrypoint.sh