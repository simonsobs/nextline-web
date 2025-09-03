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

interface Res {
  state: string | undefined;
  error: Error | undefined;
}

const fcRes: fc.Arbitrary<Res> = fc.record({
  state: fcState,
  error: fcError,
});

type Query = ReturnType<typeof useCtrlStateQuery>;
type Sub = ReturnType<typeof useCtrlStateSSubscription>;

function createMockQuery(res: Res): Query {
  type Data = NonNullable<Query["data"]["value"]>;
  const data = ref<Data | undefined>(undefined);
  const error = ref<Error | undefined>(undefined);

  const ready = (async () => {
    await Promise.resolve();
    data.value = { ctrl: { state: res.state } } as Data;
    error.value = res.error;
  })();

  return onReady({ data, error }, ready) as Query;
}

interface MockSubscription {
  sub: Sub;
  issue: AsyncGenerator<Res>;
}

function createMockSubscription(resArray: Res[]): MockSubscription {
  const data = ref<CtrlStateSSubscription | undefined>(undefined);
  const error = ref<Error | undefined>(undefined);

  async function* _issue(resArray: Res[]) {
    for (const res of resArray) {
      data.value = { ctrlState: res.state } as CtrlStateSSubscription;
      error.value = res.error;
      yield res;
    }
  }
  const issue = _issue(resArray);

  const sub = { data, error } as Sub;
  return { sub, issue };
}

describe("createMockSubscription()", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it("Property test", async () => {
    await fc.assert(
      fc.asyncProperty(fc.array(fcRes), async (resArray) => {
        const { sub, issue } = createMockSubscription(resArray);
        vi.mocked(useCtrlStateSSubscription).mockReturnValue(sub);
        const response = useCtrlStateSSubscription({ variables: {} });
        for await (const issued of issue) {
          expect(response.error.value).toBe(issued.error);
          expect(response.data.value?.ctrlState).toEqual(issued.state);
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
      fc.asyncProperty(fcRes, fc.array(fcRes), async (queryRes, subResArray) => {
        const query = createMockQuery(queryRes);
        const { sub, issue } = createMockSubscription(subResArray);
        vi.mocked(useCtrlStateQuery).mockReturnValue(query);
        vi.mocked(useCtrlStateSSubscription).mockReturnValue(sub);
        const { state, error } = await useSubscribeState();
        expect(error.value).toBe(queryRes.error);
        expect(state.value).toBe(queryRes.error ? undefined : queryRes.state);
        for await (const issued of issue) {
          const expectedError = issued.error || queryRes.error;
          const expectedState = expectedError
            ? undefined
            : issued.state || queryRes.state;
          expect(error.value).toBe(expectedError);
          expect(state.value).toBe(expectedState);
        }
      }),
    );
  });
});
