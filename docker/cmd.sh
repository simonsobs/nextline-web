#!/bin/bash

##__________________________________________________________________||
VUE_APP_GRAPHQL_HTTP_DEFAULT="http://localhost:8000"
VUE_APP_PUBLIC_PATH_DEFAULT="/"

VUE_APP_GRAPHQL_HTTP_PLACEHOLDER="graphql_api_url_placeholder_to_be_replaced"
VUE_APP_PUBLIC_PATH_PLACEHOLDER="/vue_app_public_path_placeholder_to_be_replaced/"

HTML_DIR="/usr/share/nginx/html"

##__________________________________________________________________||
if [ -z $VUE_APP_GRAPHQL_HTTP ]
then
    echo 'Warning: $VUE_APP_GRAPHQL_HTTP is not set!'
    command="VUE_APP_GRAPHQL_HTTP=$VUE_APP_GRAPHQL_HTTP_DEFAULT"
    echo + $command
    eval $command
fi

if [ -z $VUE_APP_PUBLIC_PATH ]
then
    command="VUE_APP_PUBLIC_PATH=$VUE_APP_PUBLIC_PATH_DEFAULT"
    echo + $command
    eval $command
fi

if [ ! -d $HTML_DIR ]
then
    echo "Error: $HTML_DIR doesn't exit!"
    exit 1
fi

if [ "$VUE_APP_PUBLIC_PATH" != "$VUE_APP_PUBLIC_PATH_DEFAULT" ]
then
    HTML_DIR_TEMP="/tmp/html"
    command="mv $HTML_DIR $HTML_DIR_TEMP"
    echo + $command
    eval $command

    HTML_DIR=$(echo $HTML_DIR/$VUE_APP_PUBLIC_PATH | tr -s /)
    HTML_DIR=${HTML_DIR%/} # e.g., /usr/share/nginx/html/vue
    command="mkdir -p $(dirname $HTML_DIR)"
    echo + $command
    eval $command
    command="mv $HTML_DIR_TEMP $HTML_DIR"
    echo + $command
    eval $command
fi

##__________________________________________________________________||
(
    command="cd $HTML_DIR"
    echo + $command
    $command
    for f in $(find . -type f);
    do
        if [ -f $f ]; then
            command="sed -i \"s#$VUE_APP_GRAPHQL_HTTP_PLACEHOLDER#$VUE_APP_GRAPHQL_HTTP#g\" $f";
            echo + $command;
            eval $command;
        fi
    done
    for f in $(find . -type f);
    do
        if [ -f $f ]; then
            command="sed -i \"s#$VUE_APP_PUBLIC_PATH_PLACEHOLDER#$VUE_APP_PUBLIC_PATH#g\" $f";
            echo + $command;
            eval $command;
        fi
    done
)

##__________________________________________________________________||
command='nginx -g "daemon off;"'
echo + $command;
eval $command;

##__________________________________________________________________||
