export interface Config {
  appName: string;
  apiName: string;
  apiHttp: string;
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
}
