import type { InjectionKey } from "vue";

import type { ColorTheme } from "./create";

export const injectionKeyColorTheme = Symbol("color-theme") as InjectionKey<ColorTheme>;
