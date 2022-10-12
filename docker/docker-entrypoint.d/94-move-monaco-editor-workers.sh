#!/bin/bash
# Move monaco editor workers to the correct location

set -e

source $(dirname -- "$0")/envvar.sh;

FILE=$(basename $0)

BASE_NAME=monacoeditorwork

SOURCE=$(echo ${SITE_DIR}/${PUBLIC_PATH_PLACEHOLDER}/${BASE_NAME} | tr -s /)
DEST=$(echo ${SITE_DIR}/${BASE_NAME} | tr -s /)

if [[ ! -d ${SOURCE} ]]
then
    echo "$FILE: the source dir doesn't exist: $SOURCE"
    exit 0
fi

if [[ $SOURCE == $DEST ]]
then
    echo "$FILE: the source and destination are the same: $SOURCE"
    exit 0
fi

command="rm -rf $DEST"
echo + $command
eval $command

command="mv $SOURCE $DEST"
echo + $command
eval $command
