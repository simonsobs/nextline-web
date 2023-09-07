import { ref, watchEffect } from "vue";
import type { MaybeRef } from "vue";
import { useDebounceFn, createEventHook } from "@vueuse/core";
import * as monaco from "monaco-editor";

export interface UseModelOptions {
  source?: MaybeRef<string>;
  language?: string;
  sourceUpdateDelayMilliseconds?: number;
  sourceUpdateMaxWaitMilliseconds?: number;
}

const _default: Required<UseModelOptions> = {
  source: "",
  language: "python",
  sourceUpdateDelayMilliseconds: 50,
  sourceUpdateMaxWaitMilliseconds: 100,
};

export function useModel(options?: UseModelOptions) {
  const {
    source: source_,
    language,
    sourceUpdateDelayMilliseconds,
    sourceUpdateMaxWaitMilliseconds,
  } = { ..._default, ...options };

  const source = ref(source_);
  const model = monaco.editor.createModel(source.value, language);
  const beforeSetValue = createEventHook<null>();
  const afterSetValue = createEventHook<null>();

  // Update model when source changes.
  watchEffect(() => {
    if (source.value === model.getValue()) return;
    beforeSetValue.trigger(null);
    model.setValue(source.value);
    afterSetValue.trigger(null);
  });

  // Update source when model changes (debounced).
  const updateSource = useDebounceFn(
    () => {
      source.value = model.getValue();
    },
    sourceUpdateDelayMilliseconds,
    { maxWait: sourceUpdateMaxWaitMilliseconds }
  );
  model.onDidChangeContent(updateSource);

  return {
    model,
    source,
    beforeSetValue: beforeSetValue.on,
    afterSetValue: afterSetValue.on,
  };
}
