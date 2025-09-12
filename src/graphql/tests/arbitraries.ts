import { expect, it } from "vitest";
import fc from "fast-check";

export const fcUndefinedOr = <T>(arb: fc.Arbitrary<T>) =>
  fc.oneof(fc.constant(undefined), arb);

export const fcError = fc.string().map((msg) => new Error(msg));

export const fcMockUseQueryResponseArg = <T>(arbData: fc.Arbitrary<T>) =>
  fc.record({
    data: fcUndefinedOr(arbData),
    error: fcUndefinedOr(fcError),
  });

export const fcMockUseSubscriptionResponseArg = <T>(arbData: fc.Arbitrary<T>) =>
  fc.array(fcMockUseQueryResponseArg(arbData));

if (import.meta.vitest) {
  it("fcUndefinedOr()", () => {
    fc.assert(
      fc.property(fcUndefinedOr(fc.integer()), (v) => {
        expect(v === undefined || typeof v === "number").toBe(true);
      }),
    );
  });

  it("fcMockUseQueryResponse()", () => {
    const fcData = fc.record({ a: fc.integer() });
    const fcArg = fcMockUseQueryResponseArg(fcData);
    fc.assert(
      fc.property(fcArg, (v) => {
        expect(v.data === undefined || typeof v.data.a === "number").toBe(true);
        expect(v.error === undefined || v.error instanceof Error).toBe(true);
      }),
    );
  });

  it("fcMockUseSubscriptionResponse()", () => {
    const fcData = fc.record({ a: fc.integer() });
    const fcArg = fcMockUseSubscriptionResponseArg(fcData);
    fc.assert(
      fc.property(fcArg, (v) => {
        expect(
          v.every(
            (e) =>
              (e.data === undefined || typeof e.data.a === "number") &&
              (e.error === undefined || e.error instanceof Error),
          ),
        ).toBe(true);
      }),
    );
  });
}
