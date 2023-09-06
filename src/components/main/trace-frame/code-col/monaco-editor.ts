import {
  ref,
  shallowRef,
  computed,
  unref,
  toValue,
  watchEffect,
  onMounted,
} from "vue";
import type { Ref, MaybeRefOrGetter, MaybeRef } from "vue";
import * as monaco from "monaco-editor";

export function useMonacoEditor(
  element: MaybeRef<HTMLElement | undefined>,
  source: Ref<string>
) {
  const model = monaco.editor.createModel(toValue(source), "python");
  const editor = shallowRef<monaco.editor.IStandaloneCodeEditor>();

  onMounted(() => {
    const ele = unref(element);
    if (!ele) {
      console.error("element is undefined");
      return;
    }
    editor.value = monaco.editor.create(ele, {
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
      quickSuggestions: false,
      readOnly: true,
      matchBrackets: "never",
      selectionHighlight: false,
      occurrencesHighlight: false,
      renderLineHighlight: "none",
    });
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
  editor: MaybeRefOrGetter<monaco.editor.IStandaloneCodeEditor | undefined>
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
  editor: MaybeRefOrGetter<monaco.editor.IStandaloneCodeEditor | undefined>,
  lineNo: MaybeRefOrGetter<number>,
  className: MaybeRefOrGetter<string>,
  glyphMarginClassName: MaybeRefOrGetter<string>
) {
  const { deltaDeco, range, options } = useDeltaDecoration();
  const { deltaDecos } = useDecorationsCollection(editor);

  watchEffect(() => {
    deltaDecos.value = deltaDeco.value ? [deltaDeco.value] : [];
  });

  watchEffect(() => {
    if (!(toValue(lineNo) >= 1)) return;
    // To change the color of the line number.
    toValue(editor)?.setPosition({ lineNumber: toValue(lineNo), column: 1 });
  });

  watchEffect(() => {
    if (!(toValue(lineNo) >= 1)) return;
    range.value = new monaco.Range(toValue(lineNo), 1, toValue(lineNo), 1);
    options.value = {
      isWholeLine: true,
      className: toValue(className), // background color
      glyphMarginClassName: toValue(glyphMarginClassName), // arrow
    };
  });
}
