import { computed, watchEffect, toValue, ref } from "vue";
import type { MaybeRef } from "vue";

import type * as Monaco from "monaco-editor";

import type { DynamicColors } from "@/utils/dynamic-color";
import { useColorTheme, useDarkMode } from "@/utils/color-theme";

export function useColorThemeOnMonacoEditor() {
  const colorTheme = useColorTheme();
  useDynamicColorsOnMonacoEditor(colorTheme.light, false);
  useDynamicColorsOnMonacoEditor(colorTheme.dark, true);
  useDarkModeOnMonacoEditor();
}

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

interface _DefineThemeReturn {
  ready: Promise<void>;
}

type DefineThemeReturn = _DefineThemeReturn & PromiseLike<_DefineThemeReturn>;

function defineTheme(
  name: string,
  dynamicColors: DynamicColors,
  base: Monaco.editor.BuiltinTheme
): DefineThemeReturn {
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

  return {
    ...ret,
    async then(onFulfilled, onRejected) {
      await ready;
      return Promise.resolve(ret).then(onFulfilled, onRejected);
    },
  };
}

interface _UseDarkModeOnMonacoEditorReturn {
  ready: Promise<void>;
}

type UseDarkModeOnMonacoEditorReturn = _UseDarkModeOnMonacoEditorReturn &
  PromiseLike<_UseDarkModeOnMonacoEditorReturn>;

export function useDarkModeOnMonacoEditor(): UseDarkModeOnMonacoEditorReturn {
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

  return {
    ...ret,
    async then(onFulfilled, onRejected) {
      await ready;
      return Promise.resolve(ret).then(onFulfilled, onRejected);
    },
  };
}
