import { ref, watch, watchEffect, toValue, onMounted } from "vue";
import type { Ref, MaybeRefOrGetter } from "vue";
import { watchDebounced } from "@vueuse/core";

import * as monaco from "monaco-editor";

import { useDarkMode } from "@/utils/color-theme";

export function useMonacoEditor(
  element: MaybeRefOrGetter<HTMLElement | undefined>,
  source: Ref<string>
) {
  const { isDark } = useDarkMode();

  const editor = ref<monaco.editor.IStandaloneCodeEditor>();

  const model = monaco.editor.createModel(toValue(source), "python");

  const nChangeContents = ref(0);

  model.onDidChangeContent((e) => {
    nChangeContents.value += 1;
  });

  watchDebounced(
    nChangeContents,
    () => {
      source.value = model.getValue();
    },
    { debounce: 50, maxWait: 100 }
  );

  watch(source, (val) => {
    if (val === model.getValue()) return;
    model.setValue(val);
  });

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
      readOnly: false,
      matchBrackets: "always",
      selectionHighlight: true,
      occurrencesHighlight: true,
      renderLineHighlight: "line",
      theme: isDark.value ? "nextline-dark" : "nextline-light",
    });
  });

  watchEffect(() => {
    monaco.editor.setTheme(
      toValue(isDark) ? "nextline-dark" : "nextline-light"
    );
  });

  return { editor, model };
}
