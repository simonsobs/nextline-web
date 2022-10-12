#!/bin/bash
# Copy the Vue files to the Vue publicPath

source $(dirname -- "$0")/envvar.sh;

PUBLIC_PATH=${PUBLIC_PATH:?"undefined"}

DIST_DIR="/app/dist"
SITE_DIR_ROOT="/app/site"

SITE_DIR=$(echo $SITE_DIR_ROOT/$PUBLIC_PATH | tr -s /)
SITE_DIR=${SITE_DIR%/} # e.g., /app/site/vue


if [[ ! -d ${DIST_DIR} ]]
then
    echo "Error: ${DIST_DIR} doesn't exit!"
    exit 1
fi

command="rm -rf $SITE_DIR"
echo + $command
eval $command
command="mkdir -p $(dirname $SITE_DIR)"
echo + $command
eval $command
command="cp -a $DIST_DIR $SITE_DIR"
echo + $command
eval $command
