import { ref, watch, toValue, onMounted } from "vue";
import type { Ref, MaybeRefOrGetter } from "vue";
import { watchDebounced } from "@vueuse/core";

import * as monaco from "monaco-editor";

export function useMonacoEditor(
  element: MaybeRefOrGetter<HTMLElement | undefined>,
  source: Ref<string>
) {
  const model = monaco.editor.createModel(toValue(source), "python");
  useUpdateSource(model, source);

  const editor = ref<monaco.editor.IStandaloneCodeEditor>();

  onMounted(() => {
    const ele = toValue(element);
    if (!ele) return;
    editor.value = monaco.editor.create(ele, {
      model,
      minimap: { enabled: false },
      scrollbar: { vertical: "auto", horizontal: "auto" },
      fontFamily: "Fira Code",
      fontSize: 14,
      fontWeight: "500",
      fontLigatures: true,
      lineHeight: 24,
      automaticLayout: true,
      scrollBeyondLastLine: false,
      glyphMargin: true,
      quickSuggestions: false,
      readOnly: false,
      matchBrackets: "always",
      selectionHighlight: true,
      occurrencesHighlight: true,
      renderLineHighlight: "line",
    });
  });

  return { editor, model };
}

function useUpdateSource(model: monaco.editor.ITextModel, source: Ref<string>) {
  const count = ref(0);

  model.onDidChangeContent((e) => {
    count.value += 1;
  });

  watchDebounced(
    count,
    () => {
      source.value = model.getValue();
    },
    { debounce: 50, maxWait: 100 }
  );

  watch(source, (val) => {
    if (val === model.getValue()) return;
    model.setValue(val);
  });
}
