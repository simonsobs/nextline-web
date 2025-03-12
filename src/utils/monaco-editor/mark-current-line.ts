import { ref, computed, toValue, watchEffect } from "vue";
import type { MaybeRefOrGetter } from "vue";
import type * as Monaco from "monaco-editor";

function useDecorationsCollection(
  editor: MaybeRefOrGetter<Monaco.editor.IStandaloneCodeEditor | undefined>,
) {
  const deltaDecos = ref<Monaco.editor.IModelDeltaDecoration[]>([]);
  const decoCol = computed(() => toValue(editor)?.createDecorationsCollection([]));
  watchEffect(() => {
    decoCol.value?.clear();
    decoCol.value?.set(deltaDecos.value);
  });
  return { decoCol, deltaDecos };
}

function useDeltaDecoration() {
  const range = ref<Monaco.IRange | undefined>(undefined);
  const options = ref<Monaco.editor.IModelDecorationOptions | undefined>();

  const deltaDeco = computed(() => {
    if (!range.value) return undefined;
    if (!options.value) return undefined;
    return { range: range.value, options: options.value };
  });

  return { deltaDeco, range, options };
}

interface _UseMarkCurrentLineReturn {
  ready: Promise<void>;
}

type UseMarkCurrentLineReturn = _UseMarkCurrentLineReturn &
  PromiseLike<_UseMarkCurrentLineReturn>;

export function useMarkCurrentLine(
  editor: MaybeRefOrGetter<Monaco.editor.IStandaloneCodeEditor | undefined>,
  lineNo: MaybeRefOrGetter<number>,
  className: MaybeRefOrGetter<string>,
  glyphMarginClassName: MaybeRefOrGetter<string>,
): UseMarkCurrentLineReturn {
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

  const monaco = ref<typeof Monaco>();

  watchEffect(() => {
    if (!monaco.value) return;
    if (!(toValue(lineNo) >= 1)) return;
    range.value = new monaco.value.Range(toValue(lineNo), 1, toValue(lineNo), 1);
    options.value = {
      isWholeLine: true,
      className: toValue(className), // background color
      glyphMarginClassName: toValue(glyphMarginClassName), // arrow
    };
  });

  async function loadMonaco() {
    monaco.value = await import("monaco-editor");
  }

  const ready = loadMonaco();

  const ret = { ready };

  return {
    ...ret,
    async then(onFulfilled, onRejected) {
      await ready;
      return Promise.resolve(ret).then(onFulfilled, onRejected);
    },
  };
}
