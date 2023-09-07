import { shallowRef, unref, onMounted, ref } from "vue";
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

const editorOptionsEditor: monaco.editor.IEditorOptions = {
  readOnly: false,
  matchBrackets: "always",
  selectionHighlight: true,
  occurrencesHighlight: true,
  renderLineHighlight: "line",
};

const editorOptionsViewer: monaco.editor.IEditorOptions = {
  readOnly: true,
  matchBrackets: "never",
  selectionHighlight: false,
  occurrencesHighlight: false,
  renderLineHighlight: "none",
};

type Mode = "editor" | "viewer";
const defaultMode: Mode = "viewer";

const modelOptionsMap: Record<Mode, monaco.editor.IEditorOptions> = {
  editor: editorOptionsEditor,
  viewer: editorOptionsViewer,
};

export interface UseMonacoEditorOptions extends UseModelOptions {
  element: MaybeRef<HTMLElement | undefined>;
  mode?: MaybeRef<Mode>;
}

export function useMonacoEditor(options: UseMonacoEditorOptions) {
  const { element, mode: mode_, ...modelOptions } = options;

  const mode = ref(mode_ ?? defaultMode);

  const { model, source } = useModel(modelOptions);

  const editor = shallowRef<monaco.editor.IStandaloneCodeEditor>();

  onMounted(() => {
    const ele = unref(element);
    if (!ele) {
      console.error("element is undefined");
      return;
    }
    editor.value = monaco.editor.create(ele, { model, ...editorOptionsBase });
    editor.value.updateOptions(modelOptionsMap[mode.value]);
  });

  return { editor, model, source };
}
