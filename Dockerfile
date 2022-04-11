FROM node:16.14-alpine as build

COPY ./ app
WORKDIR /app
RUN npm install
COPY docker/env.local .env.local
RUN npm run build


#
FROM nginx:1.21

WORKDIR /app
COPY --from=build /app/dist site
COPY docker/entrypoint.sh .
COPY docker/setup.sh /docker-entrypoint.d/99-nextline-web-setup.sh
COPY docker/nginx-default.conf.template /etc/nginx/templates/default.conf.template

ENTRYPOINT ["./entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]
