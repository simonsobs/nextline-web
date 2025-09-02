import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { ref } from "vue";
import fc from "fast-check";

import { useSubscribeScheduleAutoModeState } from "@/api";
import { onReady } from "@/utils/on-ready";

import { usePulling } from "../use-pulling";

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

type Sub = ReturnType<typeof useSubscribeScheduleAutoModeState>;

function createMockSubscription(auto_mode_state: string): Sub {
  // Initially `undefined`
  const autoModeState = ref(undefined as string | undefined);

  // A value set when ready
  const ready = (async () => {
    await Promise.resolve();
    autoModeState.value = auto_mode_state;
  })();

  // Thenable
  return onReady({ autoModeState }, ready) as Sub;
}

describe("usePulling()", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it("Property test", async () => {
    await fc.assert(
      fc.asyncProperty(fcAutoModeState(), async (auto_mode_state) => {
        const sub = createMockSubscription(auto_mode_state);
        vi.mocked(useSubscribeScheduleAutoModeState).mockReturnValue(sub);
        const { pulling } = await usePulling();
        const expected = auto_mode_state === "auto_pulling";
        expect(pulling.value).toBe(expected);
      }),
    );
  });
});
