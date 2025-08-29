export type OnReady<T extends object> = T & PromiseLike<T>;

export function onReady<T extends object>(ret: T, ready: Promise<unknown>): OnReady<T> {
  return {
    ...ret,
    async then(onFulfilled, onRejected) {
      await ready;
      return Promise.resolve(ret).then(onFulfilled, onRejected);
    },
  };
}
