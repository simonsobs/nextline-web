FROM node:18.16-alpine as build

# https://github.com/docker/getting-started/issues/124
RUN apk add --no-cache python3 g++ make

COPY ./ app
WORKDIR /app

RUN apk --no-cache --virtual build-dependencies add \
  python3 \
  make \
  g++

RUN yarn
COPY docker/env.local .env.local
RUN yarn build


#
FROM nginx:1.22.0

RUN apt-get update && apt-get install -y jq

COPY --from=build /app/dist /app/dist
COPY docker/docker-entrypoint.d/* /docker-entrypoint.d/
COPY docker/nginx-default.conf.template /etc/nginx/templates/default.conf.template
