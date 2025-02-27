import type { MaybeRef } from "vue";
import { provide } from "vue";

import { createColorTheme } from "./create";
import { injectionKeyColorTheme } from "./key";

export function provideColorTheme(sourceColorHex?: MaybeRef<string | undefined>) {
  const { light, dark } = createColorTheme(sourceColorHex);
  provide(injectionKeyColorTheme, { light, dark });
}
