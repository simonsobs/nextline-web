import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { ref } from "vue";
import fc from "fast-check";

import { useSubscribeScheduleAutoModeState } from "@/api";
import { fcError, fcUndefinedOr } from "@/graphql/tests/arbitraries";
import { onReady } from "@/utils/on-ready";

import { useAutoMode } from "../use-auto-mode";

vi.mock("@/api", () => ({
  useSubscribeScheduleAutoModeState: vi.fn(),
}));

const AUTO_MODE_STATES = [
  "created",
  "off",
  "auto_waiting",
  "auto_pulling",
  "auto_running",
];

const fcAutoModeState = () => fc.constantFrom(...AUTO_MODE_STATES);

const fcOptions = () =>
  fc.record({
    autoModeState: fcUndefinedOr(fcAutoModeState()),
    error: fcUndefinedOr(fcError),
  });

type Sub = ReturnType<typeof useSubscribeScheduleAutoModeState>;

function createMockSubscription(options: {
  autoModeState: string | undefined;
  error: Error | undefined;
}): Sub {
  const data = ref<string | undefined>(undefined);
  const loading = ref(true);
  const error = ref<Error | undefined>(undefined);

  const ready = (async () => {
    await Promise.resolve();
    data.value = options.autoModeState;
    loading.value = false;
    error.value = options.error;
  })();

  const ret = { data, loading, error };

  return onReady(ret, ready) as Sub;
}

describe("useAutoMode()", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it("Property test", async () => {
    await fc.assert(
      fc.asyncProperty(fcOptions(), async (options) => {
        const sub = createMockSubscription(options);
        vi.mocked(useSubscribeScheduleAutoModeState).mockReturnValue(sub);

        const { autoMode, pulling, loading, error, then } = useAutoMode();

        expect(loading.value).toBe(true);
        expect(error.value).toBeUndefined();
        expect(autoMode.value).toBeUndefined();
        expect(pulling.value).toBeUndefined();

        await then();

        expect(loading.value).toBe(false);
        expect(error.value).toBe(options.error);
        const expectedAutoMode = error.value
          ? undefined
          : options.autoModeState
            ? ["auto_waiting", "auto_pulling", "auto_running"].includes(
                options.autoModeState,
              )
            : undefined;
        const expectedPulling = error.value
          ? undefined
          : options.autoModeState
            ? options.autoModeState === "auto_pulling"
            : undefined;
        expect(autoMode.value).toBe(expectedAutoMode);
        expect(pulling.value).toBe(expectedPulling);
      }),
    );
  });
});
