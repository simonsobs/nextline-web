#!/bin/bash

##__________________________________________________________________||
API_HTTP_DEFAULT="http://localhost:8000"
PUBLIC_PATH_DEFAULT="/"

API_HTTP_PLACEHOLDER="graphql_http_placeholder"
PUBLIC_PATH_PLACEHOLDER="/public_path_placeholder/"

HTML_DIR="/app/site"

##__________________________________________________________________||
if [ -z $API_HTTP ]
then
    echo 'Warning: $API_HTTP is not set!'
    command="API_HTTP=$API_HTTP_DEFAULT"
    echo + $command
    eval $command
fi

if [ -z $PUBLIC_PATH ]
then
    command="PUBLIC_PATH=$PUBLIC_PATH_DEFAULT"
    echo + $command
    eval $command
fi

if [ ! -d $HTML_DIR ]
then
    echo "Error: $HTML_DIR doesn't exit!"
    exit 1
fi

##__________________________________________________________________||
(
    command="cd $HTML_DIR"
    echo + $command
    $command
    for f in $(find . -type f);
    do
        command="sed -i \"s#$API_HTTP_PLACEHOLDER#$API_HTTP#g\" $f";
        echo + $command;
        eval $command;
    done
    for f in $(find . -type f);
    do
        command="sed -i \"s#$PUBLIC_PATH_PLACEHOLDER#$PUBLIC_PATH#g\" $f";
        echo + $command;
        eval $command;
    done
)

##__________________________________________________________________||
command='nginx -g "daemon off;"'
echo + $command;
eval $command;

##__________________________________________________________________||
