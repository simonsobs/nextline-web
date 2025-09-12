import { ref, watchEffect } from "vue";
import type { Ref } from "vue";

import { useSubscribeScheduleAutoModeState } from "@/api";
import { onReady } from "@/utils/on-ready";
import type { OnReady } from "@/utils/on-ready";

interface _UseAutoModeReturn {
  autoMode: Ref<boolean | undefined>;
  pulling: Ref<boolean | undefined>;
  loading: Ref<boolean>;
  error: Ref<Error | undefined>;
}

type UseAutoModeReturn = OnReady<_UseAutoModeReturn>;

export function useAutoMode(): UseAutoModeReturn {
  const subscription = useSubscribeScheduleAutoModeState();

  // e.g., state: "off", "auto_pulling", "auto_running"
  const { data: state, loading, error } = subscription;

  const autoMode = ref<boolean | undefined>(undefined);
  const pulling = ref<boolean | undefined>(undefined);

  watchEffect(() => {
    if (error.value || state.value === undefined) {
      autoMode.value = undefined;
      pulling.value = undefined;
    } else {
      const parts = state.value.split("_");
      autoMode.value = parts[0] === "auto";
      pulling.value = parts[1] === "pulling";
    }
  });

  const ret = { autoMode, pulling, loading, error };

  return onReady(ret, subscription);
}
