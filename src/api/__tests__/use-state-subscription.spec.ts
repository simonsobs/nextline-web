import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import fc from "fast-check";

import type {
  CtrlStateQuery,
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

const fcState = fc.string();
const fcQueryData = fc.oneof(
  fc.constant(undefined),
  fc.record({ ctrl: fc.record({ state: fcState }) }),
);
const fcSubData = fc.oneof(fc.constant(undefined), fc.record({ ctrlState: fcState }));

const fcErrorInstance = fc.string().map((msg) => new Error(msg));
const fcError = fc.oneof(fc.constant(undefined), fcErrorInstance);

const fcQueryArg = fc.record({ data: fcQueryData, error: fcError });
const fcSubArg = fc.record({ data: fcSubData, error: fcError });

describe("useSubscribeState()", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it("Property test", async () => {
    await fc.assert(
      fc.asyncProperty(fcQueryArg, fc.array(fcSubArg), async (queryArg, subArg) => {
        // Mock useCtrlStateQuery()
        const queryRes = mockUseQueryResponse<CtrlStateQuery>(queryArg);
        type Query = ReturnType<typeof useCtrlStateQuery>;
        vi.mocked(useCtrlStateQuery).mockReturnValue(queryRes as Query);

        // Mock useCtrlStateSSubscription()
        const { response: subRes, issue } =
          mockUseSubscriptionResponse<CtrlStateSSubscription>(subArg);
        type SubRes = ReturnType<typeof useCtrlStateSSubscription>;
        vi.mocked(useCtrlStateSSubscription).mockReturnValue(subRes as SubRes);

        const { state, error } = await useSubscribeState();

        // Assert initial values are from query.
        expect(error.value).toBe(queryArg.error);
        expect(state.value).toBe(
          queryArg.error ? undefined : queryArg.data?.ctrl.state,
        );

        // Assert the subsequent values are issued from subscription backed up by query.
        for (const issued of issue) {
          const expectedError = issued.error || queryArg.error;
          const expectedState = expectedError
            ? undefined
            : (issued.data?.ctrlState ?? queryArg.data?.ctrl.state);
          expect(error.value).toBe(expectedError);
          expect(state.value).toBe(expectedState);
        }
      }),
    );
  });
});
