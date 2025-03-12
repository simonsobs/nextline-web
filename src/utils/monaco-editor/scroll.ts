import { unref, watchEffect } from "vue";
import type { MaybeRef } from "vue";
import type * as monaco from "monaco-editor";

export function useScroll(
  editor: MaybeRef<monaco.editor.IStandaloneCodeEditor | undefined>,
  lineNo: MaybeRef<number>,
) {
  watchEffect(() => {
    const editor_ = unref(editor);
    if (!editor_) return;

    let lineNo_ = unref(lineNo);
    if (!(lineNo_ >= 0)) return;

    const lineCount = editor_.getModel()?.getLineCount();
    if (!(lineCount && lineCount >= lineNo_)) {
      lineNo_ = lineCount || 1;
    }
    editor_.revealLineInCenter(lineNo_);
  });
}
