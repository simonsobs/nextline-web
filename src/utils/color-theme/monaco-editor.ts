import { watchEffect, toValue } from "vue";
import { useTheme, ThemeDefinition } from "vuetify";
import * as monaco from "monaco-editor";

export function useMonacoEditorTheme() {
  const { themes } = useTheme();

  watchEffect(() => {
    defineThemes("nextline-light", toValue(themes).light, "vs");
  });

  watchEffect(() => {
    defineThemes("nextline-dark", toValue(themes).dark, "vs-dark");
  });
}

function defineThemes(
  name: string,
  theme: ThemeDefinition,
  base: monaco.editor.BuiltinTheme
) {
  // https://github.com/microsoft/monaco-editor/issues/1762
  // https://github.com/microsoft/monaco-editor/blob/main/src/basic-languages/python/python.ts

  if (!theme.colors) return;

  const rules = [{ token: "keyword", foreground: theme.colors["tertiary"] }];
  const colors = {
    "editor.foreground": theme.colors["on-surface"],
    "editor.background": theme.colors["surface-container-lowest"],
    "editorCursor.foreground": theme.colors["secondary"],
    "editorLineNumber.foreground": theme.colors["outline-variant"],
    "editor.selectionBackground": theme.colors["surface-dim"],
    "editor.inactiveSelectionBackground": theme.colors["surface-dim"],
    "editor.lineHighlightBackground": theme.colors["surface-container-low"],
    "editorLineNumber.activeForeground": theme.colors["primary"],
  };

  monaco.editor.defineTheme(name, {
    base,
    inherit: true,
    rules,
    // @ts-ignore
    colors,
  });
}
