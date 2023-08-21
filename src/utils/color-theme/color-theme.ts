import { ref, watch } from "vue";
import { useTheme } from "vuetify";

import { generate } from "./material-color";
import { useDarkMode } from "./dark-mode";

export function useColorTheme() {
  useDarkMode();
  const theme = useTheme();
  const sourceColor = ref("#607D8B"); // blue grey
  watch(
    sourceColor,
    (val) => {
      const [dynamicLight, dynamicDark] = generate(val);

      // @ts-ignore
      theme.themes.value.light.colors = dynamicLight.colors;

      // @ts-ignore
      theme.themes.value.dark.colors = dynamicDark.colors;
    },
    { immediate: true }
  );
}
