import { describe, it, expect, afterEach } from "vitest";
import { ref } from "vue";

import { withSetup } from "@/tests/test-utils";

import { useMonacoEditor } from "../monaco-editor";

describe("useMonacoEditor", () => {
  let app!: ReturnType<typeof withSetup>;

  afterEach(() => {
    app.unmount();
  });

  it("editor is created", () => {
    let result!: ReturnType<typeof useMonacoEditor>;
    const element = ref(document.createElement("div"));
    const source = ref("# Hello, world!");
    app = withSetup(() => {
      result = useMonacoEditor(element, source);
    });
    const { editor, model } = result;
    expect(editor.value).toBeDefined();
    expect(model.getValue()).toBe("# Hello, world!");
  });
});
