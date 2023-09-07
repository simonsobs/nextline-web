import { ref, watchEffect } from "vue";
import type { MaybeRef } from "vue";
import { useDebounceFn } from "@vueuse/core";
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

  // Update model when source changes.
  watchEffect(() => {
    model.setValue(source.value);
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

  return { model, source };
}
