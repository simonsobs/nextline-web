import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { UseQueryResponse } from "@urql/vue";
import fc from "fast-check";

import type {
  CtrlStateQuery,
  CtrlStateQueryVariables,
} from "@/graphql/codegen/generated";
import { useCtrlStateQuery } from "@/graphql/codegen/generated";

import { mockUseQueryResponse } from "./mock-use-query-response";

vi.mock("@/graphql/codegen/generated", () => ({
  useCtrlStateQuery: vi.fn(),
  useCtrlStateSSubscription: vi.fn(),
}));

const fcState = fc.string({ minLength: 1 });

const fcErrorInstance = fc.string().map((msg) => new Error(msg));
const fcError = fc.oneof(fc.constant(undefined), fcErrorInstance);

interface QRes {
  data: { ctrl: { state: string } } | undefined;
  error: Error | undefined;
}

const fcQRes: fc.Arbitrary<QRes> = fc.record({
  data: fc.oneof(
    fc.constant(undefined),
    fc.record({
      ctrl: fc.record({
        state: fcState,
      }),
    }),
  ),
  error: fcError,
});

// type Query = ReturnType<typeof useCtrlStateQuery>;
type Query = UseQueryResponse<CtrlStateQuery, CtrlStateQueryVariables>;

function mockUseCtrlStateQueryResponse(res: QRes): Query {
  return mockUseQueryResponse<CtrlStateQuery>(res) as Query;
}

describe("mockUseCtrlStateQueryResponse()", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it("Property test", async () => {
    fc.assert(
      fc.asyncProperty(fcQRes, async (res) => {
        const query = mockUseCtrlStateQueryResponse(res);
        vi.mocked(useCtrlStateQuery).mockReturnValue(query);
        const response = useCtrlStateQuery({ variables: {} });
        expect(response.error.value).toBeUndefined();
        expect(response.data.value).toBeUndefined();
        await response;
        expect(response.error.value).toBe(res.error);
        expect(response.data.value?.ctrl.state).toBe(res.data?.ctrl.state);
      }),
    );
  });
});
