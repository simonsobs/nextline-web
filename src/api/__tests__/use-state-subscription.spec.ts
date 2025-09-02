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

type Query = ReturnType<typeof useCtrlStateQuery>;
type Sub = ReturnType<typeof useCtrlStateSSubscription>;

function createMockQuery(
  state_value: string | undefined,
  error_value: Error | undefined,
): Query {
  type Data = NonNullable<Query["data"]["value"]>;
  const data = ref<Data | undefined>(undefined);
  const error = ref<Error | undefined>(undefined);

  const ready = (async () => {
    await Promise.resolve();
    data.value = { ctrl: { state: state_value } } as Data;
    error.value = error_value;
  })();

  return onReady({ data, error }, ready) as Query;
}

function createMockSubscription(
  state_value: string | undefined,
  error_value: Error | undefined,
): Sub {
  const data = ref<CtrlStateSSubscription | undefined>(undefined);
  const error = ref<Error | undefined>(undefined);

  const ready = (async () => {
    await Promise.resolve();
    data.value = { ctrlState: state_value } as CtrlStateSSubscription;
    error.value = error_value;
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
      fc.asyncProperty(
        fcState,
        fcError,
        fcState,
        fcError,
        async (queryState, queryError, subState, subError) => {
          const query = createMockQuery(queryState, queryError);
          const sub = createMockSubscription(subState, subError);
          vi.mocked(useCtrlStateQuery).mockReturnValue(query);
          vi.mocked(useCtrlStateSSubscription).mockReturnValue(sub);
          const { state, error } = await useSubscribeState();
          const expectedError = subError || queryError;
          const expectedState = expectedError
            ? undefined
            : subState || queryState || undefined;

          expect(error.value).toBe(expectedError);
          expect(state.value).toBe(expectedState);
        },
      ),
    );
  });
});
