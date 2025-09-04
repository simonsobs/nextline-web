import { ref } from "vue";
import type { Ref } from "vue";

interface MockUseSubscriptionResponseArgElement<T> {
  data: T | undefined;
  error: Error | undefined;
}

type MockUseSubscriptionResponseArg<T> = Iterable<
  MockUseSubscriptionResponseArgElement<T>
>;

interface MockUseSubscriptionResponse<T> {
  sub: {
    data: Ref<T | undefined>;
    error: Ref<Error | undefined>;
  };
  issue: MockUseSubscriptionResponseArg<T>;
}

export function mockUseSubscriptionResponse<T>(
  resArray: MockUseSubscriptionResponseArg<T>,
): MockUseSubscriptionResponse<T> {
  const data = ref<T | undefined>(undefined);
  const error = ref<Error | undefined>(undefined);

  function* _issue() {
    for (const res of resArray) {
      data.value = res.data;
      error.value = res.error;
      yield res;
    }
  }
  const issue = _issue();
  const sub = { data, error };

  return { sub, issue } as MockUseSubscriptionResponse<T>;
}
