import { vi, expect } from "vitest";
import type { ComputedRef } from "vue";
import { useQuery, useSubscription } from "@urql/vue";
import type { UseQueryResponse, UseSubscriptionResponse } from "@urql/vue";
import fc from "fast-check";

import {
  mockUseQueryResponse,
  mockUseSubscriptionResponse,
  fcMockUseQueryResponseArg,
  fcMockUseSubscriptionResponseArg,
} from "@/graphql/tests";

interface _UseSubscribeXXXReturn<R> {
  data: ComputedRef<R | undefined>;
  error: ComputedRef<Error | undefined>;
  loading: ComputedRef<boolean>;
}

type UseSubscribeXXXReturn<R> = _UseSubscribeXXXReturn<R> &
  PromiseLike<_UseSubscribeXXXReturn<R>>;

export async function runPropertyTest<QueryData, SubData, R>(
  useSubscribeXXX: () => UseSubscribeXXXReturn<R>,
  mapQuery: (d: QueryData | undefined) => R | undefined,
  mapSub: (d: SubData | undefined) => R | undefined,
  fcQueryData: fc.Arbitrary<QueryData>,
  fcSubData: fc.Arbitrary<SubData>,
) {
  type QueryRes = UseQueryResponse<QueryData, any>;
  type SubRes = UseSubscriptionResponse<SubData, SubData, any>;

  const fcQueryArg = fcMockUseQueryResponseArg(fcQueryData);
  const fcSubArg = fcMockUseSubscriptionResponseArg(fcSubData);

  await fc.assert(
    fc.asyncProperty(fcQueryArg, fcSubArg, async (queryArg, subArg) => {
      // Mock useGenQuery()
      const queryRes = mockUseQueryResponse<QueryData>(queryArg);
      vi.mocked(useQuery<QueryData>).mockReturnValue(queryRes as QueryRes);

      // Mock useGenSub()
      const { response: subRes, issue } = mockUseSubscriptionResponse<SubData>(subArg);
      vi.mocked(useSubscription<SubData>).mockReturnValue(subRes as SubRes);

      const { data, error, loading, then } = useSubscribeXXX();

      // Assert loading and undefined values.
      expect(loading.value).toBe(true);
      expect(error.value).toBeUndefined();
      expect(data.value).toBeUndefined();

      // Wait until loading ends.
      await then();
      expect(loading.value).toBe(false);

      // Assert initial values are from query.
      expect(error.value).toBe(queryArg.error);
      expect(data.value).toStrictEqual(
        queryArg.error ? undefined : mapQuery(queryArg.data),
      );

      // Assert the subsequent values are issued from subscription backed up by query.
      for (const issued of issue) {
        const expectedError = issued.error || queryArg.error;
        const expectedData = expectedError
          ? undefined
          : (mapSub(issued.data) ?? mapQuery(queryArg.data));
        expect(error.value).toBe(expectedError);
        expect(data.value).toStrictEqual(expectedData);
      }
    }),
  );
}
