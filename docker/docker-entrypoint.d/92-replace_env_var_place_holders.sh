#!/bin/bash
# Replace place holders with env vars in Vue files

source $(dirname -- "$0")/envvar.sh;

PUBLIC_PATH=${PUBLIC_PATH:?"undefined"}

SITE_DIR_ROOT="/app/site"

SITE_DIR=$(echo $SITE_DIR_ROOT/$PUBLIC_PATH | tr -s /)
SITE_DIR=${SITE_DIR%/} # e.g., /app/site/vue

PUBLIC_PATH_PLACEHOLDER="/public_path_placeholder/"

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
        command="sed -i -e \"s#$PUBLIC_PATH_PLACEHOLDER#$PUBLIC_PATH#g\" $f"
        echo + $command
        eval $command
    done
)
