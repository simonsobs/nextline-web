FROM node:16.17-alpine as build

COPY ./ app
WORKDIR /app
RUN yarn
COPY docker/env.local .env.local
RUN yarn build


#
FROM nginx:1.21

RUN apt-get update && apt-get install -y jq

WORKDIR /app
COPY --from=build /app/dist dist
COPY --from=build /app/dist/public_path_placeholder/monacoeditorwork dist/monacoeditorwork
COPY docker/docker-entrypoint.d/* /docker-entrypoint.d/
COPY docker/nginx-default.conf.template /etc/nginx/templates/default.conf.template
