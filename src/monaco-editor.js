import * as monaco from "monaco-editor";

export function defineThemes() {
  // https://github.com/microsoft/monaco-editor/issues/1762
  // https://github.com/microsoft/monaco-editor/blob/main/src/basic-languages/python/python.ts

  const rules = [{ token: "keyword", foreground: "#0077aa" }];
  const colors = {
    "editor.foreground": "#000000CC",
    "editor.background": "#FAFAFA",
    "editorCursor.foreground": "#8B0000",
    "editorLineNumber.foreground": "#9E9E9E",
    "editor.selectionBackground": "#88000030",
    "editor.inactiveSelectionBackground": "#88000015",
  };
  const colorsEditor = {
    ...colors,
    "editor.lineHighlightBackground": "#8F8F8F20",
    "editorLineNumber.activeForeground": "#00796b",
  };
  const colorsViewer = {
    ...colors,
    "editorLineNumber.activeForeground": "#9E9E9E",
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
