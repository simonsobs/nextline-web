#!/bin/bash
# Update config.json with all env variables

source $(dirname -- "$0")/envvar.sh

CONFIG_JSON="config.json"

[ -d "${SITE_DIR}" ] || {
    echo "Error: ${SITE_DIR} doesn't exist!"
    exit 1
}

[ -f "${SITE_DIR}/${CONFIG_JSON}" ] || {
    echo "Error: ${SITE_DIR}/${CONFIG_JSON} doesn't exist!"
    exit 1
}

function toCamelCase() {
    # e.g., GRAPHQL_HTTP -> graphqlHttp

    # Split the string into an array by underscore
    IFS="_" read -ra words <<<"$1"
    
    # Convert the first word to all lower case
    # Capitalize the first letter of each of subsequent words
    for i in "${!words[@]}"; do
        words[$i]=$(echo "${words[$i]}" | tr '[:upper:]' '[:lower:]')
        if [ $i -gt 0 ]; then
            words[$i]=$(echo "${words[$i]}" | sed -r 's/(^|_)([a-z])/\U\2/g')
        fi
    done

    # Join the array elements with no delimiter
    con=${words[@]}
    echo ${con// /}
}

(
    set -x
    cd $SITE_DIR
    
    # Loop over all env variables
    for var in $(compgen -e); do
        var_camel_case=$(toCamelCase $var)
        echo $(jq ".${var_camel_case} |= \"${!var}\"" ${CONFIG_JSON}) >${CONFIG_JSON}
    done

    # Prettify the json file
    jq . ${CONFIG_JSON} >${CONFIG_JSON}.tmp && mv ${CONFIG_JSON}.tmp ${CONFIG_JSON}

    # Print on stdout
    jq . ${CONFIG_JSON}
)
