import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import fc from "fast-check";

import type {
  CtrlStateQuery,
  CtrlStateSSubscription,
} from "@/graphql/codegen/generated";

import { useQueryBackedSubscription } from "../use-query-backed-subscription";

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

describe("useQueryBackedSubscription()", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it("Property test", async () => {
    await fc.assert(
      fc.asyncProperty(fcQueryArg, fc.array(fcSubArg), async (queryArg, subArg) => {
        const query = await mockUseQueryResponse<CtrlStateQuery>(queryArg);

        const { response: subscription, issue } =
          mockUseSubscriptionResponse<CtrlStateSSubscription>(subArg);

        const mapQueryData = (d: typeof query.data) => d.value?.ctrl.state;
        const mapSubscriptionData = (d: typeof subscription.data) => d.value?.ctrlState;

        const options = { query, subscription, mapQueryData, mapSubscriptionData };
        const { data, error } = useQueryBackedSubscription(options);

        // Assert initial values are from query.
        expect(error.value).toBe(queryArg.error);
        expect(data.value).toBe(queryArg.error ? undefined : queryArg.data?.ctrl.state);

        // Assert the subsequent values are issued from subscription backed up by query.
        for (const issued of issue) {
          const expectedError = issued.error || queryArg.error;
          const expectedState = expectedError
            ? undefined
            : (issued.data?.ctrlState ?? queryArg.data?.ctrl.state);
          expect(error.value).toBe(expectedError);
          expect(data.value).toBe(expectedState);
        }
      }),
    );
  });
});
