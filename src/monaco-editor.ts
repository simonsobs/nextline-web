import * as monaco from "monaco-editor";
import vuetifyColors from "vuetify/lib/util/colors.mjs";

export function defineThemes(vuetify) {
  // https://github.com/microsoft/monaco-editor/issues/1762
  // https://github.com/microsoft/monaco-editor/blob/main/src/basic-languages/python/python.ts

  const theme = vuetify.theme.current;

  const rules = [
    { token: "keyword", foreground: theme.colors["accent-darken-1"] },
  ];
  const colors = {
    "editor.foreground": vuetifyColors.grey.darken2,
    "editor.background": theme.colors["background-lighten-4"],
    "editorCursor.foreground": theme.colors.accent,
    "editorLineNumber.foreground": "#9E9E9E",
    "editor.selectionBackground": "#88000030",
    "editor.inactiveSelectionBackground": "#88000015",
  };
  const colorsEditor = {
    ...colors,
    "editor.lineHighlightBackground": "#8F8F8F20",
    "editorLineNumber.activeForeground": theme.colors.primary,
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
