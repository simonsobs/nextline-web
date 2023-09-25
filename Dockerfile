FROM node:18.17-alpine as build

# https://github.com/docker/getting-started/issues/124
RUN apk add --no-cache python3 g++ make

COPY ./ app
WORKDIR /app

RUN apk --no-cache --virtual build-dependencies add \
  python3 \
  make \
  g++

# For "canvas": https://stackoverflow.com/a/66692565/7309855
# canvas is onlye used in unit testing with monaco-editor.
# It should be possible to write pacakge.json to avoid installing canvas in production.
# But, I don't know how to do it.
RUN apk add --update --no-cache \
    jpeg-dev \
    cairo-dev \
    giflib-dev \
    pango-dev \
    libtool \
    autoconf \
    automake

RUN yarn
COPY docker/env.local .env.local
RUN yarn build


# https://github.com/nginxinc/docker-nginx/tree/1.22.1
FROM nginx:1.22.1

RUN apt-get update && apt-get install -y jq

COPY --from=build /app/dist /app/dist
RUN mv docker-entrypoint.sh docker-entrypoint-base.sh
COPY docker/docker-entrypoint.sh .
COPY docker/docker-entrypoint.d/* /docker-entrypoint.d/
COPY docker/default.conf.template /etc/nginx/templates/
