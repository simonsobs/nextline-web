import { computed } from "vue";
import type { MaybeRef } from "vue";
import { hexFromArgb } from "@material/material-color-utilities";
import type { DynamicScheme } from "@material/material-color-utilities";

import { useDynamicScheme } from "./dynamic-scheme";
import type { SchemeName } from "./schemes";
import { ColorNameMap } from "./colors";
import type { ColorName } from "./colors";

export type UseDynamicColorsOptions = {
  schemeName?: MaybeRef<SchemeName>;
  sourceColorHex?: MaybeRef<string>;
  dark?: MaybeRef<boolean>;
  contrastLevel?: MaybeRef<number>;
};

export function useDynamicColors(options?: UseDynamicColorsOptions) {
  const { scheme, ...rest } = useDynamicScheme(options);
  const colors = computed(() => generateColors(scheme.value));
  return { colors, scheme, ...rest };
}

const generateColors = (scheme: DynamicScheme) =>
  Object.assign(
    {},
    ...Object.entries(ColorNameMap).map(([colorName, dynamicColor]) => ({
      [colorName]: hexFromArgb(dynamicColor.getArgb(scheme)),
    }))
  ) as { [k in ColorName]: string };
