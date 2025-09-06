import { it, vi } from "vitest";
import fc from "fast-check";

import type {
  CtrlStateQuery,
  CtrlStateSSubscription,
  CtrlRunNoQuery,
  CtrlRunNoSSubscription,
} from "@/graphql/codegen/generated";

import { useSubscribeRunNo } from "../use-run-no-subscription";
import { useSubscribeState } from "../use-state-subscription";

import { runPropertyTest } from "./run-property-test";

// Mock functions used in runPropertyTest()
vi.mock("@urql/vue", () => ({
  useQuery: vi.fn(),
  useSubscription: vi.fn(),
}));

it("useSubscribeState", async () => {
  type QueryData = CtrlStateQuery;
  type SubData = CtrlStateSSubscription;

  const mapQuery = (d: QueryData | undefined) => d?.ctrl.state;
  const mapSub = (d: SubData | undefined) => d?.ctrlState;

  const fcCtrlState = fc.string();
  const fcQueryData: fc.Arbitrary<QueryData> = fc.record({
    ctrl: fc.record({ state: fcCtrlState }),
  });
  const fcSubData: fc.Arbitrary<SubData> = fc.record({ ctrlState: fcCtrlState });

  await runPropertyTest(useSubscribeState, mapQuery, mapSub, fcQueryData, fcSubData);
});

it("useSubscribeRunNo", async () => {
  type QueryData = CtrlRunNoQuery;
  type SubData = CtrlRunNoSSubscription;

  const mapQuery = (d: QueryData | undefined) => d?.ctrl.runNo;
  const mapSub = (d: SubData | undefined) => d?.ctrlRunNo;

  const fcCtrlRunNo = fc.integer();
  const fcQueryData: fc.Arbitrary<QueryData> = fc.record({
    ctrl: fc.record({ runNo: fcCtrlRunNo }),
  });
  const fcSubData: fc.Arbitrary<SubData> = fc.record({ ctrlRunNo: fcCtrlRunNo });

  await runPropertyTest(useSubscribeRunNo, mapQuery, mapSub, fcQueryData, fcSubData);
});
