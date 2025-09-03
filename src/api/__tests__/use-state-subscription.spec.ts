import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { ref } from "vue";
import fc from "fast-check";

import {
  useCtrlStateQuery,
  useCtrlStateSSubscription,
} from "@/graphql/codegen/generated";
import type { CtrlStateSSubscription } from "@/graphql/codegen/generated";
import { onReady } from "@/utils/on-ready";

import { useSubscribeState } from "../use-state-subscription";

vi.mock("@/graphql/codegen/generated", () => ({
  useCtrlStateQuery: vi.fn(),
  useCtrlStateSSubscription: vi.fn(),
}));

const fcState = fc.oneof(fc.constant(undefined), fc.string({ minLength: 1 }));

const fcErrorInstance = fc.string().map((msg) => new Error(msg));
const fcError = fc.oneof(fc.constant(undefined), fcErrorInstance);

interface QRes {
  data: { ctrl: { state: string | undefined } };
  error: Error | undefined;
}

const fcQRes: fc.Arbitrary<QRes> = fc.record({
  data: fc.record({
    ctrl: fc.record({
      state: fcState,
    }),
  }),
  error: fcError,
});

interface SRes {
  data: { ctrlState: string | undefined };
  error: Error | undefined;
}

const fcSRes: fc.Arbitrary<SRes> = fc.record({
  data: fc.record({
    ctrlState: fcState,
  }),
  error: fcError,
});

type Query = ReturnType<typeof useCtrlStateQuery>;
type Sub = ReturnType<typeof useCtrlStateSSubscription>;

function mockUseCtrlStateQueryResponse(res: QRes): Query {
  type Data = NonNullable<Query["data"]["value"]>;
  const data = ref<Data | undefined>(undefined);
  const error = ref<Error | undefined>(undefined);

  const ready = (async () => {
    await Promise.resolve();
    data.value = res.data as Data;
    error.value = res.error;
  })();

  return onReady({ data, error }, ready) as Query;
}

interface MockSubscription {
  sub: Sub;
  issue: Iterable<SRes>;
}

function mockUseCtrlStateSSubscriptionResponse(
  resArray: Iterable<SRes>,
): MockSubscription {
  const data = ref<CtrlStateSSubscription | undefined>(undefined);
  const error = ref<Error | undefined>(undefined);

  function* _issue(resArray: Iterable<SRes>) {
    for (const res of resArray) {
      data.value = res.data as CtrlStateSSubscription;
      error.value = res.error;
      yield res;
    }
  }
  const issue = _issue(resArray);

  const sub = { data, error } as Sub;
  return { sub, issue };
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
        expect(response.data.value?.ctrl.state).toBe(res.data.ctrl.state);
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
          expect(response.data.value?.ctrlState).toEqual(issued.data.ctrlState);
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
        expect(state.value).toBe(queryRes.error ? undefined : queryRes.data.ctrl.state);
        for (const issued of issue) {
          const expectedError = issued.error || queryRes.error;
          const expectedState = expectedError
            ? undefined
            : issued.data.ctrlState || queryRes.data.ctrl.state;
          expect(error.value).toBe(expectedError);
          expect(state.value).toBe(expectedState);
        }
      }),
    );
  });
});
