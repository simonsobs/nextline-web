import {
  ref,
  shallowRef,
  computed,
  toValue,
  watchEffect,
  onMounted,
} from "vue";
import type { Ref, MaybeRef, MaybeRefOrGetter } from "vue";
import * as monaco from "monaco-editor";

import { useDarkMode } from "@/utils/color-theme";

export function useMonacoEditor(
  element: MaybeRefOrGetter<HTMLElement | undefined>,
  source: Ref<string | undefined>
) {
  const { isDark } = useDarkMode();
  const model = monaco.editor.createModel(source.value || "", "python");
  const editor = shallowRef<monaco.editor.IStandaloneCodeEditor>();

  onMounted(() => {
    element = toValue(element);
    if (!element) {
      console.error("element is undefined");
      return;
    }
    editor.value = monaco.editor.create(element, {
      model,
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
      readOnly: true,
      matchBrackets: "never",
      selectionHighlight: false,
      occurrencesHighlight: false,
      renderLineHighlight: "none",
      theme: isDark.value ? "nextline-viewer-dark" : "nextline-viewer-light",
    });
  });

  watchEffect(() => {
    monaco.editor.setTheme(
      toValue(isDark) ? "nextline-viewer-dark" : "nextline-viewer-light"
    );
  });

  return { editor, model };
}
export function useScroll(
  editor: MaybeRefOrGetter<monaco.editor.IStandaloneCodeEditor | undefined>,
  lineNo: MaybeRefOrGetter<number>
) {
  watchEffect(() => {
    if (!toValue(editor)) return;
    if (!(toValue(lineNo) >= 1)) return;
    const lineCount = toValue(editor)?.getModel()?.getLineCount();
    if (!(lineCount && lineCount >= toValue(lineNo))) {
      console.warn(
        `lineNo(${toValue(lineNo)}) is out of range: [1, ${lineCount}]`
      );
    }
    toValue(editor)?.revealLineInCenter(toValue(lineNo));
  });
}

function useDecorationsCollection(
  editor: MaybeRef<monaco.editor.IStandaloneCodeEditor | undefined>
) {
  const deltaDecos = ref<monaco.editor.IModelDeltaDecoration[]>([]);
  const decoCol = computed(() =>
    toValue(editor)?.createDecorationsCollection([])
  );
  watchEffect(() => {
    decoCol.value?.clear();
    decoCol.value?.set(deltaDecos.value);
  });
  return { decoCol, deltaDecos };
}

function useDeltaDecoration() {
  const range = ref<monaco.IRange | undefined>(undefined);
  const options = ref<monaco.editor.IModelDecorationOptions | undefined>();

  const deltaDeco = computed(() => {
    if (!range.value) return undefined;
    if (!options.value) return undefined;
    return { range: range.value, options: options.value };
  });

  return { deltaDeco, range, options };
}

export function useMarkCurrentLine(
  editor: MaybeRef<monaco.editor.IStandaloneCodeEditor | undefined>
) {
  const { deltaDeco, range, options } = useDeltaDecoration();
  const { deltaDecos } = useDecorationsCollection(editor);

  watchEffect(() => {
    deltaDecos.value = deltaDeco.value ? [deltaDeco.value] : [];
  });

  function markCurrentLine(
    lineNo: number,
    className: string,
    glyphMarginClassName: string
  ) {
    if (!(lineNo >= 1)) return;
    range.value = new monaco.Range(lineNo, 1, lineNo, 1);
    options.value = {
      isWholeLine: true,
      className,
      glyphMarginClassName,
    };
  }

  return { markCurrentLine };
}
