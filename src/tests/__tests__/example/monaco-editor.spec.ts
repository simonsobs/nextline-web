import { describe, it, expect } from "vitest";
import * as monaco from "monaco-editor";

describe.skip("monaco-editor", () => {
  // Note: The test fails at the initial run with
  // TypeError: Cannot read properties of null (reading 'webkitBackingStorePixelRatio')
  // However, it will pass at rerun (press "f").
  it("create", () => {
    const ele = document.createElement("div");
    const model = monaco.editor.createModel("hello world", "text/plain");
    const editor = monaco.editor.create(ele, { model });
    expect(editor.getValue()).toBe("hello world");
  });
});
