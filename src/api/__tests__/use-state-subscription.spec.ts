import { it, vi } from "vitest";
import fc from "fast-check";

import type {
  CtrlStateQuery,
  CtrlStateSSubscription,
} from "@/graphql/codegen/generated";

import { useSubscribeState } from "../use-state-subscription";

import { runPropertyTest } from "./run-property-test";

// Mock functions used in runPropertyTest()
vi.mock("@urql/vue", () => ({
  useQuery: vi.fn(),
  useSubscription: vi.fn(),
}));

type QueryData = CtrlStateQuery;
type SubData = CtrlStateSSubscription;

const mapQuery = (d: QueryData | undefined) => d?.ctrl.state;
const mapSub = (d: SubData | undefined) => d?.ctrlState;

const fcCtrlState = fc.string();
const fcQueryData: fc.Arbitrary<QueryData> = fc.record({
  ctrl: fc.record({ state: fcCtrlState }),
});
const fcSubData: fc.Arbitrary<SubData> = fc.record({ ctrlState: fcCtrlState });

it("useSubscribeState", async () => {
  await runPropertyTest(useSubscribeState, mapQuery, mapSub, fcQueryData, fcSubData);
});
