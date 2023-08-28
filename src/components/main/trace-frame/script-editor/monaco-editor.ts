import { ref, watch, watchEffect, toValue, onMounted } from "vue";
import type { MaybeRefOrGetter } from "vue";
import * as monaco from "monaco-editor";

import { useDarkMode } from "@/utils/color-theme";

export function useMonacoEditor(
  element: MaybeRefOrGetter<HTMLElement | undefined>
) {
  const { isDark } = useDarkMode();

  const editor = ref<monaco.editor.IStandaloneCodeEditor>();

  const model = monaco.editor.createModel("", "python");

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
