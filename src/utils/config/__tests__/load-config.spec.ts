import { describe, it, expect, vi, afterEach } from "vitest";
import { until } from "@vueuse/core";
import { useLoadConfigT } from "../load-config";

globalThis.fetch = vi.fn();

const createResponse = (data: any) =>
  ({
    json: () => new Promise((resolve) => resolve(data)),
    ok: true,
    status: 200,
    statusText: "OK",
  } as Response);

const response404 = {
  json: () => new Promise((resolve) => resolve({})),
  ok: false,
  status: 404,
  statusText: "Not Found",
} as Response;

type Config = {
  apiUrl: string;
  apiVersion: number;
};

const defaultConfig = {
  apiUrl: "http://localhost:5001",
  apiVersion: 1.0,
};

const validateConfig = (config: Config) => {
  if (typeof config.apiUrl !== "string") throw Error("apiUrl is not string");
  if (config?.apiUrl === "") throw Error("apiUrl is empty");

  if (typeof config.apiVersion !== "number")
    throw Error("apiVersion is not number");
};

describe("useLoadConfigT", () => {
  afterEach(() => {
    vi.mocked(globalThis.fetch).mockReset();
  });

  it("should return data", async () => {
    const responseData = {
      apiUrl: "http://example.com/api",
      apiVersion: 2.0,
    };
    const expected = { ...responseData };
    vi.mocked(fetch).mockResolvedValue(createResponse(responseData));
    const { config, loading, error } = useLoadConfigT<Config>();
    expect(config.value).toBeNull();
    expect(loading.value).toBe(true);
    await until(loading).toBe(false);
    expect(error.value).toBeUndefined();
    expect(config.value).toEqual(expected);
  });

  it("should return 404 error", async () => {
    vi.mocked(fetch).mockResolvedValue(response404);
    const { config, loading, error } = useLoadConfigT<Config>();
    expect(config.value).toBeNull();
    expect(loading.value).toBe(true);
    await until(loading).toBe(false);
    expect(error.value).toEqual("Not Found");
    expect(config.value).toBeNull();
  });

  it("should merge with default", async () => {
    const responseData = {
      apiVersion: 2.0,
    };
    const expected = { ...defaultConfig, ...responseData };
    vi.mocked(fetch).mockResolvedValue(createResponse(responseData));
    const { config, loading, error } = useLoadConfigT<Config>(defaultConfig);
    expect(config.value).toBeNull();
    expect(loading.value).toBe(true);
    await until(loading).toBe(false);
    expect(error.value).toBeUndefined();
    expect(config.value).toEqual(expected);
  });

  it("should validate", async () => {
    const responseData = {
      apiVersion: 2.0,
    };
    const expected = { ...defaultConfig, ...responseData };
    vi.mocked(fetch).mockResolvedValue(createResponse(responseData));
    const { config, loading, error } = useLoadConfigT<Config>(
      defaultConfig,
      validateConfig
    );
    expect(config.value).toBeNull();
    expect(loading.value).toBe(true);
    await until(loading).toBe(false);
    expect(error.value).toBeUndefined();
    expect(config.value).toEqual(expected);
  });

  it("should return validation error", async () => {
    const responseData = {
      apiUrl: "",
    };
    vi.mocked(fetch).mockResolvedValue(createResponse(responseData));
    const { config, loading, error } = useLoadConfigT<Config>(
      defaultConfig,
      validateConfig
    );
    expect(config.value).toBeNull();
    expect(loading.value).toBe(true);
    await until(loading).toBe(false);
    expect(error.value.message).toEqual("apiUrl is empty");
    expect(config.value).toBeNull();
  });
});
