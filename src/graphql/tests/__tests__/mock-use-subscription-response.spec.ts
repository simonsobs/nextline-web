import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { useSubscription } from "@urql/vue";
import type { UseSubscriptionResponse } from "@urql/vue";
import gql from "graphql-tag";
import fc from "fast-check";

import { mockUseSubscriptionResponse } from "..";

vi.mock("@urql/vue", () => ({
  useSubscription: vi.fn(),
}));

const query = gql`
  subscription CtrlStateS {
    ctrlState
  }
`;

type Data = { ctrlState: string };

const fcState = fc.string({ minLength: 1 });
const fcData = fc.oneof(fc.constant(undefined), fc.record({ ctrlState: fcState }));

const fcErrorInstance = fc.string().map((msg) => new Error(msg));
const fcError = fc.oneof(fc.constant(undefined), fcErrorInstance);

const fcArg = fc.record({ data: fcData, error: fcError });

describe("mockUseSubscriptionResponse()", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it("Property test", () => {
    fc.assert(
      fc.property(fc.array(fcArg), (arg) => {
        const { response, issue } = mockUseSubscriptionResponse<Data>(arg);

        type Response = UseSubscriptionResponse<Data>;
        vi.mocked(useSubscription).mockReturnValue(response as Response);

        // Assert the mock response is returned.
        const returned = useSubscription<Data>({ query });
        expect(returned).toBe(response);

        // Assert the mocked values are issued to the subscription.
        for (const issued of issue) {
          expect(response.error.value).toBe(issued.error);
          expect(response.data.value).toStrictEqual(issued.data);
        }
      }),
    );
  });
});
