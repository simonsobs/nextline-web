#!/bin/bash

HTML_DIR="/app/site"
NGINX_ROOT="/"
CONFIG_JSON="config.json"

PUBLIC_PATH_PLACEHOLDER="/public_path_placeholder/"
API_HTTP_PLACEHOLDER="graphql_http_placeholder"

if [[ -z ${PUBLIC_PATH} ]]
then
    echo 'Error: ${PUBLIC_PATH} is not set!'
    exit 1
fi

if [[ -z ${API_HTTP} ]]
then
    echo 'Error: ${API_HTTP} is not set!'
    exit 1
fi

if [[ -z ${API_NAME} ]]
then
    echo 'Error: ${API_NAME} is not set!'
    exit 1
fi

if [[ ! -d ${HTML_DIR} ]]
then
    echo "Error: ${HTML_DIR} doesn't exit!"
    exit 1
fi

if [[ ! -f ${HTML_DIR}/${CONFIG_JSON} ]]
then
    echo "Error: ${HTML_DIR}/${CONFIG_JSON} doesn't exit!"
    exit 1
fi

# Update config.json
(
    command="cd ${HTML_DIR}"
    echo + $command
    $command
    command="echo \$(jq --arg api_name \"\${API_NAME}\" '.apiName = (\$api_name)' \${CONFIG_JSON}) > \${CONFIG_JSON}"
    echo + $command;
    eval $command;
)


# Move the Vue files to the Vue publicPath
if [[ "$PUBLIC_PATH" != "$NGINX_ROOT" ]]
then
    HTML_DIR_TEMP="$(mktemp -d)/site"
    command="mv $HTML_DIR $HTML_DIR_TEMP"
    echo + $command
    eval $command

    HTML_DIR=$(echo $HTML_DIR/$PUBLIC_PATH | tr -s /)
    HTML_DIR=${HTML_DIR%/} # e.g., /app/site/vue
    command="mkdir -p $(dirname $HTML_DIR)"
    echo + $command
    eval $command
    command="mv $HTML_DIR_TEMP $HTML_DIR"
    echo + $command
    eval $command
fi

# Replace place holders with env vars in Vue files
(
    command="cd $HTML_DIR"
    echo + $command
    $command
    for f in $(find . -type f);
    do
        command="sed -i -e \"s#$PUBLIC_PATH_PLACEHOLDER#$PUBLIC_PATH#g\" -e \"s#$API_HTTP_PLACEHOLDER#$API_HTTP#g\" $f";
        echo + $command;
        eval $command;
    done
)
