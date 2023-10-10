import { describe, it, expect, afterEach } from "vitest";
import { ref, nextTick } from "vue";
import * as monaco from "monaco-editor";

import { withSetup } from "@/tests/test-utils";
import { useMonacoEditor } from "../editor";

const { EditorOption } = monaco.editor;

// Skip on GitHub Actions
describe.skipIf(process.env.CI)("useMonacoEditor", () => {
  // The test sometimes fails when running all tests after "vite test" started.
  // However, it usually passes afterwards when "f" is pressed to run only the
  // failed tests. The cause of the initial failure is unknown.
  let app!: ReturnType<typeof withSetup>;

  afterEach(() => {
    app.unmount();
  });

  it("editor is created", async () => {
    let result!: ReturnType<typeof useMonacoEditor>;
    const element = ref(document.createElement("div"));
    const source = ref("# Hello, world!");
    app = withSetup(() => {
      result = useMonacoEditor({ element, source });
    });
    const { editor, model, mode } = result;
    await nextTick();
    expect(editor.value).toBeDefined();
    expect(model.getValue()).toBe("# Hello, world!");

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
