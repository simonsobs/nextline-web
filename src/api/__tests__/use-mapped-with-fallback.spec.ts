import { describe, expect, it } from "vitest";
import fc from "fast-check";

import { useMappedWithFallback } from "../use-mapped-with-fallback";

import { mockUseQueryResponse } from "./mock-use-query-response";
import { mockUseSubscriptionResponse } from "./mock-use-subscription-response";

type QueryData = { ctrl: { state: string } };
type SubscriptionData = { ctrlState: string };

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

describe("useMappedWithFallback()", () => {
  it("Property test", async () => {
    await fc.assert(
      fc.asyncProperty(fcQueryArg, fc.array(fcSubArg), async (queryArg, subArg) => {
        const { response: response1, issue } =
          mockUseSubscriptionResponse<SubscriptionData>(subArg);
        const response2 = await mockUseQueryResponse<QueryData>(queryArg);

        const map1 = (d: typeof response1.data) => d.value?.ctrlState;
        const map2 = (d: typeof response2.data) => d.value?.ctrl.state;

        const options = { response1, response2, map1, map2 };
        const { data, error } = useMappedWithFallback(options);

        // Assert initial values are from query.
        expect(error.value).toBe(queryArg.error);
        expect(data.value).toBe(queryArg.error ? undefined : queryArg.data?.ctrl.state);

        // Assert the subsequent values are issued from subscription backed up by query.
        for (const issued of issue) {
          const expectedError = issued.error ?? queryArg.error;
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
