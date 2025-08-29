export type OnReady<T> = T & PromiseLike<T>;

export function onReady<T>(ret: T, ready: Promise<unknown>): OnReady<T> {
  return {
    ...ret,
    async then(onFulfilled, onRejected) {
      await ready;
      return Promise.resolve(ret).then(onFulfilled, onRejected);
    },
  };
}
