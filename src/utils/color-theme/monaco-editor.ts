import { computed, watchEffect, toValue } from "vue";
import type { MaybeRef, UnwrapRef } from "vue";
import * as monaco from "monaco-editor";

import { useDynamicColors } from "@/utils/dynamic-color";
import { useDarkMode } from "./dark-mode";

type DynamicColors = UnwrapRef<ReturnType<typeof useDynamicColors>["colors"]>;

export function useDynamicColorsOnMonacoEditor(
  dynamicColors: MaybeRef<DynamicColors>,
  isDark: MaybeRef<boolean>
) {
  const name = computed(() => (toValue(isDark) ? "nextline-dark" : "nextline-light"));
  const base = computed(() => (toValue(isDark) ? "vs-dark" : "vs"));
  watchEffect(() => {
    defineTheme(name.value, toValue(dynamicColors), base.value);
  });
}

function defineTheme(
  name: string,
  dynamicColors: DynamicColors,
  base: monaco.editor.BuiltinTheme
) {
  // https://github.com/microsoft/monaco-editor/issues/1762
  // https://github.com/microsoft/monaco-editor/blob/main/src/basic-languages/python/python.ts

  const rules = [{ token: "keyword", foreground: dynamicColors.tertiary }];
  const colors = {
    "editor.foreground": dynamicColors["on-surface"],
    "editor.background": dynamicColors["surface-container-lowest"],
    "editorCursor.foreground": dynamicColors["secondary"],
    "editorLineNumber.foreground": dynamicColors["outline-variant"],
    "editor.selectionBackground": dynamicColors["surface-dim"],
    "editor.inactiveSelectionBackground": dynamicColors["surface-dim"],
    "editor.lineHighlightBackground": dynamicColors["surface-container-low"],
    "editorLineNumber.activeForeground": dynamicColors["primary"],
  };

  monaco.editor.defineTheme(name, {
    base,
    inherit: true,
    rules,
    colors,
  });
}

export function useDarkModeOnMonacoEditor() {
  // Note: All instances of Monaco Editor share the same theme.
  //       It is not possible to have different themes for different instances.
  //       https://github.com/Microsoft/monaco-editor/issues/338
  const { isDark } = useDarkMode();
  const themeName = computed(() => (isDark.value ? "nextline-dark" : "nextline-light"));
  watchEffect(() => {
    monaco.editor.setTheme(themeName.value);
  });
}
