#!/bin/bash
# Move monaco editor workers to the correct location

set -e

source $(dirname -- "$0")/envvar.sh

FILE=$(basename $0)

BASE_NAME=monacoeditorwork

SOURCE=$(echo ${SITE_DIR}/${PUBLIC_PATH_PLACEHOLDER}/${BASE_NAME} | tr -s /)
DEST=$(echo ${SITE_DIR}/${BASE_NAME} | tr -s /)

[ -d "${SOURCE}" ] || {
    echo "Error: ${SOURCE} doesn't exist!"
    exit 1
}

[[ $SOURCE == $DEST ]] && {
    echo "$FILE: the source and destination are the same: $SOURCE"
    exit 0
}

(
    set -x
    rm -rf $DEST
    mv $SOURCE $DEST
)
