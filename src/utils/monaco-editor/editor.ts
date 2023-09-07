import { shallowRef, unref, onMounted } from "vue";
import type { MaybeRef } from "vue";
import * as monaco from "monaco-editor";

import { useModel } from "./model";
import type { UseModelOptions } from "./model";

const editorOptionsBase: monaco.editor.IEditorOptions = {
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
  quickSuggestions: false,
};

const editorOptionsViewer: monaco.editor.IEditorOptions = {
  readOnly: true,
  matchBrackets: "never",
  selectionHighlight: false,
  occurrencesHighlight: false,
  renderLineHighlight: "none",
};

export interface UseMonacoEditorOptions extends UseModelOptions {
  element: MaybeRef<HTMLElement | undefined>;
}

export function useMonacoEditor(options: UseMonacoEditorOptions) {
  const { element, ...modelOptions } = options;
  const { model, source } = useModel(modelOptions);

  const editor = shallowRef<monaco.editor.IStandaloneCodeEditor>();

  onMounted(() => {
    const ele = unref(element);
    if (!ele) {
      console.error("element is undefined");
      return;
    }
    editor.value = monaco.editor.create(ele, { model, ...editorOptionsBase });
    editor.value.updateOptions(editorOptionsViewer);
  });

  return { editor, model, source };
}
