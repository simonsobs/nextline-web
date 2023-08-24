import { useDark, useToggle } from "@vueuse/core";

/**
 * Toggle the dark mode with the `useDark` and `useToggle` from `@vueuse/core`.
 *
 * @see https://vueuse.org/core/useDark
 *
 */
export function useDarkMode() {
  const isDark = useDark();
  const toggleDark = useToggle(isDark);
  return { isDark, toggleDark };
}
