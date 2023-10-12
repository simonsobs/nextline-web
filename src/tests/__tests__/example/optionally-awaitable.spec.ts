import { describe, it, expect } from "vitest";

// https://github.com/urql-graphql/urql/blob/%40urql/vue%401.1.2/packages/vue-urql/src/useQuery.ts

type OptionallyAwaitable = { value: number } & PromiseLike<{ value: number }>;

function optionallyAwaitableFunction(): OptionallyAwaitable {
  return {
    value: 42,
    async then(onFulfilled, onRejected) {
      // Note: then() doesn't have to be async. However, if await needs to be used
      // inside optionallyAwaitableFunction(), then() must be async and then() is the
      // only place where await can be used as optionallyAwaitableFunction() is not
      // async.
      await new Promise((resolve) => setTimeout(resolve, 100));
      return Promise.resolve({ value: this.value }).then(onFulfilled, onRejected);
    },
  };
}

describe("optionallyAwaitableFunction", () => {
  it("without await", () => {
    const result = optionallyAwaitableFunction();
    expect(result.value).toBe(42);
  });

  it("with await", async () => {
    const result = await optionallyAwaitableFunction();
    expect(result.value).toBe(42);
  });
});
