import type { InjectionKey } from "vue";
import type { ColorTheme } from "./color-theme";

export const injectionKeyColorTheme = Symbol("color-theme") as InjectionKey<ColorTheme>;
