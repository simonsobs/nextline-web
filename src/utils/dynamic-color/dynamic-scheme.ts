import { computed, ref } from "vue";
import type { MaybeRef, UnwrapRef } from "vue";
import { argbFromHex, Hct } from "@material/material-color-utilities";
import { SchemeNameMap } from "./schemes";
import type { SchemeName } from "./schemes";

export type UseDynamicSchemeOptions = {
  schemeName?: MaybeRef<SchemeName>;
  sourceColorHex?: MaybeRef<string>;
  dark?: MaybeRef<boolean>;
  contrastLevel?: MaybeRef<number>;
};

const optDefault: Required<UnwrapRef<UseDynamicSchemeOptions>> = {
  schemeName: "fidelity",
  sourceColorHex: "#6750A4",
  dark: false,
  contrastLevel: 0.0,
};

export function useDynamicScheme(options?: UseDynamicSchemeOptions) {
  const schemeName = ref(options?.schemeName ?? optDefault.schemeName);
  const sourceColorHex = ref(
    options?.sourceColorHex ?? optDefault.sourceColorHex
  );
  const dark = ref(options?.dark ?? optDefault.dark);
  const contrastLevel = ref(options?.contrastLevel ?? optDefault.contrastLevel);
  const schemeClass = computed(() => SchemeNameMap[schemeName.value]);
  const sourceColorHct = computed(() =>
    Hct.fromInt(argbFromHex(sourceColorHex.value))
  );
  const scheme = computed(
    () =>
      new schemeClass.value(
        sourceColorHct.value,
        dark.value,
        contrastLevel.value
      )
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
