# nextline-web

[![npm](https://img.shields.io/npm/v/nextline-web)](https://www.npmjs.com/package/nextline-web)
[![Unit tests](https://github.com/simonsobs/nextline-web/actions/workflows/unit-test.yml/badge.svg)](https://github.com/simonsobs/nextline-web/actions/workflows/unit-test.yml)


The front-end web app of Nextline.

_Nextline_ is a DAQ sequencer of the [Observatory Control System
(OCS)](https://github.com/simonsobs/ocs/). Nextline allows line-by-line
execution of concurrent Python scripts, which control telescopes, by multiple
users simultaneously from web browsers.

## Screenshot

![Screenshot](screenshot.png)

## How to run the Nextline front-end web app

The section shows how to run the Nextline front-end web app. To start, you need
to know the URL of the [back-end API
server](https://github.com/simonsobs/nextline-graphql).

### As a Docker container

Docker images of the Nextline front-end web app are created as
[ghcr.io/simonsobs/nextline-web](https://github.com/simonsobs/nextline-web/pkgs/container/nextline-web).

#### Environment variables in the container

You can configure the web app in the container with these variables.

| Environment variable | Default value           | Description                           |
| -------------------- | ----------------------- | ------------------------------------- |
| `PUBLIC_PATH`        | `/`                     | Path in the URL of the web app        |
| `API_HTTP`           | `http://localhost:8000` | URL of the GraphQL API server         |
| `API_NAME`           | `localhost`             | Text to be shown as part of the title |

For example, if you are to run the web app at the port `8080` with the path
`/nextline/` and use the GraphQL API server at `http://localhost:5000/graphql` as the name `API 1`, you can do so with the following command.

```bash
docker run -p 8080:80 -e PUBLIC_PATH=/nextline/ -e API_HTTP=http://localhost:5000/-e API_NAME="API 1" graphql ghcr.io/simonsobs/nextline-web
```

If you are on the `localhost`, the web app is running at <http://localhost:8080/nextline/>.
