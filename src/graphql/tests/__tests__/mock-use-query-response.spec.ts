import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { useQuery } from "@urql/vue";
import type { UseQueryResponse } from "@urql/vue";
import gql from "graphql-tag";
import fc from "fast-check";

import { mockUseQueryResponse } from "..";

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

type Data = { ctrl: { state: string } };

const fcState = fc.string({ minLength: 1 });
const fcData: fc.Arbitrary<Data | undefined> = fc.oneof(
  fc.constant(undefined),
  fc.record({ ctrl: fc.record({ state: fcState }) }),
);

const fcErrorInstance = fc.string().map((msg) => new Error(msg));
const fcError = fc.oneof(fc.constant(undefined), fcErrorInstance);

const fcArg = fc.record({ data: fcData, error: fcError });

describe("mockUseQueryResponse()", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it("Property test", async () => {
    fc.assert(
      fc.asyncProperty(fcArg, async (arg) => {
        const response = mockUseQueryResponse<Data>(arg);

        type Response = UseQueryResponse<Data>;
        vi.mocked(useQuery).mockReturnValue(response as Response);

        // Assert the mock response is returned.
        const returned = useQuery<Data>({ query });
        expect(response).toBe(returned);

        // Assert initially undefined.
        expect(response.fetching.value).toBe(true);
        expect(response.error.value).toBeUndefined();
        expect(response.data.value).toBeUndefined();

        // Await until the values are assigned.
        const state = await response;
        expect(response.fetching.value).toBe(false);

        // Confirm the object returned by await contains the same objects.
        expect(state.data).toBe(response.data);
        expect(state.error).toBe(response.error);

        // Assert the mocked values are assigned.
        expect(response.error.value).toBe(arg.error);
        expect(response.data.value).toStrictEqual(arg.data);
      }),
    );
  });
});
