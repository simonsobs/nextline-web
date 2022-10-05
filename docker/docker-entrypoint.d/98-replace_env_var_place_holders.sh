#!/bin/bash
# Replace place holders with env vars in Vue files

PUBLIC_PATH=${PUBLIC_PATH:?"undefined"}
API_HTTP=${API_HTTP:?"undefined"}

SITE_DIR_ROOT="/app/site"

SITE_DIR=$(echo $SITE_DIR_ROOT/$PUBLIC_PATH | tr -s /)
SITE_DIR=${SITE_DIR%/} # e.g., /app/site/vue

PUBLIC_PATH_PLACEHOLDER="/public_path_placeholder/"
API_HTTP_PLACEHOLDER="graphql_http_placeholder"

PUBLIC_PATH="${PUBLIC_PATH%/}/"

if [[ ! -d ${SITE_DIR} ]]; then
    echo "Error: ${SITE_DIR} doesn't exit!"
    exit 1
fi

(
    command="cd $SITE_DIR"
    echo + $command
    $command
    for f in $(find . -type f); do
        command="sed -i -e \"s#$PUBLIC_PATH_PLACEHOLDER#$PUBLIC_PATH#g\" -e \"s#$API_HTTP_PLACEHOLDER#$API_HTTP#g\" $f"
        echo + $command
        eval $command
    done
)
