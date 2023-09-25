#!/bin/bash
# export PUBLIC_PATH so it can be referred in nginx-default.conf.template.
# PUBLIC_PATH is also used in scripts in docker-entrypoint.d/.

export PUBLIC_PATH="${PUBLIC_PATH:-/}"
PUBLIC_PATH="${PUBLIC_PATH%/}/" # ensure trailing slash
echo + "PUBLIC_PATH=${PUBLIC_PATH}"
source /docker-entrypoint-base.sh
