import { computed, watchEffect, toValue, ref } from "vue";
import type { MaybeRef } from "vue";
import type * as Monaco from "monaco-editor";

import { useColorTheme, useDarkMode } from "@/utils/color-theme";
import type { DynamicColors } from "@/utils/dynamic-color";
import { onReady } from "@/utils/on-ready";
import type { OnReady } from "@/utils/on-ready";

interface _ReadyOnly {
  ready: Promise<void>;
}

type ReadyOnly = OnReady<_ReadyOnly>;

export function useColorThemeOnMonacoEditor(): ReadyOnly {
  const colorTheme = useColorTheme();
  async function _impl() {
    await useDynamicColorsOnMonacoEditor(colorTheme.light, false);
    await useDynamicColorsOnMonacoEditor(colorTheme.dark, true);
    await useDarkModeOnMonacoEditor();
  }
  const ready = _impl();
  const ret = { ready };

  return onReady(ret, ready);
}

export function useDynamicColorsOnMonacoEditor(
  dynamicColors: MaybeRef<DynamicColors>,
  isDark: MaybeRef<boolean>,
): ReadyOnly {
  const name = computed(() => (toValue(isDark) ? "nextline-dark" : "nextline-light"));
  const base = computed(() => (toValue(isDark) ? "vs-dark" : "vs"));
  const monaco = ref<typeof Monaco>();
  watchEffect(async () => {
    if (!monaco.value) return;
    await defineTheme(name.value, toValue(dynamicColors), base.value);
  });
  async function loadMonaco() {
    monaco.value = await import("monaco-editor");
  }

  const ready = loadMonaco();

  const ret = { ready };

  return onReady(ret, ready);
}

function defineTheme(
  name: string,
  dynamicColors: DynamicColors,
  base: Monaco.editor.BuiltinTheme,
): ReadyOnly {
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

  async function loadMonaco() {
    const monaco = await import("monaco-editor");
    monaco.editor.defineTheme(name, {
      base,
      inherit: true,
      rules,
      colors,
    });
  }

  const ready = loadMonaco();

  const ret = { ready };

  return onReady(ret, ready);
}

export function useDarkModeOnMonacoEditor(): ReadyOnly {
  // Note: All instances of Monaco Editor share the same theme.
  //       It is not possible to have different themes for different instances.
  //       https://github.com/Microsoft/monaco-editor/issues/338
  const { isDark } = useDarkMode();
  const themeName = computed(() => (isDark.value ? "nextline-dark" : "nextline-light"));
  const monaco = ref<typeof Monaco>();
  watchEffect(() => {
    monaco.value?.editor.setTheme(themeName.value);
  });
  async function loadMonaco() {
    monaco.value = await import("monaco-editor");
  }

  const ready = loadMonaco();

  const ret = { ready };

  return onReady(ret, ready);
}
