#!/bin/bash
# Update config.json

source $(dirname -- "$0")/envvar.sh;

CONFIG_JSON="config.json"

if [[ ! -d ${SITE_DIR} ]]; then
    echo "Error: ${SITE_DIR} doesn't exit!"
    exit 1
fi

if [[ ! -f ${SITE_DIR}/${CONFIG_JSON} ]]; then
    echo "Error: ${SITE_DIR}/${CONFIG_JSON} doesn't exit!"
    exit 1
fi

(
    command="cd ${SITE_DIR}"
    echo + $command
    $command
    command="echo \$(jq --arg api_name \"\${API_NAME}\" --arg api_http \"\${API_HTTP}\" '.apiName = (\$api_name) | .apiHttp = (\$api_http)' \${CONFIG_JSON}) > \${CONFIG_JSON}"
    echo + $command
    eval $command
)
