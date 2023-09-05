import { describe, it, expect } from "vitest";
import { ref } from "vue";
import {
  argbFromHex,
  SchemeFidelity,
  SchemeExpressive,
} from "@material/material-color-utilities";

import { useDynamicScheme } from "..";
import type { UseDynamicSchemeOptions, SchemeName } from "..";

describe("useDynamicScheme", () => {
  it("returns readonly scheme", () => {
    const options: UseDynamicSchemeOptions = {
      schemeName: "expressive",
      sourceColorHex: "#2196F3",
      dark: true,
      contrastLevel: 0.2,
    };

    const { schemeName, dark, scheme } = useDynamicScheme(options);

    expect(scheme.value).toBeInstanceOf(SchemeExpressive);
    expect(scheme.value.sourceColorArgb).toBe(argbFromHex("#2196F3"));
    expect(scheme.value.isDark).toBe(true);
    expect(scheme.value.contrastLevel).toBe(0.2);

    schemeName.value = "fidelity";
    dark.value = false;

    expect(scheme.value).toBeInstanceOf(SchemeFidelity);
    expect(scheme.value.sourceColorArgb).toBe(argbFromHex("#2196F3"));
    expect(scheme.value.isDark).toBe(false);
    expect(scheme.value.contrastLevel).toBe(0.2);
  });

  it("returns default options", () => {
    const { schemeName, sourceColorHex, dark, contrastLevel } =
      useDynamicScheme();

    expect(schemeName.value).toBe("fidelity");
    expect(sourceColorHex.value).toBe("#6750A4");
    expect(dark.value).toBe(false);
    expect(contrastLevel.value).toBe(0.0);
  });

  it("returns reactive options", () => {
    const options: UseDynamicSchemeOptions = {
      schemeName: "expressive",
      sourceColorHex: "#2196F3",
      dark: true,
      contrastLevel: 0.2,
    };

    const { schemeName, sourceColorHex, dark, contrastLevel } =
      useDynamicScheme(options);

    expect(schemeName.value).toBe("expressive");
    expect(sourceColorHex.value).toBe("#2196F3");
    expect(dark.value).toBe(true);
    expect(contrastLevel.value).toBe(0.2);
  });

  it("keeps options reactive", () => {
    const options = {
      schemeName: ref<SchemeName>("expressive"),
      sourceColorHex: ref("#2196F3"),
      dark: ref(true),
      contrastLevel: ref(0.2),
    };

    const { schemeName, sourceColorHex, dark, contrastLevel } =
      useDynamicScheme(options);

    expect(schemeName.value).toBe("expressive");
    expect(sourceColorHex.value).toBe("#2196F3");
    expect(dark.value).toBe(true);
    expect(contrastLevel.value).toBe(0.2);

    options.schemeName.value = "fidelity";
    options.sourceColorHex.value = "#3F51B5";
    options.dark.value = false;
    options.contrastLevel.value = 0.3;

    expect(schemeName.value).toBe("fidelity");
    expect(sourceColorHex.value).toBe("#3F51B5");
    expect(dark.value).toBe(false);
    expect(contrastLevel.value).toBe(0.3);

    schemeName.value = "neutral";
    sourceColorHex.value = "#673AB7";
    dark.value = true;
    contrastLevel.value = 0.4;

    expect(options.schemeName.value).toBe("neutral");
    expect(options.sourceColorHex.value).toBe("#673AB7");
    expect(options.dark.value).toBe(true);
    expect(options.contrastLevel.value).toBe(0.4);
  });

  it("returns readonly scheme class", () => {
    const { schemeName, schemeClass } = useDynamicScheme();
    expect(schemeClass.value.name).toBe("SchemeFidelity");
    schemeName.value = "expressive";
    expect(schemeClass.value.name).toBe("SchemeExpressive");
  });

  it("returns readonly source color Hct", () => {
    const { sourceColorHex, sourceColorHct } = useDynamicScheme();
    expect(sourceColorHct.value.toInt()).toBe(argbFromHex("#6750A4"));
    sourceColorHex.value = "#2196F3";
    expect(sourceColorHct.value.toInt()).toBe(argbFromHex("#2196F3"));
  });
});
