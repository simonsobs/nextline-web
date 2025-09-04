import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { UseQueryResponse } from "@urql/vue";
import fc from "fast-check";

import type {
  CtrlStateQuery,
  CtrlStateQueryVariables,
  CtrlStateSSubscription,
} from "@/graphql/codegen/generated";
import {
  useCtrlStateQuery,
  useCtrlStateSSubscription,
} from "@/graphql/codegen/generated";

import { useSubscribeState } from "../use-state-subscription";

import { mockUseQueryResponse } from "./mock-use-query-response";
import { mockUseSubscriptionResponse } from "./mock-use-subscription-response";

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

interface SRes {
  data: { ctrlState: string } | undefined;
  error: Error | undefined;
}

const fcSRes: fc.Arbitrary<SRes> = fc.record({
  data: fc.oneof(
    fc.constant(undefined),
    fc.record({
      ctrlState: fcState,
    }),
  ),
  error: fcError,
});

// type Query = ReturnType<typeof useCtrlStateQuery>;
type Query = UseQueryResponse<CtrlStateQuery, CtrlStateQueryVariables>;

type Sub = ReturnType<typeof useCtrlStateSSubscription>;

function mockUseCtrlStateQueryResponse(res: QRes): Query {
  return mockUseQueryResponse<CtrlStateQuery>(res) as Query;
}

interface MockSubscription {
  response: Sub;
  issue: Iterable<SRes>;
}

function mockUseCtrlStateSSubscriptionResponse(
  resArray: Iterable<SRes>,
): MockSubscription {
  return mockUseSubscriptionResponse<CtrlStateSSubscription>(
    resArray,
  ) as MockSubscription;
}

describe("useSubscribeState()", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it("Property test", async () => {
    await fc.assert(
      fc.asyncProperty(fcQRes, fc.array(fcSRes), async (queryRes, subResArray) => {
        const query = mockUseCtrlStateQueryResponse(queryRes);
        const { response: sub, issue } =
          mockUseCtrlStateSSubscriptionResponse(subResArray);
        vi.mocked(useCtrlStateQuery).mockReturnValue(query);
        vi.mocked(useCtrlStateSSubscription).mockReturnValue(sub);
        const { state, error } = await useSubscribeState();
        expect(error.value).toBe(queryRes.error);
        expect(state.value).toBe(
          queryRes.error ? undefined : queryRes.data?.ctrl.state,
        );
        for (const issued of issue) {
          const expectedError = issued.error || queryRes.error;
          const expectedState = expectedError
            ? undefined
            : issued.data?.ctrlState || queryRes.data?.ctrl.state;
          expect(error.value).toBe(expectedError);
          expect(state.value).toBe(expectedState);
        }
      }),
    );
  });
});
