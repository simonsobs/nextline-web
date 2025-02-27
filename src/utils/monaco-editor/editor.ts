import { shallowRef, unref, onMounted, ref, watchEffect } from "vue";
import type { Ref, MaybeRef, ShallowRef } from "vue";

import type * as Monaco from "monaco-editor";

import { useModel } from "./model";
import type { UseModelOptions } from "./model";

const editorOptionsBase: Monaco.editor.IEditorOptions = {
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

const editorOptionsEditor: Monaco.editor.IEditorOptions = {
  readOnly: false,
  matchBrackets: "always",
  selectionHighlight: true,
  occurrencesHighlight: "singleFile",
  renderLineHighlight: "line",
};

const editorOptionsViewer: Monaco.editor.IEditorOptions = {
  readOnly: true,
  matchBrackets: "never",
  selectionHighlight: false,
  occurrencesHighlight: "off",
  renderLineHighlight: "none",
};

type Mode = "editor" | "viewer";
const defaultMode: Mode = "viewer";

const modelOptionsMap: Record<Mode, Monaco.editor.IEditorOptions> = {
  editor: editorOptionsEditor,
  viewer: editorOptionsViewer,
};

export interface UseMonacoEditorOptions extends UseModelOptions {
  element: MaybeRef<HTMLElement | undefined>;
  mode?: MaybeRef<Mode>;
}

interface _UseMonacoEditorReturn {
  editor: ShallowRef<Monaco.editor.IStandaloneCodeEditor | undefined>;
  model: ShallowRef<Monaco.editor.ITextModel | undefined>;
  source: Ref<string>;
  mode: Ref<Mode>;
  ready: Promise<void>;
}

type UseMonacoEditorReturn = _UseMonacoEditorReturn &
  PromiseLike<_UseMonacoEditorReturn>;

export function useMonacoEditor(
  options: UseMonacoEditorOptions
): UseMonacoEditorReturn {
  const { element, mode: mode_, ...modelOptions } = options;

  const monaco = ref<typeof Monaco>();

  const mode = ref(mode_ ?? defaultMode);

  const { model, source, beforeSetValue, afterSetValue } = useModel(modelOptions);

  const editor = shallowRef<Monaco.editor.IStandaloneCodeEditor>();

  const isMounted = ref(false);
  onMounted(() => {
    isMounted.value = true;
  });

  watchEffect(() => {
    if (!isMounted.value) return;
    const ele = unref(element);
    if (!ele) {
      console.error("element is undefined");
      return;
    }
    const model_ = unref(model);
    if (!model_) return;
    editor.value = monaco.value?.editor.create(ele, {
      model: model_,
      ...editorOptionsBase,
    });
  });

  watchEffect(() => {
    editor.value?.updateOptions(modelOptionsMap[mode.value]);
  });

  let lastPosition: Monaco.Position | null = null;

  beforeSetValue(() => {
    // save cursor position
    if (!editor.value) return;
    lastPosition = editor.value.getPosition();
  });

  afterSetValue(() => {
    // restore cursor position
    if (!editor.value) return;
    if (!lastPosition) return;
    editor.value.setPosition(lastPosition);
    editor.value.focus();
    lastPosition = null;
  });

  async function loadMonaco() {
    monaco.value = await import("monaco-editor");
  }

  const ready = loadMonaco();

  const ret = { editor, model, source, mode, ready };

  return {
    ...ret,
    async then(onFulfilled, onRejected) {
      await ready;
      return Promise.resolve(ret).then(onFulfilled, onRejected);
    },
  };
}
