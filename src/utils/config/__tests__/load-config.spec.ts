import { describe, it, expect, vi, afterEach } from "vitest";
import { useLoadConfigT } from "../load-config";
import { nextTick } from "vue";

globalThis.fetch = vi.fn();

const createResponse = (data: any): Response =>
  ({
    json: () => new Promise((resolve) => resolve(data)),
    clone: () => createResponse(data),
    ok: true,
    status: 200,
    statusText: "OK",
  }) as Response;

const createErrorResponse = (status: number, statusText: string): Response =>
  ({
    json: () => Promise.reject(new Error(statusText)),
    clone: () => createErrorResponse(status, statusText),
    ok: false,
    status,
    statusText,
  }) as Response;

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
  if (typeof config.apiVersion !== "number") throw Error("apiVersion is not number");
};

describe("useLoadConfigT", () => {
  afterEach(() => {
    vi.mocked(globalThis.fetch).mockReset();
  });

  it("should return data on successful initial fetch", async () => {
    const responseData = {
      apiUrl: "http://example.com/api",
      apiVersion: 2.0,
    };
    vi.mocked(fetch).mockResolvedValueOnce(createResponse(responseData));

    const { config, loading, error, execute } = await useLoadConfigT<Config>(
      defaultConfig,
      validateConfig
    );
    expect(loading.value).toBe(false);
    expect(error.value).toBeUndefined();
    expect(config.value).toEqual(responseData);
    expect(execute).toBeDefined();
  });

  it("should throw error on initial fetch failure", async () => {
    vi.mocked(fetch).mockResolvedValueOnce(createErrorResponse(404, "Not Found"));

    await expect(useLoadConfigT<Config>(defaultConfig, validateConfig)).rejects.toThrow(
      "Failed to load config: undefined"
    );
  });

  it("should not throw error on subsequent fetch failure, update error.value, and keep old config", async () => {
    const initialData = {
      apiUrl: "http://example.com/api",
      apiVersion: 2.0,
    };
    vi.mocked(fetch)
      .mockResolvedValueOnce(createResponse(initialData))
      .mockResolvedValueOnce(createErrorResponse(500, "Internal Server Error"));

    const { config, loading, error, execute } = await useLoadConfigT<Config>(
      defaultConfig,
      validateConfig
    );
    expect(config.value).toEqual(initialData);

    await execute();
    await nextTick();

    expect(config.value).toEqual(initialData); // Config should remain unchanged
    expect(loading.value).toBe(false);
    expect(error.value).toBeDefined();
    expect(error.value).toBe("Internal Server Error");
  });

  it("should update config on successful subsequent fetch", async () => {
    const initialData = {
      apiUrl: "http://example.com/api",
      apiVersion: 2.0,
    };
    const updatedData = {
      apiUrl: "http://example.com/api/v2",
      apiVersion: 3.0,
    };
    vi.mocked(fetch)
      .mockResolvedValueOnce(createResponse(initialData))
      .mockResolvedValueOnce(createResponse(updatedData));

    const { config, loading, error, execute } = await useLoadConfigT<Config>(
      defaultConfig,
      validateConfig
    );
    expect(config.value).toEqual(initialData);

    await execute();
    await nextTick();

    expect(config.value).toEqual(updatedData);
    expect(loading.value).toBe(false);
    expect(error.value).toBeUndefined();
  });

  it("should throw validation error on initial fetch", async () => {
    const responseData = {
      apiUrl: "",
      apiVersion: 2.0,
    };
    vi.mocked(fetch).mockResolvedValueOnce(createResponse(responseData));

    await expect(useLoadConfigT<Config>(defaultConfig, validateConfig)).rejects.toThrow(
      "Failed to load config: apiUrl is empty"
    );
  });

  it("should not throw validation error on subsequent fetch, update error.value, and keep old config", async () => {
    const initialData = {
      apiUrl: "http://example.com/api",
      apiVersion: 2.0,
    };
    const invalidData = {
      apiUrl: "",
      apiVersion: 3.0,
    };
    vi.mocked(fetch)
      .mockResolvedValueOnce(createResponse(initialData))
      .mockResolvedValueOnce(createResponse(invalidData));

    const { config, loading, error, execute } = await useLoadConfigT<Config>(
      defaultConfig,
      validateConfig
    );
    expect(config.value).toEqual(initialData);

    await execute();
    await nextTick();

    expect(config.value).toEqual(initialData); // Config should remain unchanged
    expect(loading.value).toBe(false);
    expect(error.value).toBeDefined();
    expect(error.value?.message).toBe("apiUrl is empty");
  });
});
