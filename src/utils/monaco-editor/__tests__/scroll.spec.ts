import { nextTick, ref } from "vue";
import type { ShallowRef } from "vue";
import { describe, it, expect } from "vitest";
import type * as Monaco from "monaco-editor";

import fc from "fast-check";

import { withAsyncSetup } from "@/tests/test-utils";

import { useMonacoEditor, useScroll } from "..";

const fc_text = fc.array(fc.lorem(), { maxLength: 100, size: "max" });

describe("useScroll()", () => {
  it("Scroll to the line number", async () => {
    await fc.assert(
      fc.asyncProperty(
        fc_text,
        fc.nat(),
        fc.array(fc.nat()),
        async (lines, lineNoInit, lineNoUpdates) => {
          let editor!: ShallowRef<Monaco.editor.IStandaloneCodeEditor | undefined>;
          const element = ref(document.createElement("div"));
          const source = ref(lines.join("\n"));
          const lineNo = ref(lineNoInit);

          await withAsyncSetup(async () => {
            const ready = useMonacoEditor({ element, source });
            ({ editor } = ready);
            useScroll(editor, lineNo);
            await ready;
          });

          const lineNoExpected = Math.min(lineNoInit, lines.length) || 1;
          const ranges = editor.value?.getVisibleRanges();
          expect(ranges).toBeDefined();
          expect(ranges?.length).toBe(1);
          expect(ranges?.[0].startLineNumber).toBeLessThanOrEqual(lineNoExpected);
          expect(ranges?.[0].endLineNumber).toBeGreaterThanOrEqual(lineNoExpected);

          for (const lineNoUpdate of lineNoUpdates) {
            lineNo.value = lineNoUpdate;
            await nextTick();
            const lineNoExpected = Math.min(lineNoUpdate, lines.length) || 1;
            const ranges = editor.value?.getVisibleRanges();
            expect(ranges).toBeDefined();
            expect(ranges?.length).toBe(1);
            expect(ranges?.[0].startLineNumber).toBeLessThanOrEqual(lineNoExpected);
            expect(ranges?.[0].endLineNumber).toBeGreaterThanOrEqual(lineNoExpected);
          }
        }
      ),
      { verbose: true }
    );
  });
});
