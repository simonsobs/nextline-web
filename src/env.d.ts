/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly PACKAGE_VERSION: string;
  readonly VITE_PUBLIC_PATH: string
  readonly VITE_GRAPHQL_HTTP: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}