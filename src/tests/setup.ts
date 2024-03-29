/**
 * This file is automatically loaded before each test.
 * The file path is specified in vitest.config.ts.
 */
import { vi } from "vitest";

// For monaco.editor.create()
// https://github.com/vitest-dev/vitest/issues/821#issuecomment-1046954558
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// For monaco.editor.create() with automaticLayout: true
// https://stackoverflow.com/a/68680087/7309855
Object.defineProperty(window, "ResizeObserver", {
  writable: true,
  value: vi.fn(() => ({
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
  })),
});
