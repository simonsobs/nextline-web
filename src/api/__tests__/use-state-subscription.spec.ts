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

function createMockSubscription(res: Res): Sub {
  const data = ref<CtrlStateSSubscription | undefined>(undefined);
  const error = ref<Error | undefined>(undefined);

  const ready = (async () => {
    await Promise.resolve();
    data.value = { ctrlState: res.state } as CtrlStateSSubscription;
    error.value = res.error;
  })();

  return onReady({ data, error }, ready) as unknown as Sub;
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
      fc.asyncProperty(fcRes, fcRes, async (queryRes, subRes) => {
        const query = createMockQuery(queryRes);
        const sub = createMockSubscription(subRes);
        vi.mocked(useCtrlStateQuery).mockReturnValue(query);
        vi.mocked(useCtrlStateSSubscription).mockReturnValue(sub);
        const { state, error } = await useSubscribeState();
        const expectedError = subRes.error || queryRes.error;
        const expectedState = expectedError
          ? undefined
          : subRes.state || queryRes.state || undefined;

        expect(error.value).toBe(expectedError);
        expect(state.value).toBe(expectedState);
      }),
    );
  });
});
