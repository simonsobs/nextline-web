#!/bin/bash
# Replace place holders with env vars in Vue files

source $(dirname -- "$0")/envvar.sh;

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
