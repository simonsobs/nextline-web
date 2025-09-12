import { it, vi } from "vitest";
import fc from "fast-check";

import type {
  CtrlStateQuery,
  CtrlStateSSubscription,
  CtrlRunNoQuery,
  CtrlRunNoSSubscription,
  CtrlTraceIdsQuery,
  CtrlTraceIdsSSubscription,
  CtrlContinuousEnabledQuery,
  CtrlContinuousEnabledSSubscription,
  ScheduleAutoModeModeQuery,
  QScheduleAutoModeStateQuery,
  ScheduleAutoModeStateSSubscription,
  ScheduleAutoModeModeSSubscription,
  ScheduleQueueItemsQuery,
  ScheduleQueueItemsSSubscription,
} from "@/graphql/codegen/generated";
import { fcScheduleQueueItem } from "@/graphql/tests/arbitraries";

import { useSubscribeContinuousEnabled } from "../use-continuous-enabled-subscription";
import { useSubscribeRunNo } from "../use-run-no-subscription";
import { useSubscribeScheduleAutoModeMode } from "../use-schedule-auto-mode-mode-subscription";
import { useSubscribeScheduleAutoModeState } from "../use-schedule-auto-mode-state-subscription";
import { useSubscribeScheduleQueueItems } from "../use-schedule-queue-items-subscription";
import { useSubscribeState } from "../use-state-subscription";
import { useSubscribeTraceIds } from "../use-trace_ids-subscription";

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

it("useSubscribeTraceIds", async () => {
  type QueryData = CtrlTraceIdsQuery;
  type SubData = CtrlTraceIdsSSubscription;

  const mapQuery = (d: QueryData | undefined) => d?.ctrl.traceIds;
  const mapSub = (d: SubData | undefined) => d?.ctrlTraceIds;

  const fcTraceIds = fc.array(fc.integer());
  const fcQueryData: fc.Arbitrary<QueryData> = fc.record({
    ctrl: fc.record({ traceIds: fcTraceIds }),
  });
  const fcSubData: fc.Arbitrary<SubData> = fc.record({
    ctrlTraceIds: fcTraceIds,
  });

  await runPropertyTest(useSubscribeTraceIds, mapQuery, mapSub, fcQueryData, fcSubData);
});

it("useSubscribeContinuousEnabled", async () => {
  type QueryData = CtrlContinuousEnabledQuery;
  type SubData = CtrlContinuousEnabledSSubscription;

  const mapQuery = (d: QueryData | undefined) => d?.ctrl.continuousEnabled;
  const mapSub = (d: SubData | undefined) => d?.ctrlContinuousEnabled;

  const fcContinuousEnabled = fc.boolean();
  const fcQueryData: fc.Arbitrary<QueryData> = fc.record({
    ctrl: fc.record({ continuousEnabled: fcContinuousEnabled }),
  });
  const fcSubData: fc.Arbitrary<SubData> = fc.record({
    ctrlContinuousEnabled: fcContinuousEnabled,
  });

  await runPropertyTest(
    useSubscribeContinuousEnabled,
    mapQuery,
    mapSub,
    fcQueryData,
    fcSubData,
  );
});

it("useSubscribeScheduleAutoModeMode", async () => {
  type QueryData = ScheduleAutoModeModeQuery;
  type SubData = ScheduleAutoModeModeSSubscription;

  const mapQuery = (d: QueryData | undefined) => d?.schedule.autoMode.mode;
  const mapSub = (d: SubData | undefined) => d?.scheduleAutoModeMode;

  const fcScheduleAutoMode = fc.string();
  const fcQueryData: fc.Arbitrary<QueryData> = fc.record({
    schedule: fc.record({ autoMode: fc.record({ mode: fcScheduleAutoMode }) }),
  });
  const fcSubData: fc.Arbitrary<SubData> = fc.record({
    scheduleAutoModeMode: fcScheduleAutoMode,
  });

  await runPropertyTest(
    useSubscribeScheduleAutoModeMode,
    mapQuery,
    mapSub,
    fcQueryData,
    fcSubData,
  );
});

it("useSubscribeScheduleAutoModeState", async () => {
  type QueryData = QScheduleAutoModeStateQuery;
  type SubData = ScheduleAutoModeStateSSubscription;

  const mapQuery = (d: QueryData | undefined) => d?.schedule.autoMode.state;
  const mapSub = (d: SubData | undefined) => d?.scheduleAutoModeState;

  const fcScheduleAutoModeState = fc.string();
  const fcQueryData: fc.Arbitrary<QueryData> = fc.record({
    schedule: fc.record({ autoMode: fc.record({ state: fcScheduleAutoModeState }) }),
  });
  const fcSubData: fc.Arbitrary<SubData> = fc.record({
    scheduleAutoModeState: fcScheduleAutoModeState,
  });

  await runPropertyTest(
    useSubscribeScheduleAutoModeState,
    mapQuery,
    mapSub,
    fcQueryData,
    fcSubData,
  );
});

it("useSubscribeScheduleQueueItems", async () => {
  type QueryData = ScheduleQueueItemsQuery;
  type SubData = ScheduleQueueItemsSSubscription;

  const mapQuery = (d: QueryData | undefined) => d?.schedule.queue.items;
  const mapSub = (d: SubData | undefined) => d?.scheduleQueueItems;

  const fcQueryData: fc.Arbitrary<QueryData> = fc.record({
    schedule: fc.record({
      queue: fc.record({ items: fc.array(fcScheduleQueueItem) }),
    }),
  });
  const fcSubData: fc.Arbitrary<SubData> = fc.record({
    scheduleQueueItems: fc.array(fcScheduleQueueItem),
  });

  await runPropertyTest(
    useSubscribeScheduleQueueItems,
    mapQuery,
    mapSub,
    fcQueryData,
    fcSubData,
  );
});
