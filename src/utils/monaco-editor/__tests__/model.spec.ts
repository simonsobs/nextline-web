import { describe, it, expect } from "vitest";
import { ref, nextTick } from "vue";

import { useModel } from "../model";

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
  
  it('edit model', async () => {
    const source = ref("# Hello, world!");
    const { model } = useModel(source);
    expect(model.getValue()).toBe("# Hello, world!");
    model.setValue("# New source");
    await new Promise((resolve) => setTimeout(resolve, 110));
    expect(source.value).toBe("# New source");
    model.setValue("# New source 2");
    await new Promise((resolve) => setTimeout(resolve, 110));
    expect(source.value).toBe("# New source 2");
  });
});
