import { ref, computed, toValue, watchEffect } from "vue";
import type { MaybeRefOrGetter } from "vue";
import * as monaco from "monaco-editor";

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
