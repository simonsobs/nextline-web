import { describe, it, expect } from "vitest";
import { ref } from "vue";

import { withSetup } from "@/tests/test-utils";

import { useMonacoEditor } from "../monaco-editor";

describe("useMonacoEditor", () => {
  it("editor is created", () => {
    let result!: ReturnType<typeof useMonacoEditor>;
    const element = ref(document.createElement("div"));
    const source = ref("");
    const app = withSetup(() => {
      result = useMonacoEditor(element, source);
    });
    const { editor, model } = result;
    expect(editor.value).toBeDefined();
    app.unmount();
  });
});
