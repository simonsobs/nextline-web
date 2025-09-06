import { it, vi } from "vitest";
import fc from "fast-check";

import type {
  CtrlRunNoQuery,
  CtrlRunNoSSubscription,
} from "@/graphql/codegen/generated";

import { useSubscribeRunNo } from "../use-run-no-subscription";

import { runPropertyTest } from "./run-property-test";

// Mock functions used in runPropertyTest()
vi.mock("@urql/vue", () => ({
  useQuery: vi.fn(),
  useSubscription: vi.fn(),
}));

type QueryData = CtrlRunNoQuery;
type SubData = CtrlRunNoSSubscription;

const mapQuery = (d: QueryData | undefined) => d?.ctrl.runNo;
const mapSub = (d: SubData | undefined) => d?.ctrlRunNo;

const fcCtrlRunNo = fc.integer();
const fcQueryData: fc.Arbitrary<QueryData> = fc.record({
  ctrl: fc.record({ runNo: fcCtrlRunNo }),
});
const fcSubData: fc.Arbitrary<SubData> = fc.record({ ctrlRunNo: fcCtrlRunNo });

it("useSubscribeRunNo", async () => {
  await runPropertyTest(useSubscribeRunNo, mapQuery, mapSub, fcQueryData, fcSubData);
});
