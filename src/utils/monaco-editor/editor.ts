import { shallowRef, unref, onMounted } from "vue";
import type { MaybeRef } from "vue";
import * as monaco from "monaco-editor";

import { useModel } from "@/utils/monaco-editor";

const optionsBase: monaco.editor.IEditorOptions = {
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

const optionsViewer: monaco.editor.IEditorOptions = {
  readOnly: true,
  matchBrackets: "never",
  selectionHighlight: false,
  occurrencesHighlight: false,
  renderLineHighlight: "none",
};

export function useMonacoEditor(
  element: MaybeRef<HTMLElement | undefined>,
  source?: MaybeRef<string>,
  language?: string
) {
  const { model, source: source_ } = useModel(source, language);
  source = source_;

  const editor = shallowRef<monaco.editor.IStandaloneCodeEditor>();

  onMounted(() => {
    const ele = unref(element);
    if (!ele) {
      console.error("element is undefined");
      return;
    }
    editor.value = monaco.editor.create(ele, { model, ...optionsBase });
    editor.value.updateOptions(optionsViewer);
  });

  return { editor, model, source };
}
