import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { ref, nextTick } from "vue";

import { withSetup } from "@/tests/test-utils";

import { useModel, useMonacoEditor } from "../monaco-editor";

describe("useModel()", () => {

  it("call without arguments", () => {
    const { model, source } = useModel();
    expect(source.value).toBe("");
    expect(model.getValue()).toBe("");
  });

  it("call with string source", () => {
    const source = "# Hello, world!";
    const { model } = useModel(source);
    expect(model.getValue()).toBe("# Hello, world!");
  });

  it("call with ref source", () => {
    const source = ref("# Hello, world!");
    const { model, source: sourceReturned } = useModel(source);
    expect(sourceReturned === source).toBe(true);
    expect(model.getValue()).toBe("# Hello, world!");
  });
  
  it("source is reactive", async () => {
    const source = ref("# Hello, world!");
    const { model } = useModel(source);
    expect(model.getValue()).toBe("# Hello, world!");
    source.value = "# New source";
    await nextTick();
    expect(model.getValue()).toBe("# New source");
  });

});

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
