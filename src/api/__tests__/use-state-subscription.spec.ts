import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { ref } from "vue";
import type { Ref } from "vue";
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
import { onReady } from "@/utils/on-ready";
import type { OnReady } from "@/utils/on-ready";

import { useSubscribeState } from "../use-state-subscription";

type MockUseQueryResponse<T> = OnReady<{
  data: Ref<T | undefined>;
  error: Ref<Error | undefined>;
}>;

interface MockUseQueryResponseArg<T> {
  data: T | undefined;
  error: Error | undefined;
}

function mockUseQueryResponse<T>(
  res: MockUseQueryResponseArg<T>,
): MockUseQueryResponse<T> {
  const data = ref<T | undefined>(undefined);
  const error = ref<Error | undefined>(undefined);

  const ready = (async () => {
    await Promise.resolve();
    data.value = res.data;
    error.value = res.error;
  })();

  return onReady({ data, error }, ready) as MockUseQueryResponse<T>;
}
interface MockUserSubscriptionResponseArgElement<T> {
  data: T | undefined;
  error: Error | undefined;
}

type MockUserSubscriptionResponseArg<T> = Iterable<
  MockUserSubscriptionResponseArgElement<T>
>;

interface MockUserSubscriptionResponse<T> {
  sub: {
    data: Ref<T | undefined>;
    error: Ref<Error | undefined>;
  };
  issue: MockUserSubscriptionResponseArg<T>;
}

function mockUserSubscriptionResponse<T>(
  resArray: MockUserSubscriptionResponseArg<T>,
): MockUserSubscriptionResponse<T> {
  const data = ref<T | undefined>(undefined);
  const error = ref<Error | undefined>(undefined);

  function* _issue() {
    for (const res of resArray) {
      data.value = res.data;
      error.value = res.error;
      yield res;
    }
  }
  const issue = _issue();
  const sub = { data, error };

  return { sub, issue } as MockUserSubscriptionResponse<T>;
}

vi.mock("@/graphql/codegen/generated", () => ({
  useCtrlStateQuery: vi.fn(),
  useCtrlStateSSubscription: vi.fn(),
}));

// const fcState = fc.oneof(fc.constant(undefined), fc.string({ minLength: 1 }));
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
        const { sub, issue } = mockUseCtrlStateSSubscriptionResponse(subResArray);
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
