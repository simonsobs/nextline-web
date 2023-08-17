import * as monaco from "monaco-editor";
import { ThemeInstance } from "vuetify";

export function defineThemes(theme: ThemeInstance) {
  // https://github.com/microsoft/monaco-editor/issues/1762
  // https://github.com/microsoft/monaco-editor/blob/main/src/basic-languages/python/python.ts

  const current = theme.current.value;

  const rules = [{ token: "keyword", foreground: current.colors["tertiary"] }];
  const colors = {
    "editor.foreground": current.colors["on-surface"],
    "editor.background": current.colors["surface-container-lowest"],
    "editorCursor.foreground": current.colors["secondary"],
    "editorLineNumber.foreground": current.colors["outline-variant"],
    "editor.selectionBackground": current.colors["surface-dim"],
    "editor.inactiveSelectionBackground": current.colors["surface-dim"],
  };
  const colorsEditor = {
    ...colors,
    "editor.lineHighlightBackground": current.colors["surface-dim"],
    "editorLineNumber.activeForeground": current.colors["primary"],
  };
  const colorsViewer = {
    ...colors,
    "editorLineNumber.activeForeground": current.colors["surface-dim"],
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
