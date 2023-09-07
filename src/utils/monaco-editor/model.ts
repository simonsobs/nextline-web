import { ref, watchEffect } from "vue";
import type { MaybeRef } from "vue";
import { useDebounceFn } from "@vueuse/core";
import * as monaco from "monaco-editor";

export function useModel(
  source?: MaybeRef<string>,
  language = "python",
  sourceUpdateDelayMilliseconds = 50,
  sourceUpdateMaxWaitMilliseconds = 100
) {
  const _source = source === undefined ? ref("") : ref(source);
  const model = monaco.editor.createModel(_source.value, language);

  // Update model when source changes.
  watchEffect(() => {
    model.setValue(_source.value);
  });

  // Update source when model changes (debounced).
  const updateSource = useDebounceFn(
    () => {
      _source.value = model.getValue();
    },
    sourceUpdateDelayMilliseconds,
    { maxWait: sourceUpdateMaxWaitMilliseconds }
  );
  model.onDidChangeContent(updateSource);

  return { model, source: _source };
}
