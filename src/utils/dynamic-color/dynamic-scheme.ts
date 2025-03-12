import { computed, ref, watchEffect } from "vue";
import type { MaybeRef, Ref, UnwrapRef } from "vue";
import { argbFromHex, Hct } from "@material/material-color-utilities";

import { SchemeNameMap } from "./schemes";
import type { SchemeName } from "./schemes";

export interface UseDynamicSchemeOptions {
  schemeName?: MaybeRef<SchemeName>;
  sourceColorHex?: MaybeRef<string>;
  dark?: MaybeRef<boolean>;
  contrastLevel?: MaybeRef<number>;
}

const optDefault: Required<UnwrapRef<UseDynamicSchemeOptions>> = {
  schemeName: "fidelity",
  sourceColorHex: "#6750A4",
  dark: false,
  contrastLevel: 0.0,
};

// "#6750A4" is the default seed in https://www.figma.com/community/file/1035197037666593721/Visualizing-dynamic-color-in-your-app-with-Material-Design

/**
 * A composable function that creates and manages a dynamic color scheme.
 *
 * This function initializes reactive state for various scheme parameters,
 * computes the color scheme based on these parameters, and handles color
 * conversions and scheme class selection.
 *
 * @param options - Optional configuration object for the color scheme.
 *   - schemeName: The name of the color scheme to use.
 *   - sourceColorHex: The source color in hexadecimal format.
 *   - dark: Whether to use the dark variant of the scheme.
 *   - contrastLevel: The contrast level for the scheme.
 *
 * @returns An object containing reactive references and computed properties:
 *   - scheme: The computed color scheme instance.
 *   - schemeName: Reactive reference to the current scheme name.
 *   - sourceColorHex: Reactive reference to the current source color in hex format.
 *   - dark: Reactive reference to the current dark mode state.
 *   - contrastLevel: Reactive reference to the current contrast level.
 *   - schemeClass: Computed property for the current scheme class.
 *   - sourceColorHct: Computed property for the source color in HCT format.
 *
 * @example
 * const { scheme, dark, sourceColorHex } = useDynamicScheme({
 *   schemeName: 'vibrant',
 *   sourceColorHex: '#FF5733',
 *   dark: false,
 *   contrastLevel: 0
 * });
 */
export function useDynamicScheme(options?: UseDynamicSchemeOptions) {
  const schemeName = ref(options?.schemeName ?? optDefault.schemeName);
  const sourceColorHex = ref(options?.sourceColorHex ?? optDefault.sourceColorHex);
  const dark = ref(options?.dark ?? optDefault.dark);
  const contrastLevel = ref(options?.contrastLevel ?? optDefault.contrastLevel);
  const schemeClass = computed(() => SchemeNameMap[schemeName.value]);
  const argb = useArgb(sourceColorHex, optDefault.sourceColorHex);
  const sourceColorHct = computed(() => Hct.fromInt(argb.value));
  const scheme = computed(
    () => new schemeClass.value(sourceColorHct.value, dark.value, contrastLevel.value),
  );
  return {
    scheme,
    schemeName,
    sourceColorHex,
    dark,
    contrastLevel,
    schemeClass,
    sourceColorHct,
  };
}

/**
 * A composable function that manages the ARGB value based on a source hex color.
 * It handles conversion errors and falls back to a default color when necessary.
 *
 * @param sourceColorHex A reactive reference to the source color in hex format.
 * @param defaultColorHex The default color in hex format to use as a fallback.
 * @returns A reactive reference to the ARGB value.
 *
 * @example
 * const sourceColor = ref('#FF5733');
 * const argb = useArgb(sourceColor, '#000000');
 */
function useArgb(sourceColorHex: Ref<string>, defaultColorHex: string) {
  const argb = ref(argbFromHex(defaultColorHex));

  watchEffect(
    () => {
      try {
        argb.value = argbFromHex(sourceColorHex.value);
      } catch (e: unknown) {
        const errorText = e instanceof Error ? e.message : `${e}`;
        const message = `${errorText}; use default color: ${defaultColorHex}`;
        console.warn(message);
        sourceColorHex.value = defaultColorHex;
        argb.value = argbFromHex(defaultColorHex);
      }
    },
    { flush: "sync" },
  );

  return argb;
}
