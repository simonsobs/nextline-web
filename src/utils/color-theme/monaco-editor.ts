import * as monaco from "monaco-editor";
import { useTheme, ThemeDefinition } from "vuetify";

export function useMonacoEditorTheme() {
  const theme = useTheme();
  defineThemes(
    "nextline-light",
    "nextline-viewer-light",
    theme.themes.value.light,
    "vs"
  );
  defineThemes(
    "nextline-dark",
    "nextline-viewer-dark",
    theme.themes.value.dark,
    "vs-dark"
  );
}

function defineThemes(
  name: string,
  nameViewer: string,
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
  };
  const colorsEditor = {
    ...colors,
    "editor.lineHighlightBackground": theme.colors["surface-dim"],
    "editorLineNumber.activeForeground": theme.colors["primary"],
  };
  const colorsViewer = {
    ...colors,
    "editorLineNumber.activeForeground": theme.colors["surface-dim"],
  };

  monaco.editor.defineTheme(name, {
    base,
    inherit: true,
    rules,
    // @ts-ignore
    colors: colorsEditor,
  });

  monaco.editor.defineTheme(nameViewer, {
    base,
    inherit: true,
    rules,
    // @ts-ignore
    colors: colorsViewer,
  });
}