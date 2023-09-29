
export interface Edge<Node> {
  node?: Node | null | undefined;
}

export interface Connection<Node> {
  totalCount: number;
  edges: (Edge<Node> | null)[];
}
