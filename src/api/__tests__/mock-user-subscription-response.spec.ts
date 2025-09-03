import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import fc from "fast-check";

import type { CtrlStateSSubscription } from "@/graphql/codegen/generated";
import { useCtrlStateSSubscription } from "@/graphql/codegen/generated";

import { mockUserSubscriptionResponse } from "./mock-user-subscription-response";

vi.mock("@/graphql/codegen/generated", () => ({
  useCtrlStateQuery: vi.fn(),
  useCtrlStateSSubscription: vi.fn(),
}));

const fcState = fc.string({ minLength: 1 });

const fcErrorInstance = fc.string().map((msg) => new Error(msg));
const fcError = fc.oneof(fc.constant(undefined), fcErrorInstance);

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

type Sub = ReturnType<typeof useCtrlStateSSubscription>;

interface MockSubscription {
  sub: Sub;
  issue: Iterable<SRes>;
}

function mockUseCtrlStateSSubscriptionResponse(
  resArray: Iterable<SRes>,
): MockSubscription {
  return mockUserSubscriptionResponse<CtrlStateSSubscription>(
    resArray,
  ) as MockSubscription;
}

describe("mockUseCtrlStateSSubscriptionResponse()", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it("Property test", () => {
    fc.assert(
      fc.property(fc.array(fcSRes), (resArray) => {
        const { sub, issue } = mockUseCtrlStateSSubscriptionResponse(resArray);
        vi.mocked(useCtrlStateSSubscription).mockReturnValue(sub);
        const response = useCtrlStateSSubscription({ variables: {} });
        for (const issued of issue) {
          expect(response.error.value).toBe(issued.error);
          expect(response.data.value?.ctrlState).toEqual(issued.data?.ctrlState);
        }
      }),
    );
  });
});
