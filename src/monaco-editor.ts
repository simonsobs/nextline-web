import * as monaco from "monaco-editor";

export function defineThemes(vuetify) {
  // https://github.com/microsoft/monaco-editor/issues/1762
  // https://github.com/microsoft/monaco-editor/blob/main/src/basic-languages/python/python.ts

  const theme = vuetify.theme.current;

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

  monaco.editor.defineTheme("nextline", {
    base: "vs",
    inherit: true,
    rules,
    colors: colorsEditor,
  });

  monaco.editor.defineTheme("nextline-viewer", {
    base: "vs",
    inherit: true,
    rules,
    colors: colorsViewer,
  });
}
