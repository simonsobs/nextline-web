import {
  SchemeContent,
  SchemeFidelity,
  SchemeNeutral,
  SchemeMonochrome,
  SchemeVibrant,
  SchemeExpressive,
  SchemeTonalSpot,
  Hct,
} from "@material/material-color-utilities";

export const SchemeNameMap = {
  content: SchemeContent,
  fidelity: SchemeFidelity,
  neutral: SchemeNeutral,
  monochrome: SchemeMonochrome,
  vibrant: SchemeVibrant,
  expressive: SchemeExpressive,
  "tonal-spot": SchemeTonalSpot,
} as const;

export type SchemeName = keyof typeof SchemeNameMap;
