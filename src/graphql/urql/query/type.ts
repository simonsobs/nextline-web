export interface Edge<Node> {
  node?: Node | null | undefined;
}

export interface PageInfo {
  hasNextPage?: boolean;
  hasPreviousPage?: boolean;
  startCursor?: string | null;
  endCursor?: string | null;
}

export interface Connection<Node> {
  pageInfo?: PageInfo;
  totalCount?: number;
  edges: (Edge<Node> | null)[];
}
