import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import fc from "fast-check";

import type {
  CtrlRunNoQuery,
  CtrlRunNoSSubscription,
} from "@/graphql/codegen/generated";
import {
  useCtrlRunNoQuery,
  useCtrlRunNoSSubscription,
} from "@/graphql/codegen/generated";

import { useSubscribeRunNo } from "../use-run-no-subscription";

import { mockUseQueryResponse } from "./mock-use-query-response";
import { mockUseSubscriptionResponse } from "./mock-use-subscription-response";

vi.mock("@/graphql/codegen/generated", () => ({
  useCtrlRunNoQuery: vi.fn(),
  useCtrlRunNoSSubscription: vi.fn(),
}));

const fcRunNo = fc.integer({ min: 1 });
const fcQueryData = fc.oneof(
  fc.constant(undefined),
  fc.record({ ctrl: fc.record({ runNo: fcRunNo }) }),
);
const fcSubData = fc.oneof(fc.constant(undefined), fc.record({ ctrlRunNo: fcRunNo }));

const fcErrorInstance = fc.string().map((msg) => new Error(msg));
const fcError = fc.oneof(fc.constant(undefined), fcErrorInstance);

const fcQueryArg = fc.record({ data: fcQueryData, error: fcError });
const fcSubArg = fc.record({ data: fcSubData, error: fcError });

describe("useSubscribeRunNo()", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it("Property test", async () => {
    await fc.assert(
      fc.asyncProperty(fcQueryArg, fc.array(fcSubArg), async (queryArg, subArg) => {
        // Mock useCtrlRunNoQuery()
        const queryRes = mockUseQueryResponse<CtrlRunNoQuery>(queryArg);
        type Query = ReturnType<typeof useCtrlRunNoQuery>;
        vi.mocked(useCtrlRunNoQuery).mockReturnValue(queryRes as Query);

        // Mock useCtrlRunNoSSubscription()
        const { response: subRes, issue } =
          mockUseSubscriptionResponse<CtrlRunNoSSubscription>(subArg);
        type SubRes = ReturnType<typeof useCtrlRunNoSSubscription>;
        vi.mocked(useCtrlRunNoSSubscription).mockReturnValue(subRes as SubRes);

        const { runNo, error } = await useSubscribeRunNo();

        // Assert initial values are from query.
        expect(error.value).toBe(queryArg.error);
        expect(runNo.value).toBe(
          queryArg.error ? undefined : queryArg.data?.ctrl.runNo,
        );

        // Assert the subsequent values are issued from subscription backed up by query.
        for (const issued of issue) {
          const expectedError = issued.error || queryArg.error;
          const expectedRunNo = expectedError
            ? undefined
            : issued.data?.ctrlRunNo || queryArg.data?.ctrl.runNo;
          expect(error.value).toBe(expectedError);
          expect(runNo.value).toBe(expectedRunNo);
        }
      }),
    );
  });
});
