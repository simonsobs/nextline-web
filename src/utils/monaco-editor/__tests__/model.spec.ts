import { describe, it, expect } from "vitest";
import { ref, nextTick } from "vue";

import { useModel } from "../model";

describe("useModel()", () => {
  it("call without arguments", async () => {
    const { model, source } = await useModel();
    expect(source.value).toBe("");
    expect(model.value?.getValue()).toBe("");
  });

  it("call with string source", async () => {
    const source = "# Hello, world!";
    const { model } = await useModel({ source });
    expect(model.value?.getValue()).toBe("# Hello, world!");
  });

  it("call with ref source", async () => {
    const source = ref("# Hello, world!");
    const { model, source: sourceReturned } = await useModel({ source });
    expect(sourceReturned === source).toBe(true);
    expect(model.value?.getValue()).toBe("# Hello, world!");
  });

  it("source is reactive", async () => {
    const source = ref("# Hello, world!");
    const { model } = await useModel({ source });
    expect(model.value?.getValue()).toBe("# Hello, world!");
    source.value = "# New source";
    await nextTick();
    expect(model.value?.getValue()).toBe("# New source");
  });

  it("edit model", async () => {
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
