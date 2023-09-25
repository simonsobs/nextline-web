#!/bin/bash
# Replace place holders with env vars in Vue files

source $(dirname -- "$0")/envvar.sh

[ -d "${SITE_DIR}" ] || {
    echo "Error: ${SITE_DIR} doesn't exist!"
    exit 1
}

(
    set -x
    cd $SITE_DIR
    for f in $(find . -type f); do
        sed -i -e "s#$PUBLIC_PATH_PLACEHOLDER#$PUBLIC_PATH#g" $f
    done
)
