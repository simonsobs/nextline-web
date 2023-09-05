import { test, expect } from "vitest";
import { useTitle } from "@vueuse/core";
import { ref } from "vue";
import type { MaybeRef } from "vue";

// Test the argument of useTitle() is reactive
test("useTitle() should be reactive", () => {
  const title = ref("Hello World");
  const t = useTitle(title);
  expect(title.value).toBe("Hello World");
  title.value = "Hello Vue";
  expect(title.value).toBe("Hello Vue");
  t.value = "New Title";
  expect(t.value).toBe("New Title");
  expect(title.value).toBe("New Title");
});

function useScratch(newScratch: MaybeRef<string>) {
  const scratch = ref(newScratch);
  return scratch;
}

test("useScratch() non ref arg", () => {
  const newScratch = "Hello World";
  const scratch = useScratch(newScratch);
  expect(scratch.value).toBe("Hello World");
});

test("useScratch() should be reactive", () => {
  const newScratch = ref("Hello World");
  const scratch = useScratch(newScratch);
  expect(scratch.value).toBe("Hello World");
  scratch.value = "Hello Vue";
  expect(scratch.value).toBe("Hello Vue");
  expect(newScratch.value).toBe("Hello Vue");
  console.log(newScratch === scratch);
});
