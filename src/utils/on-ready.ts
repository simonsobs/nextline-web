export type OnReady<T extends object> = T & PromiseLike<T>;

type Ready = PromiseLike<unknown>; // Any awaitable

/**
 * Makes a sync function awaitable by adding a `then` method to its return value.
 *
 * This function makes Vue composables optionally awaitable.
 *
 * Note: This function is inspired by VueUse, e.g.,
 * https://github.com/vueuse/vueuse/blob/v13.8.0/packages/core/useFetch/index.ts#L639-L645
 *
 * The same pattern is used in URQL as well:
 * https://github.com/urql-graphql/urql/blob/%40urql/vue%401.1.2/packages/vue-urql/src/useQuery.ts#L391-L415
 *
 * Links:
 * These links describe the `then` method and thenables:
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise#thenables
 * https://promisesaplus.com/#the-then-method
 *
 * @param ret - The return value without `then`
 * @param ready - Any awaitable that resolves when the `ret` is ready.
 * @returns The `ret` with a `then` method.
 *
 */
export function onReady<T extends object>(ret: T, ready: Ready): OnReady<T> {
  return {
    ...ret,
    async then(onFulfilled, onRejected) {
      await ready;
      return Promise.resolve(ret).then(onFulfilled, onRejected);
    },
  };
}

// In-source tests
if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest;

  // An example Vue composable that is made awaitable with `onReady`
  function useFoo() {
    const foo = { value: "bar" };

    async function update() {
      await Promise.resolve();
      foo.value = "baz";
    }
    const ready = update();

    const ret = { foo };
    return onReady(ret, ready);
  }

  it("Should the composable be awaitable", async () => {
    const { foo: bar } = await useFoo();
    expect(bar.value).toEqual("baz");
  });

  it("Should the return value be updated later", async () => {
    const ret = useFoo();
    expect(ret.foo.value).toEqual("bar");

    await ret; // Note: thenable. No need to call `then()`
    expect(ret.foo.value).toEqual("baz");
  });

  it("Should `then()` be awaitable", async () => {
    const { foo, then } = useFoo();
    expect(foo.value).toEqual("bar");

    await then(); // Note: `then` needs to be called.
    expect(foo.value).toEqual("baz");
  });
}
