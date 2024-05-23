import { test, expect } from "vitest";
import { useTitle } from "@vueuse/core";
import { ref } from "vue";
import type { MaybeRef } from "vue";

test("useTitle() should be reactive", () => {
  // Initialize useTitle() with a ref
  const initTitle = ref("Hello World");
  const title = useTitle(initTitle);

  expect(initTitle.value).toBe("Hello World");
  expect(title.value).toBe("Hello World");

  // title is still reactive to initTitle
  initTitle.value = "Hello Vue";
  expect(initTitle.value).toBe("Hello Vue");
  expect(title.value).toBe("Hello Vue");

  // initTitle is also reactive to title
  title.value = "New Title";
  expect(title.value).toBe("New Title");
  expect(initTitle.value).toBe("New Title");

  // In fact, they are the same object
  expect(title === initTitle).toBe(true);
});

// How to implement above reactivity.
// Return ref() of the initial value.
// ref() returns the same object if the argument is a ref.
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
  expect(scratch === newScratch).toBe(true);
  expect(scratch.value).toBe("Hello World");
  scratch.value = "Hello Vue";
  expect(scratch.value).toBe("Hello Vue");
  expect(newScratch.value).toBe("Hello Vue");
});
