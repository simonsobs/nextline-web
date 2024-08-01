export interface Config {
  appName: string;
  apiName: string;
  apiHttp: string;
  seedColor: string;
}

export const defaultConfig = {
  appName: "Nextline",
  apiName: "",
};

export function validateConfig(config: Config) {
  if (typeof config.appName !== "string") throw Error("appName is not string");
  if (config?.appName === "") throw Error("appName is empty");

  if (typeof config.apiName !== "string") throw Error("apiName is not string");
  if (config?.apiName === "") throw Error("apiName is empty");

  if (typeof config.apiHttp !== "string") throw Error("apiHttp is not string");
  if (config?.apiHttp === "") throw Error("apiHttp is empty");

  if (typeof config.seedColor !== "string") throw Error("seedColor is not string");
  if (!/^#([0-9A-F]{3}|[0-9A-F]{6}|[0-9A-F]{8})$/i.test(config.seedColor))
    throw Error(`seedColor is not a valid hex color: ${config.seedColor}`);
}
