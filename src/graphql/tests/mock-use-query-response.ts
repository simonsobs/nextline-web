import { ref } from "vue";
import type { Ref } from "vue";

import { onReady } from "@/utils/on-ready";
import type { OnReady } from "@/utils/on-ready";

type MockUseQueryResponse<T> = OnReady<{
  data: Ref<T | undefined>;
  error: Ref<Error | undefined>;
  fetching: Ref<boolean>;
}>;

interface MockUseQueryResponseArg<T> {
  data: T | undefined;
  error: Error | undefined;
}

export function mockUseQueryResponse<T>(
  arg: MockUseQueryResponseArg<T>,
): MockUseQueryResponse<T> {
  const data = ref<T | undefined>(undefined);
  const error = ref<Error | undefined>(undefined);
  const fetching = ref<boolean>(true);

  const ready = (async () => {
    await Promise.resolve();
    data.value = arg.data;
    error.value = arg.error;
    fetching.value = false;
  })();

  return onReady({ data, error, fetching }, ready) as MockUseQueryResponse<T>;
}
