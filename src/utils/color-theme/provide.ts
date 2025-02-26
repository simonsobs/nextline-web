import type { MaybeRef } from "vue";
import { provide } from "vue";

import { createColorTheme } from "./color-theme";
import { injectionKeyColorTheme } from "./key";

export function provideColorTheme(sourceColorHex?: MaybeRef<string | undefined>) {
  const { light, dark } = createColorTheme(sourceColorHex);
  provide(injectionKeyColorTheme, { light, dark });
}
