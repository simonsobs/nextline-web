import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { useQuery } from "@urql/vue";
import type { UseQueryResponse } from "@urql/vue";
import gql from "graphql-tag";
import fc from "fast-check";

import { mockUseQueryResponse } from "./mock-use-query-response";

vi.mock("@urql/vue", () => ({
  useQuery: vi.fn(),
}));

const query = gql`
  query CtrlState {
    ctrl {
      state
    }
  }
`;

type Variables = Record<string, never>; // Strictly empty, i.e., {}
const variables: Variables = {};

type Data = {
  __typename?: "Query";
  ctrl: { __typename?: "QueryCtrl"; state: string };
};

const fcState = fc.string({ minLength: 1 });
const fcData: fc.Arbitrary<Data | undefined> = fc.oneof(
  fc.constant(undefined),
  fc.record({
    ctrl: fc.record({
      state: fcState,
    }),
  }),
);

const fcErrorInstance = fc.string().map((msg) => new Error(msg));
const fcError = fc.oneof(fc.constant(undefined), fcErrorInstance);

const fcResponse = fc.record({
  data: fcData,
  error: fcError,
});

describe("mockUseCtrlStateQueryResponse()", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it("Property test", async () => {
    fc.assert(
      fc.asyncProperty(fcResponse, async (res) => {
        type Response = UseQueryResponse<Data, Variables>;
        const mockResponse = mockUseQueryResponse<Data>(res) as Response;
        vi.mocked(useQuery).mockReturnValue(mockResponse);
        const response = useQuery<Data, Variables>({ query, variables });
        expect(response).toBe(mockResponse);
        expect(response.error.value).toBeUndefined();
        expect(response.data.value).toBeUndefined();
        await response;
        expect(response.error.value).toBe(res.error);
        expect(response.data.value?.ctrl.state).toBe(res.data?.ctrl.state);
      }),
    );
  });
});
