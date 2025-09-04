import { ref } from "vue";
import type { Ref } from "vue";

import { onReady } from "@/utils/on-ready";
import type { OnReady } from "@/utils/on-ready";

type MockUseQueryResponse<T> = OnReady<{
  data: Ref<T | undefined>;
  error: Ref<Error | undefined>;
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

  const ready = (async () => {
    await Promise.resolve();
    data.value = arg.data;
    error.value = arg.error;
  })();

  return onReady({ data, error }, ready) as MockUseQueryResponse<T>;
}
