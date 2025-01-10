import { computed } from "vue";
import type { Ref, ComputedRef } from "vue";
import { refThrottled } from "@vueuse/core";
import { useScheduleSchedulerPreviewQuery } from "@/graphql/codegen/generated";
import { useRefresh } from "@/graphql/urql";

interface _UsePreviewResponse {
  script: ComputedRef<string | undefined>;
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
    300
  );

  const error = computed(() => query.error?.value);

  const script = computed(() => query.data.value?.schedule.scheduler.preview.script);

  const ret = { script, loading, error, load };

  return {
    ...ret,
    async then(onFulfilled, onRejected) {
      await query;
      return Promise.resolve(ret).then(onFulfilled, onRejected);
    },
  };
}
