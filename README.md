![npm](https://img.shields.io/npm/v/nextline-web)
[![Unit tests](https://github.com/simonsobs/nextline-web/actions/workflows/unit-test.yml/badge.svg)](https://github.com/simonsobs/nextline-web/actions/workflows/unit-test.yml)

# Nextline-web

The front-end web app of Nextline.

_Nextline_ is a DAQ sequencer of the [Observatory Control System
(OCS)](https://github.com/simonsobs/ocs/). Nextline allows line-by-line
execution of concurrent Python scripts, which control telescopes, by multiple
users simultaneously from web browsers.

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

If you are on the localhost, the web app is running at <http://localhost:8080/nextline/>.

---

## License

- _Nextline_ is licensed under the MIT license.

---

## Contact

- [Tai Sakuma](https://github.com/TaiSakuma) <span itemscope itemtype="https://schema.org/Person"><a itemprop="sameAs" content="https://orcid.org/0000-0003-3225-9861" href="https://orcid.org/0000-0003-3225-9861" target="orcid.widget" rel="me noopener noreferrer" style="vertical-align:text-top;"><img src="https://orcid.org/sites/default/files/images/orcid_16x16.png" style="width:1em;margin-right:.5em;" alt="ORCID iD icon"></a></span>
