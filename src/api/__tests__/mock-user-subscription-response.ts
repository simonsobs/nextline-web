import { ref } from "vue";
import type { Ref } from "vue";

interface MockUserSubscriptionResponseArgElement<T> {
  data: T | undefined;
  error: Error | undefined;
}

type MockUserSubscriptionResponseArg<T> = Iterable<
  MockUserSubscriptionResponseArgElement<T>
>;

interface MockUserSubscriptionResponse<T> {
  sub: {
    data: Ref<T | undefined>;
    error: Ref<Error | undefined>;
  };
  issue: MockUserSubscriptionResponseArg<T>;
}

export function mockUserSubscriptionResponse<T>(
  resArray: MockUserSubscriptionResponseArg<T>,
): MockUserSubscriptionResponse<T> {
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

  return { sub, issue } as MockUserSubscriptionResponse<T>;
}
