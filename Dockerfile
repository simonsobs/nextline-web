FROM node:16.13-alpine as build

COPY ./ app
WORKDIR /app
RUN npm install
COPY docker/env.local .env.local
RUN npm run build


##__________________________________________________________________||
FROM nginx:1.21

WORKDIR /app
COPY --from=build /app/dist site
COPY docker/cmd.sh /docker-entrypoint.d/05-nextline-web-entrypoint.sh
COPY docker/nginx-default.conf /etc/nginx/conf.d/default.conf
