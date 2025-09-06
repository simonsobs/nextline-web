import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { useQuery, useSubscription } from "@urql/vue";
import type { UseQueryResponse, UseSubscriptionResponse } from "@urql/vue";
import fc from "fast-check";

import type {
  CtrlStateQuery,
  CtrlStateSSubscription,
} from "@/graphql/codegen/generated";

import { useSubscribeState } from "../use-state-subscription";

import { fcMockUseQueryResponseArg, fcMockUseSubscriptionResponseArg } from "./fc";
import { mockUseQueryResponse } from "./mock-use-query-response";
import { mockUseSubscriptionResponse } from "./mock-use-subscription-response";

vi.mock("@urql/vue", () => ({
  useQuery: vi.fn(),
  useSubscription: vi.fn(),
}));

const useSubscribeXXX = useSubscribeState;

type QueryData = CtrlStateQuery;
type SubData = CtrlStateSSubscription;

const mapQuery = (d: QueryData | undefined) => d?.ctrl.state;
const mapSub = (d: SubData | undefined) => d?.ctrlState;

const fcCtrlState = fc.string();
const fcQueryData: fc.Arbitrary<QueryData> = fc.record({
  ctrl: fc.record({ state: fcCtrlState }),
});
const fcSubData: fc.Arbitrary<SubData> = fc.record({ ctrlState: fcCtrlState });

type QueryRes = UseQueryResponse<QueryData, any>;
type SubRes = UseSubscriptionResponse<SubData, SubData, any>;

const fcQueryArg = fcMockUseQueryResponseArg(fcQueryData);
const fcSubArg = fcMockUseSubscriptionResponseArg(fcSubData);

describe("useSubscribeXXX()", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it("Property test", async () => {
    await fc.assert(
      fc.asyncProperty(fcQueryArg, fcSubArg, async (queryArg, subArg) => {
        // Mock useGenQuery()
        const queryRes = mockUseQueryResponse<QueryData>(queryArg);
        vi.mocked(useQuery<QueryData>).mockReturnValue(queryRes as QueryRes);

        // Mock useGenSub()
        const { response: subRes, issue } =
          mockUseSubscriptionResponse<SubData>(subArg);
        vi.mocked(useSubscription<SubData>).mockReturnValue(subRes as SubRes);

        const { data, error } = await useSubscribeXXX();

        // Assert initial values are from query.
        expect(error.value).toBe(queryArg.error);
        expect(data.value).toBe(queryArg.error ? undefined : mapQuery(queryArg.data));

        // Assert the subsequent values are issued from subscription backed up by query.
        for (const issued of issue) {
          const expectedError = issued.error || queryArg.error;
          const expectedData = expectedError
            ? undefined
            : (mapSub(issued.data) ?? mapQuery(queryArg.data));
          expect(error.value).toBe(expectedError);
          expect(data.value).toBe(expectedData);
        }
      }),
    );
  });
});
