import type { ShallowRef } from "vue";

import type { Config } from "./config";
import { defaultConfig, validateConfig } from "./config";
import { useConfigT } from "./inject-config";
import { useLoadConfigT } from "./load-config";
import { useOverrideT } from "./override";
import { useProvideConfigT } from "./provide-config";

export type { Config };

/**
 * Get the config from the parent component.
 * In the parent component, use `useProvideConfig` to provide the config.
 */
export const useConfig = () => useConfigT<Config>();

/**
 * Provide the config to the child components.
 * In the child components, use `useConfig` to get the config.
 */
export const useProvideConfig = (config: Config | ShallowRef<Config>) =>
  useProvideConfigT<Config>(config);

/**
 * Read the config from the config file.
 * Use useProvideConfig to provide the config to the child components.
 */
export const useLoadConfig = async () =>
  await useLoadConfigT<Config>(defaultConfig, validateConfig);

// For dev. Need refactoring.
export const useOverride = (loadConfig: Awaited<ReturnType<typeof useLoadConfig>>) =>
  useOverrideT<Config>(loadConfig);
