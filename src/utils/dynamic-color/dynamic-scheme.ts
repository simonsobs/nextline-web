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
    { flush: "sync" }
  );

  return argb;
}

export function useDynamicScheme(options?: UseDynamicSchemeOptions) {
  const schemeName = ref(options?.schemeName ?? optDefault.schemeName);
  const sourceColorHex = ref(options?.sourceColorHex ?? optDefault.sourceColorHex);
  const dark = ref(options?.dark ?? optDefault.dark);
  const contrastLevel = ref(options?.contrastLevel ?? optDefault.contrastLevel);
  const schemeClass = computed(() => SchemeNameMap[schemeName.value]);
  const argb = useArgb(sourceColorHex, optDefault.sourceColorHex);
  const sourceColorHct = computed(() => Hct.fromInt(argb.value));
  const scheme = computed(
    () => new schemeClass.value(sourceColorHct.value, dark.value, contrastLevel.value)
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
