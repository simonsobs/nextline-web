import { describe, it, expect } from "vitest";
import { ref, nextTick, unref, isRef } from "vue";

import fc from "fast-check";

import { useModel } from "..";

const fcText = () =>
  fc.array(fc.oneof(fc.lorem(), fc.constant("")), {
    maxLength: 100,
    size: "max",
  });

const fcSource = () =>
  fc.oneof(
    fcText().map((lines) => lines.join("\n")),
    fcText().map((lines) => ref(lines.join("\n")))
  );

const fcLanguage = () =>
  fc.option(fc.constantFrom("python", "typescript"), {
    nil: undefined,
  });

const fcUseModelOptions = () =>
  fc.record(
    {
      source: fcSource(),
      language: fcLanguage(),
    },
    { withDeletedKeys: true }
  );

describe("fcUseModelOptions()", () => {
  it("Options of useModel() are generated", () => {
    fc.assert(
      fc.property(fcUseModelOptions(), (options) => {
        expect(options).toBeDefined();
        return true;
      })
    );
  });
});

const fcUseModelArgs = () =>
  fc.option(
    fcUseModelOptions().map((options) => [options]),
    { nil: [] }
  );

function assertDefined<T>(value: T): asserts value is NonNullable<T> {
  expect(value).toBeDefined();
}

describe("useModel()", () => {
  it("Property test", async () => {
    await fc.assert(
      fc.asyncProperty(fcUseModelArgs(), fc.boolean(), async (args, early) => {
        const { model, source, dispose, ready } = early
          ? useModel(...args)
          : await useModel(...args);
        if (early) await ready;

        const model_ = model.value;
        assertDefined(model_);

        const options = args?.[0];

        const expectedLanguage = options?.language ?? "python";
        expect(model_.getLanguageId()).toBe(expectedLanguage);

        if (isRef(options?.source)) {
          expect(source.value).toBe(options?.source.value);
        }

        const expectedValue = unref(options?.source ?? "");
        expect(model_.getValue()).toBe(expectedValue);

        dispose();
      }),
      { verbose: true, numRuns: 10 } // NOTE: Error with larger numRuns
    );
  });

  it("Source is reactive", async () => {
    const source = ref("# Hello, world!");
    const { model } = await useModel({ source });
    expect(model.value?.getValue()).toBe("# Hello, world!");
    source.value = "# New source";
    await nextTick();
    expect(model.value?.getValue()).toBe("# New source");
  });

  it("Edit model", async () => {
    const source = ref("# Hello, world!");
    const { model } = await useModel({ source });
    expect(model.value?.getValue()).toBe("# Hello, world!");
    model.value?.setValue("# New source");
    await new Promise((resolve) => setTimeout(resolve, 110));
    expect(source.value).toBe("# New source");
    model.value?.setValue("# New source 2");
    await new Promise((resolve) => setTimeout(resolve, 110));
    expect(source.value).toBe("# New source 2");
  });
});
