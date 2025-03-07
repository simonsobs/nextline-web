import { describe, it, expect } from "vitest";
import { ref, nextTick } from "vue";

import { withAsyncSetup } from "@/tests/test-utils";
import { useMonacoEditor } from "..";

describe("useMonacoEditor()", () => {
  it("Editor is created", async () => {
    let result!: Awaited<ReturnType<typeof useMonacoEditor>>;
    const element = ref(document.createElement("div"));
    const source = ref("# Hello, world!");
    await withAsyncSetup(async () => {
      result = await useMonacoEditor({ element, source });
    });
    const { editor, model } = result;
    expect(editor.value).toBeDefined();
    expect(model.value?.getValue()).toBe("# Hello, world!");
  });

  it("The 'ready' is awaited", async () => {
    let result!: ReturnType<typeof useMonacoEditor>;
    const element = ref(document.createElement("div"));
    const source = ref("# Hello, world!");
    await withAsyncSetup(async () => {
      result = useMonacoEditor({ element, source });
    });
    const { editor, model, ready } = result;
    await ready;
    expect(editor.value).toBeDefined();
    expect(model.value?.getValue()).toBe("# Hello, world!");
  });

  it("The mode changes between 'viewer' and 'editor'", async () => {
    let result!: Awaited<ReturnType<typeof useMonacoEditor>>;
    const element = ref(document.createElement("div"));
    const source = ref("# Hello, world!");
    await withAsyncSetup(async () => {
      result = await useMonacoEditor({ element, source });
    });
    const { editor, mode } = result;
    expect(editor.value).toBeDefined();

    const monaco = await import("monaco-editor");
    const { EditorOption } = monaco.editor;

    let options = editor.value?.getOptions();
    expect(options?.get(EditorOption.readOnly)).toBe(true);
    expect(mode.value).toBe("viewer");

    mode.value = "editor";
    expect(mode.value).toBe("editor");
    await nextTick();
    options = editor.value?.getOptions();
    expect(options?.get(EditorOption.readOnly)).toBe(false);
  });
});
