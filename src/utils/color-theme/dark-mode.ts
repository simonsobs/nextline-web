import { useDark, useToggle } from "@vueuse/core";
import { useTheme } from "vuetify";

/**
 * Toggle the Vuetify theme between light and dark mode with
 * the `useDark` and `useToggle` functions from `@vueuse/core`.
 *
 * @see https://vuetifyjs.com/en/features/theme/
 * @see https://vueuse.org/core/useDark
 */
export function useDarkMode() {
  const theme = useTheme();
  const isDark = useDark({
    onChanged(isDark: boolean) {
      theme.global.name.value = isDark ? "dark" : "light";
    },
  });
  const toggleDark = useToggle(isDark);
  return {
    isDark,
    toggleDark,
  };
}
