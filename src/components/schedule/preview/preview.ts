import { computed, watchEffect } from "vue";
import type { Ref, ComputedRef } from "vue";
import { refThrottled, useSessionStorage } from "@vueuse/core";

import { useScheduleSchedulerPreviewQuery } from "@/graphql/codegen/generated";
import { useRefresh } from "@/graphql/urql";

interface _UsePreviewResponse {
  script: Ref<string | undefined>;
  loading: Ref<boolean>;
  error: ComputedRef<Error | undefined>;
  load: () => Promise<void>;
}

type UsePreviewResponse = _UsePreviewResponse & PromiseLike<_UsePreviewResponse>;

export function usePreview(): UsePreviewResponse {
  const query = useScheduleSchedulerPreviewQuery({
    requestPolicy: "network-only",
    variables: {},
    pause: true,
  });

  const { refresh: load, refreshing } = useRefresh(query);

  const loading = refThrottled(
    computed(() => query.fetching.value || refreshing.value),
    300,
  );

  const error = computed(() => query.error?.value);

  const keyPrefix = import.meta.env.VITE_PUBLIC_PATH;
  const key = `${keyPrefix}/preview-script`;
  const script = useSessionStorage(key, "");
  const scriptLoaded = computed(
    () => query.data.value?.schedule.scheduler.preview.script,
  );
  watchEffect(() => {
    if (!scriptLoaded.value) return;
    script.value = scriptLoaded.value;
  });

  const ret = { script, loading, error, load };

  return {
    ...ret,
    async then(onFulfilled, onRejected) {
      await query;
      return Promise.resolve(ret).then(onFulfilled, onRejected);
    },
  };
}
