#!/bin/bash
# Copy the Vue files to the Vue publicPath

source $(dirname -- "$0")/envvar.sh

[ -d "${DIST_DIR}" ] || {
    echo "Error: ${DIST_DIR} doesn't exist!"
    exit 1
}

(
    set -x
    rm -rf $SITE_DIR
    mkdir -p $(dirname $SITE_DIR)
    cp -a $DIST_DIR $SITE_DIR
)
