import { expect, it } from "vitest";
import fc from "fast-check";

export const fcScheduleQueueItem = fc.record({
  createdAt: fc.date({ noInvalidDate: true }).map((d) => d.toISOString()),
  id: fc.integer(),
  name: fc.string(),
  script: fc.string(),
});

if (import.meta.vitest) {
  it("fcScheduleQueueItem()", () => {
    fc.assert(
      fc.property(fcScheduleQueueItem, (v) => {
        expect(v.createdAt).toBeDefined();
        expect(v.id).toBeDefined();
        expect(v.name).toBeDefined();
        expect(v.script).toBeDefined();
      }),
    );
  });
}
