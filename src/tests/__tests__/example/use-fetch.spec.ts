import { ref } from "vue";
import { describe, it, expect, vi, afterEach } from "vitest";
import { useFetch } from "@vueuse/core";

global.fetch = vi.fn();

// https://runthatline.com/how-to-mock-fetch-api-with-vitest/
// https://vueuse.org/core/useFetch/

describe("useFetch", () => {
  type Response = Awaited<ReturnType<typeof global.fetch>>;

  // @ts-expect-error
  const createResponse = (data: any): Response => ({
    json: () => new Promise((resolve) => resolve(data)),
    ok: true, // https://github.com/vueuse/vueuse/blob/v10.4.1/packages/core/useFetch/index.ts#L471
  });

  const responseData = [
    {
      title: "Unit test",
      done: false,
    },
  ];

  afterEach(() => {
    vi.mocked(global.fetch).mockReset();
  });

  it("should work", async () => {
    vi.mocked(fetch).mockResolvedValue(createResponse(responseData));

    const url = ref("https://jsonplaceholder.typicode.com/todos/1");

    const { data, isFinished, then } = useFetch(url, {
      refetch: true,
    }).json();

    expect(isFinished.value).toBe(false);
    expect(data.value).toBeNull();
    await then();
    expect(isFinished.value).toBe(true);
    expect(data.value).toStrictEqual(responseData);

    // console.log(global.fetch.mock.calls);
  });
});
