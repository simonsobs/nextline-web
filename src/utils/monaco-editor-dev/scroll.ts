import { unref, watchEffect } from "vue";
import type { MaybeRef } from "vue";
import * as monaco from "monaco-editor";

export function useScroll(
  editor: MaybeRef<monaco.editor.IStandaloneCodeEditor | undefined>,
  lineNo: MaybeRef<number>
) {
  watchEffect(() => {
    if (!unref(editor)) return;
    if (!(unref(lineNo) >= 1)) return;
    const lineCount = unref(editor)?.getModel()?.getLineCount();
    if (!(lineCount && lineCount >= unref(lineNo))) {
      console.warn(`lineNo(${unref(lineNo)}) is out of range: [1, ${lineCount}]`);
    }
    unref(editor)?.revealLineInCenter(unref(lineNo));
  });
}
