import {
  useCtrlStateQuery,
  useCtrlStateSSubscription,
} from "@/graphql/codegen/generated";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { useSubscribeState } from "../use-state-subscription";

vi.mock("@/graphql/codegen/generated", () => ({
  useCtrlStateQuery: vi.fn(),
  useCtrlStateSSubscription: vi.fn(),
}));

describe("useSubscribeState", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it("fetches initial state successfully from the query", () => {
    vi.mocked(useCtrlStateQuery).mockReturnValue({
      data: { value: { ctrl: { state: "initialized" } } },
      error: { value: undefined },
    } as any);
    vi.mocked(useCtrlStateSSubscription).mockReturnValue({
      data: { value: undefined },
      error: { value: undefined },
    } as any);

    const { state } = useSubscribeState();
    expect(state.value).toBe("initialized");
  });

  it("updates state from subscription", () => {
    const queryMock = vi.mocked(useCtrlStateQuery);
    const subscriptionMock = vi.mocked(useCtrlStateSSubscription);

    queryMock.mockReturnValue({
      data: { value: { ctrl: { state: "initial" } } },
      error: { value: undefined },
    } as any);

    subscriptionMock.mockReturnValue({
      data: { value: { ctrlState: "updated" } },
      error: { value: undefined },
    } as any);

    const { state } = useSubscribeState();
    expect(state.value).toBe("updated");
  });

  it("handles query error", () => {
    vi.mocked(useCtrlStateQuery).mockReturnValue({
      data: { value: undefined },
      error: { value: new Error("Query error") },
    } as any);
    vi.mocked(useCtrlStateSSubscription).mockReturnValue({
      data: { value: undefined },
      error: { value: undefined },
    } as any);

    const { state, error } = useSubscribeState();
    expect(state.value).toBeUndefined();
    expect(error.value).toEqual(new Error("Query error"));
  });

  it("handles subscription error", () => {
    vi.mocked(useCtrlStateQuery).mockReturnValue({
      data: { value: { ctrl: { state: "initial" } } },
      error: { value: undefined },
    } as any);
    vi.mocked(useCtrlStateSSubscription).mockReturnValue({
      data: { value: undefined },
      error: { value: new Error("Subscription error") },
    } as any);

    const { state, error } = useSubscribeState();
    expect(state.value).toBeUndefined();
    expect(error.value).toEqual(new Error("Subscription error"));
  });

  it("can be used as a promise", async () => {
    vi.mocked(useCtrlStateQuery).mockReturnValue({
      data: { value: { ctrl: { state: "promised" } } },
      error: { value: undefined },
      then: (resolve) => resolve({ data: { value: { ctrl: { state: "promised" } } } }),
    } as any);
    vi.mocked(useCtrlStateSSubscription).mockReturnValue({
      data: { value: undefined },
      error: { value: undefined },
    } as any);

    const result = await useSubscribeState();
    expect(result.state.value).toBe("promised");
  });

  it("handles empty responses", () => {
    vi.mocked(useCtrlStateQuery).mockReturnValue({
      data: { value: null },
      error: { value: undefined },
    } as any);
    vi.mocked(useCtrlStateSSubscription).mockReturnValue({
      data: { value: null },
      error: { value: undefined },
    } as any);

    const { state } = useSubscribeState();
    expect(state.value).toBeUndefined();
  });
});
