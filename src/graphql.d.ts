// https://stackoverflow.com/a/71509868/7309855
declare module "*.gql" {
  import { DocumentNode } from "graphql";
  const Schema: DocumentNode;

  export = Schema;
}
