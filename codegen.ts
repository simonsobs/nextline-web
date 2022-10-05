import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "http://localhost:8000",
  documents: "src/graphql/**/*.gql",
  generates: {
    "src/gql": {
      preset: "client",
      plugins: ["typescript", "typescript-operations", "typescript-vue-urql"],
    },
  },
};

export default config;
