FROM node:16.13-alpine as build

WORKDIR /app
COPY ./ src
WORKDIR /app/src
RUN npm install
COPY docker/env.local .env.local
RUN npm run build


##__________________________________________________________________||
FROM nginx:1.21

RUN apt-get update && apt-get install -y dumb-init
COPY --from=build /app/src/dist /usr/share/nginx/html
COPY docker/etc-nginx-conf.d-default.conf /etc/nginx/conf.d/default.conf
COPY docker/cmd.sh /
RUN chmod +x /cmd.sh

ENTRYPOINT ["/usr/bin/dumb-init", "--"]
CMD [ "/cmd.sh" ]
