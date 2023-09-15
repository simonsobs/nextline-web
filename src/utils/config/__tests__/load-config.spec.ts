import { describe, it, expect, vi, afterEach } from "vitest";
import { until } from "@vueuse/core";
import { useLoadConfigT } from "../load-config";

global.fetch = vi.fn();

describe("useLoadConfigT", () => {
  afterEach(() => {
    vi.mocked(global.fetch).mockReset();
  });

  type Response = Awaited<ReturnType<typeof global.fetch>>;

  // @ts-expect-error
  const createResponse = (data: any): Response => ({
    json: () => new Promise((resolve) => resolve(data)),
    ok: true,
    status: 200,
    statusText: "OK",
  });

  const defaultData = {
    apiName: "localhost",
    appName: "Nextline",
  };

  it("should return data", async () => {
    const responseData = {
      apiHttp: "http://localhost:8000",
      appName: "Nextline",
      apiName: "remote",
    };
    vi.mocked(fetch).mockResolvedValue(createResponse(responseData));

    const { config, loading } = useLoadConfigT();
    await until(loading).toBe(false);

    const expected = { ...responseData };
    expect(config.value).toEqual(expected);
  });

  it("should merge with default", async () => {
    const responseData = {
      apiHttp: "http://localhost:8000",
      apiName: "remote",
    };
    vi.mocked(fetch).mockResolvedValue(createResponse(responseData));

    const { config, loading } = useLoadConfigT(defaultData);
    await until(loading).toBe(false);

    const expected = { ...defaultData, ...responseData };
    expect(config.value).toEqual(expected);
  });

  it("should validate", async () => {
    const responseData = {
      apiHttp: "http://localhost:8000",
      apiName: "remote",
    };
    vi.mocked(fetch).mockResolvedValue(createResponse(responseData));

    const validate = (config: typeof responseData) => {
      if (config.apiName !== "remote") {
        throw new Error("apiName must be remote");
      }
    };

    const { config, loading, error } = useLoadConfigT(defaultData, validate);
    await until(loading).toBe(false);

    expect(error.value).toBeUndefined();

    const expected = { ...defaultData, ...responseData };
    expect(config.value).toEqual(expected);
  });

  it("should return validation error", async () => {
    const responseData = {
      apiHttp: "http://localhost:8000",
      apiName: "localhost",
    };
    vi.mocked(fetch).mockResolvedValue(createResponse(responseData));

    const validate = (config: typeof responseData) => {
      if (config.apiName !== "remote") {
        throw new Error("apiName must be remote");
      }
    };

    const { loading, error } = useLoadConfigT(defaultData, validate);
    await until(loading).toBe(false);

    expect(error.value.message).toEqual("apiName must be remote");
  });

  it("should return 404 error", async () => {
    // @ts-expect-error
    const response: Response = {
      json: () => new Promise((resolve) => resolve({})),
      ok: false,
      status: 404,
      statusText: "Not Found",
    };
    vi.mocked(fetch).mockResolvedValue(response);

    const { loading, error } = useLoadConfigT();
    await until(loading).toBe(false);

    expect(error.value).toEqual("Not Found");
  });
});
