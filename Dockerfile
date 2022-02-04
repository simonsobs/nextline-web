FROM node:16.13-alpine as build

COPY ./ app
WORKDIR /app
RUN npm install
COPY docker/env.local .env.local
RUN npm run build


##__________________________________________________________________||
FROM nginx:1.21

WORKDIR /app
RUN apt-get update && apt-get install -y dumb-init
COPY --from=build /app/dist site
COPY docker/cmd.sh .
COPY docker/nginx-default.conf /etc/nginx/conf.d/default.conf

ENTRYPOINT ["/usr/bin/dumb-init", "--"]
CMD [ "./cmd.sh" ]
