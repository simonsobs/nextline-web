import { describe, it, expect } from "vitest";
import { ref, nextTick, unref, isRef } from "vue";
import type { Ref } from "vue";
import fc from "fast-check";

import { withAsyncSetup } from "@/tests/test-utils";

import { useMonacoEditor } from "..";

import { fcSource, fcLanguage } from "./model.spec";

const fcElement = () =>
  fc
    .oneof(
      fc.integer().map(() => document.createElement("div")),
      fc.constant(undefined),
    )
    .chain(
      (element): fc.Arbitrary<HTMLElement | Ref<HTMLElement | undefined>> =>
        element === undefined
          ? fc.constant(ref(element))
          : fc.oneof(fc.constant(element), fc.constant(ref(element))),
    );

const fcMode = () =>
  fc.option(fc.constantFrom("viewer" as const, "editor" as const), {
    nil: undefined,
  });

const fcUseMonacoEditorOptions = () =>
  fc.record(
    {
      element: fcElement(),
      mode: fcMode(),
      source: fcSource(),
      language: fcLanguage(),
    },
    { requiredKeys: ["element"] },
  );

describe("fcUseMonacoEditorOptions()", () => {
  it("Options of useMonacoEditor() are generated", () => {
    fc.assert(
      fc.property(fcUseMonacoEditorOptions(), (options) => {
        expect(options).toBeDefined();
        return true;
      }),
    );
  });
});

describe("useMonacoEditor()", () => {
  it("Property test", async () => {
    await fc.assert(
      fc.asyncProperty(
        fcUseMonacoEditorOptions(),
        fc.boolean(),
        async (options, early) => {
          let editor!: ReturnType<typeof useMonacoEditor>["editor"];
          let model!: ReturnType<typeof useMonacoEditor>["model"];
          let source!: ReturnType<typeof useMonacoEditor>["source"];
          let mode!: ReturnType<typeof useMonacoEditor>["mode"];
          let ready!: ReturnType<typeof useMonacoEditor>["ready"];
          const { wrapper } = await withAsyncSetup(async () => {
            ({ editor, model, source, mode, ready } = early
              ? useMonacoEditor(options)
              : await useMonacoEditor(options));
          });
          if (early) await ready;
          if (isRef(options.element) && options.element.value === undefined) {
            options.element.value = document.createElement("div");
          }
          await nextTick();
          expect(editor.value).toBeDefined();

          const expectedSource = unref(options.source) ?? "";
          expect(source.value).toBe(expectedSource);
          expect(model.value?.getValue()).toBe(expectedSource);

          const expectedMode = unref(options.mode) ?? "viewer";
          expect(mode.value).toBe(expectedMode);

          wrapper.unmount();
        },
      ),
    );
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
