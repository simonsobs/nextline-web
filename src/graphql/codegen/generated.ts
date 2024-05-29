import gql from 'graphql-tag';
import * as Urql from '@urql/vue';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
};

export type AlertRdb = {
  __typename?: 'AlertRDB';
  version: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  ctrl: MutationCtrl;
  rdb: MutationRdb;
  schedule: MutationSchedule;
};

export type MutationCtrl = {
  __typename?: 'MutationCtrl';
  exec: Scalars['Boolean']['output'];
  interrupt: Scalars['Boolean']['output'];
  kill: Scalars['Boolean']['output'];
  loadExampleScript: Scalars['Boolean']['output'];
  reset: Scalars['Boolean']['output'];
  runAndContinue: Scalars['Boolean']['output'];
  sendPdbCommand: Scalars['Boolean']['output'];
  terminate: Scalars['Boolean']['output'];
};


export type MutationCtrlResetArgs = {
  statement?: InputMaybe<Scalars['String']['input']>;
};


export type MutationCtrlSendPdbCommandArgs = {
  command: Scalars['String']['input'];
  promptNo: Scalars['Int']['input'];
  traceNo: Scalars['Int']['input'];
};

export type MutationRdb = {
  __typename?: 'MutationRDB';
  deleteRuns: Array<Scalars['Int']['output']>;
};


export type MutationRdbDeleteRunsArgs = {
  ids: Array<Scalars['Int']['input']>;
};

export type MutationSchedule = {
  __typename?: 'MutationSchedule';
  autoMode: MutationScheduleAutoMode;
  queue: MutationScheduleQueue;
  scheduler: MutationScheduleScheduler;
};

export type MutationScheduleAutoMode = {
  __typename?: 'MutationScheduleAutoMode';
  changeMode: Scalars['Boolean']['output'];
  turnOff: Scalars['Boolean']['output'];
  turnOn: Scalars['Boolean']['output'];
};


export type MutationScheduleAutoModeChangeModeArgs = {
  mode: Scalars['String']['input'];
};

export type MutationScheduleQueue = {
  __typename?: 'MutationScheduleQueue';
  move: MutationScheduleQueueMove;
  push: ScheduleQueueItem;
  remove: Scalars['Boolean']['output'];
};


export type MutationScheduleQueuePushArgs = {
  input: ScheduleQueuePushInput;
};


export type MutationScheduleQueueRemoveArgs = {
  id: Scalars['Int']['input'];
};

export type MutationScheduleQueueMove = {
  __typename?: 'MutationScheduleQueueMove';
  oneBackward: Scalars['Boolean']['output'];
  oneForward: Scalars['Boolean']['output'];
  toFirst: Scalars['Boolean']['output'];
  toLast: Scalars['Boolean']['output'];
};


export type MutationScheduleQueueMoveOneBackwardArgs = {
  id: Scalars['Int']['input'];
};


export type MutationScheduleQueueMoveOneForwardArgs = {
  id: Scalars['Int']['input'];
};


export type MutationScheduleQueueMoveToFirstArgs = {
  id: Scalars['Int']['input'];
};


export type MutationScheduleQueueMoveToLastArgs = {
  id: Scalars['Int']['input'];
};

export type MutationScheduleScheduler = {
  __typename?: 'MutationScheduleScheduler';
  loadScript: Scalars['Boolean']['output'];
  update: Scalars['Boolean']['output'];
};


export type MutationScheduleSchedulerUpdateArgs = {
  input: MutationSchedulerUpdateInput;
};

export type MutationSchedulerUpdateInput = {
  apiUrl?: InputMaybe<Scalars['String']['input']>;
  lengthMinutes?: InputMaybe<Scalars['Int']['input']>;
  policy?: InputMaybe<Scalars['String']['input']>;
};

export type PageInfo = {
  __typename?: 'PageInfo';
  endCursor?: Maybe<Scalars['String']['output']>;
  hasNextPage: Scalars['Boolean']['output'];
  hasPreviousPage: Scalars['Boolean']['output'];
  startCursor?: Maybe<Scalars['String']['output']>;
};

export type PromptNode = {
  __typename?: 'PromptNode';
  command?: Maybe<Scalars['String']['output']>;
  endedAt?: Maybe<Scalars['DateTime']['output']>;
  event: Scalars['String']['output'];
  fileName?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  lineNo?: Maybe<Scalars['Int']['output']>;
  open: Scalars['Boolean']['output'];
  promptNo: Scalars['Int']['output'];
  run: RunNode;
  runNo: Scalars['Int']['output'];
  startedAt: Scalars['DateTime']['output'];
  stdout?: Maybe<Scalars['String']['output']>;
  trace: TraceNode;
  traceNo: Scalars['Int']['output'];
};

export type PromptNodeConnection = {
  __typename?: 'PromptNodeConnection';
  edges: Array<PromptNodeEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type PromptNodeEdge = {
  __typename?: 'PromptNodeEdge';
  cursor: Scalars['String']['output'];
  node: PromptNode;
};

export type PromptingData = {
  __typename?: 'PromptingData';
  fileName: Scalars['String']['output'];
  lineNo: Scalars['Int']['output'];
  prompting: Scalars['Int']['output'];
  traceEvent: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  alert: AlertRdb;
  ctrl: QueryCtrl;
  dev: QueryDev;
  history: QueryRdb;
  rdb: QueryRdb;
  schedule: QuerySchedule;
  settings: Scalars['String']['output'];
};

export type QueryCtrl = {
  __typename?: 'QueryCtrl';
  continuousEnabled: Scalars['Boolean']['output'];
  exception?: Maybe<Scalars['String']['output']>;
  hello: Scalars['String']['output'];
  runNo: Scalars['Int']['output'];
  source: Array<Scalars['String']['output']>;
  sourceLine: Scalars['String']['output'];
  state: Scalars['String']['output'];
  traceIds: Array<Scalars['Int']['output']>;
};


export type QueryCtrlSourceArgs = {
  fileName?: InputMaybe<Scalars['String']['input']>;
};


export type QueryCtrlSourceLineArgs = {
  fileName?: InputMaybe<Scalars['String']['input']>;
  lineNo: Scalars['Int']['input'];
};

export type QueryDev = {
  __typename?: 'QueryDev';
  headers: Scalars['String']['output'];
};

export type QueryRdb = {
  __typename?: 'QueryRDB';
  migrationVersion?: Maybe<Scalars['String']['output']>;
  prompts: PromptNodeConnection;
  run?: Maybe<RunNode>;
  runs: RunNodeConnection;
  stdouts: StdoutNodeConnection;
  traces: TraceNodeConnection;
  version: Scalars['String']['output'];
};


export type QueryRdbPromptsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryRdbRunArgs = {
  id?: InputMaybe<Scalars['Int']['input']>;
  runNo?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryRdbRunsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryRdbStdoutsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryRdbTracesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};

export type QuerySchedule = {
  __typename?: 'QuerySchedule';
  autoMode: QueryScheduleAutoMode;
  queue: QueryScheduleQueue;
  scheduler: QueryScheduleScheduler;
  version: Scalars['String']['output'];
};

export type QueryScheduleAutoMode = {
  __typename?: 'QueryScheduleAutoMode';
  mode: Scalars['String']['output'];
  state: Scalars['String']['output'];
};

export type QueryScheduleQueue = {
  __typename?: 'QueryScheduleQueue';
  items: Array<ScheduleQueueItem>;
};

export type QueryScheduleScheduler = {
  __typename?: 'QueryScheduleScheduler';
  apiUrl: Scalars['String']['output'];
  lengthMinutes: Scalars['Int']['output'];
  policy: Scalars['String']['output'];
};

export type RunNode = {
  __typename?: 'RunNode';
  endedAt?: Maybe<Scalars['DateTime']['output']>;
  exception?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  prompts: PromptNodeConnection;
  runNo: Scalars['Int']['output'];
  script?: Maybe<Scalars['String']['output']>;
  startedAt?: Maybe<Scalars['DateTime']['output']>;
  state?: Maybe<Scalars['String']['output']>;
  stdouts: StdoutNodeConnection;
  traces: TraceNodeConnection;
};


export type RunNodePromptsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};


export type RunNodeStdoutsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};


export type RunNodeTracesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};

export type RunNodeConnection = {
  __typename?: 'RunNodeConnection';
  edges: Array<RunNodeEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type RunNodeEdge = {
  __typename?: 'RunNodeEdge';
  cursor: Scalars['String']['output'];
  node: RunNode;
};

export type ScheduleQueueItem = {
  __typename?: 'ScheduleQueueItem';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  script: Scalars['String']['output'];
};

export type ScheduleQueuePushInput = {
  name: Scalars['String']['input'];
  script: Scalars['String']['input'];
};

export type StdoutNode = {
  __typename?: 'StdoutNode';
  id: Scalars['Int']['output'];
  run: RunNode;
  runNo: Scalars['Int']['output'];
  text?: Maybe<Scalars['String']['output']>;
  trace: TraceNode;
  traceNo: Scalars['Int']['output'];
  writtenAt?: Maybe<Scalars['DateTime']['output']>;
};

export type StdoutNodeConnection = {
  __typename?: 'StdoutNodeConnection';
  edges: Array<StdoutNodeEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type StdoutNodeEdge = {
  __typename?: 'StdoutNodeEdge';
  cursor: Scalars['String']['output'];
  node: StdoutNode;
};

export type Subscription = {
  __typename?: 'Subscription';
  ctrlContinuousEnabled: Scalars['Boolean']['output'];
  ctrlCounter: Scalars['Int']['output'];
  ctrlPrompting: PromptingData;
  ctrlRunNo: Scalars['Int']['output'];
  ctrlState: Scalars['String']['output'];
  ctrlStdout: Scalars['String']['output'];
  ctrlTraceIds: Array<Scalars['Int']['output']>;
  scheduleAutoModeMode: Scalars['String']['output'];
  scheduleAutoModeState: Scalars['String']['output'];
  scheduleQueueItems: Array<ScheduleQueueItem>;
};


export type SubscriptionCtrlPromptingArgs = {
  traceId: Scalars['Int']['input'];
};

export type TraceNode = {
  __typename?: 'TraceNode';
  endedAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['Int']['output'];
  prompts: PromptNodeConnection;
  run: RunNode;
  runNo: Scalars['Int']['output'];
  startedAt: Scalars['DateTime']['output'];
  state: Scalars['String']['output'];
  stdouts: StdoutNodeConnection;
  taskNo?: Maybe<Scalars['Int']['output']>;
  threadNo: Scalars['Int']['output'];
  traceNo: Scalars['Int']['output'];
};


export type TraceNodePromptsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};


export type TraceNodeStdoutsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};

export type TraceNodeConnection = {
  __typename?: 'TraceNodeConnection';
  edges: Array<TraceNodeEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type TraceNodeEdge = {
  __typename?: 'TraceNodeEdge';
  cursor: Scalars['String']['output'];
  node: TraceNode;
};

export type CtrlExecMutationVariables = Exact<{ [key: string]: never; }>;


export type CtrlExecMutation = { __typename?: 'Mutation', ctrl: { __typename?: 'MutationCtrl', exec: boolean } };

export type CtrlInterruptMutationVariables = Exact<{ [key: string]: never; }>;


export type CtrlInterruptMutation = { __typename?: 'Mutation', ctrl: { __typename?: 'MutationCtrl', interrupt: boolean } };

export type CtrlKillMutationVariables = Exact<{ [key: string]: never; }>;


export type CtrlKillMutation = { __typename?: 'Mutation', ctrl: { __typename?: 'MutationCtrl', kill: boolean } };

export type CtrlLoadExampleScriptMutationVariables = Exact<{ [key: string]: never; }>;


export type CtrlLoadExampleScriptMutation = { __typename?: 'Mutation', ctrl: { __typename?: 'MutationCtrl', loadExampleScript: boolean } };

export type CtrlResetMutationVariables = Exact<{
  statement?: InputMaybe<Scalars['String']['input']>;
}>;


export type CtrlResetMutation = { __typename?: 'Mutation', ctrl: { __typename?: 'MutationCtrl', reset: boolean } };

export type CtrlRunAndContinueMutationVariables = Exact<{ [key: string]: never; }>;


export type CtrlRunAndContinueMutation = { __typename?: 'Mutation', ctrl: { __typename?: 'MutationCtrl', runAndContinue: boolean } };

export type CtrlSendPdbCommandMutationVariables = Exact<{
  command: Scalars['String']['input'];
  promptNo: Scalars['Int']['input'];
  traceNo: Scalars['Int']['input'];
}>;


export type CtrlSendPdbCommandMutation = { __typename?: 'Mutation', ctrl: { __typename?: 'MutationCtrl', sendPdbCommand: boolean } };

export type CtrlTerminateMutationVariables = Exact<{ [key: string]: never; }>;


export type CtrlTerminateMutation = { __typename?: 'Mutation', ctrl: { __typename?: 'MutationCtrl', terminate: boolean } };

export type ScheduleAutoModeChangeModeMutationVariables = Exact<{
  mode: Scalars['String']['input'];
}>;


export type ScheduleAutoModeChangeModeMutation = { __typename?: 'Mutation', schedule: { __typename?: 'MutationSchedule', autoMode: { __typename?: 'MutationScheduleAutoMode', changeMode: boolean } } };

export type ScheduleAutoModeTurnOffMutationVariables = Exact<{ [key: string]: never; }>;


export type ScheduleAutoModeTurnOffMutation = { __typename?: 'Mutation', schedule: { __typename?: 'MutationSchedule', autoMode: { __typename?: 'MutationScheduleAutoMode', turnOff: boolean } } };

export type ScheduleAutoModeTurnOnMutationVariables = Exact<{ [key: string]: never; }>;


export type ScheduleAutoModeTurnOnMutation = { __typename?: 'Mutation', schedule: { __typename?: 'MutationSchedule', autoMode: { __typename?: 'MutationScheduleAutoMode', turnOn: boolean } } };

export type ScheduleQueuePushMutationVariables = Exact<{
  input: ScheduleQueuePushInput;
}>;


export type ScheduleQueuePushMutation = { __typename?: 'Mutation', schedule: { __typename?: 'MutationSchedule', queue: { __typename?: 'MutationScheduleQueue', push: { __typename?: 'ScheduleQueueItem', id: number, name: string, createdAt: any, script: string } } } };

export type ScheduleQueueRemoveMutationVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type ScheduleQueueRemoveMutation = { __typename?: 'Mutation', schedule: { __typename?: 'MutationSchedule', queue: { __typename?: 'MutationScheduleQueue', remove: boolean } } };

export type ScheduleQueueMoveOneBackwardMutationVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type ScheduleQueueMoveOneBackwardMutation = { __typename?: 'Mutation', schedule: { __typename?: 'MutationSchedule', queue: { __typename?: 'MutationScheduleQueue', move: { __typename?: 'MutationScheduleQueueMove', oneBackward: boolean } } } };

export type ScheduleQueueMoveOneForwardMutationVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type ScheduleQueueMoveOneForwardMutation = { __typename?: 'Mutation', schedule: { __typename?: 'MutationSchedule', queue: { __typename?: 'MutationScheduleQueue', move: { __typename?: 'MutationScheduleQueueMove', oneForward: boolean } } } };

export type ScheduleQueueMoveToFirstMutationVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type ScheduleQueueMoveToFirstMutation = { __typename?: 'Mutation', schedule: { __typename?: 'MutationSchedule', queue: { __typename?: 'MutationScheduleQueue', move: { __typename?: 'MutationScheduleQueueMove', toFirst: boolean } } } };

export type ScheduleQueueMoveToLastMutationVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type ScheduleQueueMoveToLastMutation = { __typename?: 'Mutation', schedule: { __typename?: 'MutationSchedule', queue: { __typename?: 'MutationScheduleQueue', move: { __typename?: 'MutationScheduleQueueMove', toLast: boolean } } } };

export type ScheduleSchedulerLoadScriptMutationVariables = Exact<{ [key: string]: never; }>;


export type ScheduleSchedulerLoadScriptMutation = { __typename?: 'Mutation', schedule: { __typename?: 'MutationSchedule', scheduler: { __typename?: 'MutationScheduleScheduler', loadScript: boolean } } };

export type CtrlContinuousEnabledQueryVariables = Exact<{ [key: string]: never; }>;


export type CtrlContinuousEnabledQuery = { __typename?: 'Query', ctrl: { __typename?: 'QueryCtrl', continuousEnabled: boolean } };

export type CtrlExceptionQueryVariables = Exact<{ [key: string]: never; }>;


export type CtrlExceptionQuery = { __typename?: 'Query', ctrl: { __typename?: 'QueryCtrl', exception?: string | null } };

export type CtrlRunNoQueryVariables = Exact<{ [key: string]: never; }>;


export type CtrlRunNoQuery = { __typename?: 'Query', ctrl: { __typename?: 'QueryCtrl', runNo: number } };

export type CtrlSourceQueryVariables = Exact<{
  fileName?: InputMaybe<Scalars['String']['input']>;
}>;


export type CtrlSourceQuery = { __typename?: 'Query', ctrl: { __typename?: 'QueryCtrl', source: Array<string> } };

export type CtrlStateQueryVariables = Exact<{ [key: string]: never; }>;


export type CtrlStateQuery = { __typename?: 'Query', ctrl: { __typename?: 'QueryCtrl', state: string } };

export type CtrlTraceIdsQueryVariables = Exact<{ [key: string]: never; }>;


export type CtrlTraceIdsQuery = { __typename?: 'Query', ctrl: { __typename?: 'QueryCtrl', traceIds: Array<number> } };

export type RdbRunQueryVariables = Exact<{
  runNo: Scalars['Int']['input'];
}>;


export type RdbRunQuery = { __typename?: 'Query', rdb: { __typename?: 'QueryRDB', run?: { __typename?: 'RunNode', id: number, runNo: number, state?: string | null, startedAt?: any | null, endedAt?: any | null, script?: string | null, exception?: string | null, stdouts: { __typename?: 'StdoutNodeConnection', edges: Array<{ __typename?: 'StdoutNodeEdge', node: { __typename?: 'StdoutNode', id: number, text?: string | null } }> } } | null } };

export type RdbRunsQueryVariables = Exact<{
  before?: InputMaybe<Scalars['String']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
}>;


export type RdbRunsQuery = { __typename?: 'Query', rdb: { __typename?: 'QueryRDB', runs: { __typename?: 'RunNodeConnection', totalCount: number, pageInfo: { __typename?: 'PageInfo', startCursor?: string | null, endCursor?: string | null, hasNextPage: boolean, hasPreviousPage: boolean }, edges: Array<{ __typename?: 'RunNodeEdge', cursor: string, node: { __typename?: 'RunNode', id: number, runNo: number, state?: string | null, startedAt?: any | null, endedAt?: any | null, script?: string | null, exception?: string | null } }> } } };

export type ScheduleAutoModeModeQueryVariables = Exact<{ [key: string]: never; }>;


export type ScheduleAutoModeModeQuery = { __typename?: 'Query', schedule: { __typename?: 'QuerySchedule', autoMode: { __typename?: 'QueryScheduleAutoMode', mode: string } } };

export type QScheduleAutoModeStateQueryVariables = Exact<{ [key: string]: never; }>;


export type QScheduleAutoModeStateQuery = { __typename?: 'Query', schedule: { __typename?: 'QuerySchedule', autoMode: { __typename?: 'QueryScheduleAutoMode', state: string } } };

export type ScheduleQueueItemsQueryVariables = Exact<{ [key: string]: never; }>;


export type ScheduleQueueItemsQuery = { __typename?: 'Query', schedule: { __typename?: 'QuerySchedule', queue: { __typename?: 'QueryScheduleQueue', items: Array<{ __typename?: 'ScheduleQueueItem', id: number, name: string, createdAt: any, script: string }> } } };

export type CtrlContinuousEnabledSSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type CtrlContinuousEnabledSSubscription = { __typename?: 'Subscription', ctrlContinuousEnabled: boolean };

export type CtrlCounterSSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type CtrlCounterSSubscription = { __typename?: 'Subscription', ctrlCounter: number };

export type CtrlPromptingSSubscriptionVariables = Exact<{
  traceId: Scalars['Int']['input'];
}>;


export type CtrlPromptingSSubscription = { __typename?: 'Subscription', ctrlPrompting: { __typename?: 'PromptingData', prompting: number, fileName: string, lineNo: number, traceEvent: string } };

export type CtrlRunNoSSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type CtrlRunNoSSubscription = { __typename?: 'Subscription', ctrlRunNo: number };

export type CtrlStateSSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type CtrlStateSSubscription = { __typename?: 'Subscription', ctrlState: string };

export type CtrlStdoutSSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type CtrlStdoutSSubscription = { __typename?: 'Subscription', ctrlStdout: string };

export type CtrlTraceIdsSSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type CtrlTraceIdsSSubscription = { __typename?: 'Subscription', ctrlTraceIds: Array<number> };

export type ScheduleAutoModeModeSSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type ScheduleAutoModeModeSSubscription = { __typename?: 'Subscription', scheduleAutoModeMode: string };

export type ScheduleAutoModeStateSSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type ScheduleAutoModeStateSSubscription = { __typename?: 'Subscription', scheduleAutoModeState: string };

export type ScheduleQueueItemsSSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type ScheduleQueueItemsSSubscription = { __typename?: 'Subscription', scheduleQueueItems: Array<{ __typename?: 'ScheduleQueueItem', id: number, name: string, createdAt: any, script: string }> };


export const CtrlExecDocument = gql`
    mutation CtrlExec {
  ctrl {
    exec
  }
}
    `;

export function useCtrlExecMutation() {
  return Urql.useMutation<CtrlExecMutation, CtrlExecMutationVariables>(CtrlExecDocument);
};
export const CtrlInterruptDocument = gql`
    mutation CtrlInterrupt {
  ctrl {
    interrupt
  }
}
    `;

export function useCtrlInterruptMutation() {
  return Urql.useMutation<CtrlInterruptMutation, CtrlInterruptMutationVariables>(CtrlInterruptDocument);
};
export const CtrlKillDocument = gql`
    mutation CtrlKill {
  ctrl {
    kill
  }
}
    `;

export function useCtrlKillMutation() {
  return Urql.useMutation<CtrlKillMutation, CtrlKillMutationVariables>(CtrlKillDocument);
};
export const CtrlLoadExampleScriptDocument = gql`
    mutation CtrlLoadExampleScript {
  ctrl {
    loadExampleScript
  }
}
    `;

export function useCtrlLoadExampleScriptMutation() {
  return Urql.useMutation<CtrlLoadExampleScriptMutation, CtrlLoadExampleScriptMutationVariables>(CtrlLoadExampleScriptDocument);
};
export const CtrlResetDocument = gql`
    mutation CtrlReset($statement: String) {
  ctrl {
    reset(statement: $statement)
  }
}
    `;

export function useCtrlResetMutation() {
  return Urql.useMutation<CtrlResetMutation, CtrlResetMutationVariables>(CtrlResetDocument);
};
export const CtrlRunAndContinueDocument = gql`
    mutation CtrlRunAndContinue {
  ctrl {
    runAndContinue
  }
}
    `;

export function useCtrlRunAndContinueMutation() {
  return Urql.useMutation<CtrlRunAndContinueMutation, CtrlRunAndContinueMutationVariables>(CtrlRunAndContinueDocument);
};
export const CtrlSendPdbCommandDocument = gql`
    mutation CtrlSendPdbCommand($command: String!, $promptNo: Int!, $traceNo: Int!) {
  ctrl {
    sendPdbCommand(command: $command, promptNo: $promptNo, traceNo: $traceNo)
  }
}
    `;

export function useCtrlSendPdbCommandMutation() {
  return Urql.useMutation<CtrlSendPdbCommandMutation, CtrlSendPdbCommandMutationVariables>(CtrlSendPdbCommandDocument);
};
export const CtrlTerminateDocument = gql`
    mutation CtrlTerminate {
  ctrl {
    terminate
  }
}
    `;

export function useCtrlTerminateMutation() {
  return Urql.useMutation<CtrlTerminateMutation, CtrlTerminateMutationVariables>(CtrlTerminateDocument);
};
export const ScheduleAutoModeChangeModeDocument = gql`
    mutation ScheduleAutoModeChangeMode($mode: String!) {
  schedule {
    autoMode {
      changeMode(mode: $mode)
    }
  }
}
    `;

export function useScheduleAutoModeChangeModeMutation() {
  return Urql.useMutation<ScheduleAutoModeChangeModeMutation, ScheduleAutoModeChangeModeMutationVariables>(ScheduleAutoModeChangeModeDocument);
};
export const ScheduleAutoModeTurnOffDocument = gql`
    mutation ScheduleAutoModeTurnOff {
  schedule {
    autoMode {
      turnOff
    }
  }
}
    `;

export function useScheduleAutoModeTurnOffMutation() {
  return Urql.useMutation<ScheduleAutoModeTurnOffMutation, ScheduleAutoModeTurnOffMutationVariables>(ScheduleAutoModeTurnOffDocument);
};
export const ScheduleAutoModeTurnOnDocument = gql`
    mutation ScheduleAutoModeTurnOn {
  schedule {
    autoMode {
      turnOn
    }
  }
}
    `;

export function useScheduleAutoModeTurnOnMutation() {
  return Urql.useMutation<ScheduleAutoModeTurnOnMutation, ScheduleAutoModeTurnOnMutationVariables>(ScheduleAutoModeTurnOnDocument);
};
export const ScheduleQueuePushDocument = gql`
    mutation ScheduleQueuePush($input: ScheduleQueuePushInput!) {
  schedule {
    queue {
      push(input: $input) {
        id
        name
        createdAt
        script
      }
    }
  }
}
    `;

export function useScheduleQueuePushMutation() {
  return Urql.useMutation<ScheduleQueuePushMutation, ScheduleQueuePushMutationVariables>(ScheduleQueuePushDocument);
};
export const ScheduleQueueRemoveDocument = gql`
    mutation ScheduleQueueRemove($id: Int!) {
  schedule {
    queue {
      remove(id: $id)
    }
  }
}
    `;

export function useScheduleQueueRemoveMutation() {
  return Urql.useMutation<ScheduleQueueRemoveMutation, ScheduleQueueRemoveMutationVariables>(ScheduleQueueRemoveDocument);
};
export const ScheduleQueueMoveOneBackwardDocument = gql`
    mutation ScheduleQueueMoveOneBackward($id: Int!) {
  schedule {
    queue {
      move {
        oneBackward(id: $id)
      }
    }
  }
}
    `;

export function useScheduleQueueMoveOneBackwardMutation() {
  return Urql.useMutation<ScheduleQueueMoveOneBackwardMutation, ScheduleQueueMoveOneBackwardMutationVariables>(ScheduleQueueMoveOneBackwardDocument);
};
export const ScheduleQueueMoveOneForwardDocument = gql`
    mutation ScheduleQueueMoveOneForward($id: Int!) {
  schedule {
    queue {
      move {
        oneForward(id: $id)
      }
    }
  }
}
    `;

export function useScheduleQueueMoveOneForwardMutation() {
  return Urql.useMutation<ScheduleQueueMoveOneForwardMutation, ScheduleQueueMoveOneForwardMutationVariables>(ScheduleQueueMoveOneForwardDocument);
};
export const ScheduleQueueMoveToFirstDocument = gql`
    mutation ScheduleQueueMoveToFirst($id: Int!) {
  schedule {
    queue {
      move {
        toFirst(id: $id)
      }
    }
  }
}
    `;

export function useScheduleQueueMoveToFirstMutation() {
  return Urql.useMutation<ScheduleQueueMoveToFirstMutation, ScheduleQueueMoveToFirstMutationVariables>(ScheduleQueueMoveToFirstDocument);
};
export const ScheduleQueueMoveToLastDocument = gql`
    mutation ScheduleQueueMoveToLast($id: Int!) {
  schedule {
    queue {
      move {
        toLast(id: $id)
      }
    }
  }
}
    `;

export function useScheduleQueueMoveToLastMutation() {
  return Urql.useMutation<ScheduleQueueMoveToLastMutation, ScheduleQueueMoveToLastMutationVariables>(ScheduleQueueMoveToLastDocument);
};
export const ScheduleSchedulerLoadScriptDocument = gql`
    mutation ScheduleSchedulerLoadScript {
  schedule {
    scheduler {
      loadScript
    }
  }
}
    `;

export function useScheduleSchedulerLoadScriptMutation() {
  return Urql.useMutation<ScheduleSchedulerLoadScriptMutation, ScheduleSchedulerLoadScriptMutationVariables>(ScheduleSchedulerLoadScriptDocument);
};
export const CtrlContinuousEnabledDocument = gql`
    query CtrlContinuousEnabled {
  ctrl {
    continuousEnabled
  }
}
    `;

export function useCtrlContinuousEnabledQuery(options: Omit<Urql.UseQueryArgs<never, CtrlContinuousEnabledQueryVariables>, 'query'>) {
  return Urql.useQuery<CtrlContinuousEnabledQuery, CtrlContinuousEnabledQueryVariables>({ query: CtrlContinuousEnabledDocument, ...options });
};
export const CtrlExceptionDocument = gql`
    query CtrlException {
  ctrl {
    exception
  }
}
    `;

export function useCtrlExceptionQuery(options: Omit<Urql.UseQueryArgs<never, CtrlExceptionQueryVariables>, 'query'>) {
  return Urql.useQuery<CtrlExceptionQuery, CtrlExceptionQueryVariables>({ query: CtrlExceptionDocument, ...options });
};
export const CtrlRunNoDocument = gql`
    query CtrlRunNo {
  ctrl {
    runNo
  }
}
    `;

export function useCtrlRunNoQuery(options: Omit<Urql.UseQueryArgs<never, CtrlRunNoQueryVariables>, 'query'>) {
  return Urql.useQuery<CtrlRunNoQuery, CtrlRunNoQueryVariables>({ query: CtrlRunNoDocument, ...options });
};
export const CtrlSourceDocument = gql`
    query CtrlSource($fileName: String) {
  ctrl {
    source(fileName: $fileName)
  }
}
    `;

export function useCtrlSourceQuery(options: Omit<Urql.UseQueryArgs<never, CtrlSourceQueryVariables>, 'query'>) {
  return Urql.useQuery<CtrlSourceQuery, CtrlSourceQueryVariables>({ query: CtrlSourceDocument, ...options });
};
export const CtrlStateDocument = gql`
    query CtrlState {
  ctrl {
    state
  }
}
    `;

export function useCtrlStateQuery(options: Omit<Urql.UseQueryArgs<never, CtrlStateQueryVariables>, 'query'>) {
  return Urql.useQuery<CtrlStateQuery, CtrlStateQueryVariables>({ query: CtrlStateDocument, ...options });
};
export const CtrlTraceIdsDocument = gql`
    query CtrlTraceIds {
  ctrl {
    traceIds
  }
}
    `;

export function useCtrlTraceIdsQuery(options: Omit<Urql.UseQueryArgs<never, CtrlTraceIdsQueryVariables>, 'query'>) {
  return Urql.useQuery<CtrlTraceIdsQuery, CtrlTraceIdsQueryVariables>({ query: CtrlTraceIdsDocument, ...options });
};
export const RdbRunDocument = gql`
    query RdbRun($runNo: Int!) {
  rdb {
    run(runNo: $runNo) {
      id
      runNo
      state
      startedAt
      endedAt
      script
      exception
      stdouts {
        edges {
          node {
            id
            text
          }
        }
      }
    }
  }
}
    `;

export function useRdbRunQuery(options: Omit<Urql.UseQueryArgs<never, RdbRunQueryVariables>, 'query'>) {
  return Urql.useQuery<RdbRunQuery, RdbRunQueryVariables>({ query: RdbRunDocument, ...options });
};
export const RdbRunsDocument = gql`
    query RdbRuns($before: String, $after: String, $first: Int, $last: Int) {
  rdb {
    runs(before: $before, after: $after, first: $first, last: $last) {
      pageInfo {
        startCursor
        endCursor
        hasNextPage
        hasPreviousPage
      }
      totalCount
      edges {
        cursor
        node {
          id
          runNo
          state
          startedAt
          endedAt
          script
          exception
        }
      }
    }
  }
}
    `;

export function useRdbRunsQuery(options: Omit<Urql.UseQueryArgs<never, RdbRunsQueryVariables>, 'query'>) {
  return Urql.useQuery<RdbRunsQuery, RdbRunsQueryVariables>({ query: RdbRunsDocument, ...options });
};
export const ScheduleAutoModeModeDocument = gql`
    query ScheduleAutoModeMode {
  schedule {
    autoMode {
      mode
    }
  }
}
    `;

export function useScheduleAutoModeModeQuery(options: Omit<Urql.UseQueryArgs<never, ScheduleAutoModeModeQueryVariables>, 'query'>) {
  return Urql.useQuery<ScheduleAutoModeModeQuery, ScheduleAutoModeModeQueryVariables>({ query: ScheduleAutoModeModeDocument, ...options });
};
export const QScheduleAutoModeStateDocument = gql`
    query QScheduleAutoModeState {
  schedule {
    autoMode {
      state
    }
  }
}
    `;

export function useQScheduleAutoModeStateQuery(options: Omit<Urql.UseQueryArgs<never, QScheduleAutoModeStateQueryVariables>, 'query'>) {
  return Urql.useQuery<QScheduleAutoModeStateQuery, QScheduleAutoModeStateQueryVariables>({ query: QScheduleAutoModeStateDocument, ...options });
};
export const ScheduleQueueItemsDocument = gql`
    query ScheduleQueueItems {
  schedule {
    queue {
      items {
        id
        name
        createdAt
        script
      }
    }
  }
}
    `;

export function useScheduleQueueItemsQuery(options: Omit<Urql.UseQueryArgs<never, ScheduleQueueItemsQueryVariables>, 'query'>) {
  return Urql.useQuery<ScheduleQueueItemsQuery, ScheduleQueueItemsQueryVariables>({ query: ScheduleQueueItemsDocument, ...options });
};
export const CtrlContinuousEnabledSDocument = gql`
    subscription CtrlContinuousEnabledS {
  ctrlContinuousEnabled
}
    `;

export function useCtrlContinuousEnabledSSubscription<R = CtrlContinuousEnabledSSubscription>(options: Omit<Urql.UseSubscriptionArgs<never, CtrlContinuousEnabledSSubscriptionVariables>, 'query'>, handler?: Urql.SubscriptionHandlerArg<CtrlContinuousEnabledSSubscription, R>) {
  return Urql.useSubscription<CtrlContinuousEnabledSSubscription, R, CtrlContinuousEnabledSSubscriptionVariables>({ query: CtrlContinuousEnabledSDocument, ...options }, handler);
};
export const CtrlCounterSDocument = gql`
    subscription CtrlCounterS {
  ctrlCounter
}
    `;

export function useCtrlCounterSSubscription<R = CtrlCounterSSubscription>(options: Omit<Urql.UseSubscriptionArgs<never, CtrlCounterSSubscriptionVariables>, 'query'>, handler?: Urql.SubscriptionHandlerArg<CtrlCounterSSubscription, R>) {
  return Urql.useSubscription<CtrlCounterSSubscription, R, CtrlCounterSSubscriptionVariables>({ query: CtrlCounterSDocument, ...options }, handler);
};
export const CtrlPromptingSDocument = gql`
    subscription CtrlPromptingS($traceId: Int!) {
  ctrlPrompting(traceId: $traceId) {
    prompting
    fileName
    lineNo
    traceEvent
  }
}
    `;

export function useCtrlPromptingSSubscription<R = CtrlPromptingSSubscription>(options: Omit<Urql.UseSubscriptionArgs<never, CtrlPromptingSSubscriptionVariables>, 'query'>, handler?: Urql.SubscriptionHandlerArg<CtrlPromptingSSubscription, R>) {
  return Urql.useSubscription<CtrlPromptingSSubscription, R, CtrlPromptingSSubscriptionVariables>({ query: CtrlPromptingSDocument, ...options }, handler);
};
export const CtrlRunNoSDocument = gql`
    subscription CtrlRunNoS {
  ctrlRunNo
}
    `;

export function useCtrlRunNoSSubscription<R = CtrlRunNoSSubscription>(options: Omit<Urql.UseSubscriptionArgs<never, CtrlRunNoSSubscriptionVariables>, 'query'>, handler?: Urql.SubscriptionHandlerArg<CtrlRunNoSSubscription, R>) {
  return Urql.useSubscription<CtrlRunNoSSubscription, R, CtrlRunNoSSubscriptionVariables>({ query: CtrlRunNoSDocument, ...options }, handler);
};
export const CtrlStateSDocument = gql`
    subscription CtrlStateS {
  ctrlState
}
    `;

export function useCtrlStateSSubscription<R = CtrlStateSSubscription>(options: Omit<Urql.UseSubscriptionArgs<never, CtrlStateSSubscriptionVariables>, 'query'>, handler?: Urql.SubscriptionHandlerArg<CtrlStateSSubscription, R>) {
  return Urql.useSubscription<CtrlStateSSubscription, R, CtrlStateSSubscriptionVariables>({ query: CtrlStateSDocument, ...options }, handler);
};
export const CtrlStdoutSDocument = gql`
    subscription CtrlStdoutS {
  ctrlStdout
}
    `;

export function useCtrlStdoutSSubscription<R = CtrlStdoutSSubscription>(options: Omit<Urql.UseSubscriptionArgs<never, CtrlStdoutSSubscriptionVariables>, 'query'>, handler?: Urql.SubscriptionHandlerArg<CtrlStdoutSSubscription, R>) {
  return Urql.useSubscription<CtrlStdoutSSubscription, R, CtrlStdoutSSubscriptionVariables>({ query: CtrlStdoutSDocument, ...options }, handler);
};
export const CtrlTraceIdsSDocument = gql`
    subscription CtrlTraceIdsS {
  ctrlTraceIds
}
    `;

export function useCtrlTraceIdsSSubscription<R = CtrlTraceIdsSSubscription>(options: Omit<Urql.UseSubscriptionArgs<never, CtrlTraceIdsSSubscriptionVariables>, 'query'>, handler?: Urql.SubscriptionHandlerArg<CtrlTraceIdsSSubscription, R>) {
  return Urql.useSubscription<CtrlTraceIdsSSubscription, R, CtrlTraceIdsSSubscriptionVariables>({ query: CtrlTraceIdsSDocument, ...options }, handler);
};
export const ScheduleAutoModeModeSDocument = gql`
    subscription ScheduleAutoModeModeS {
  scheduleAutoModeMode
}
    `;

export function useScheduleAutoModeModeSSubscription<R = ScheduleAutoModeModeSSubscription>(options: Omit<Urql.UseSubscriptionArgs<never, ScheduleAutoModeModeSSubscriptionVariables>, 'query'>, handler?: Urql.SubscriptionHandlerArg<ScheduleAutoModeModeSSubscription, R>) {
  return Urql.useSubscription<ScheduleAutoModeModeSSubscription, R, ScheduleAutoModeModeSSubscriptionVariables>({ query: ScheduleAutoModeModeSDocument, ...options }, handler);
};
export const ScheduleAutoModeStateSDocument = gql`
    subscription ScheduleAutoModeStateS {
  scheduleAutoModeState
}
    `;

export function useScheduleAutoModeStateSSubscription<R = ScheduleAutoModeStateSSubscription>(options: Omit<Urql.UseSubscriptionArgs<never, ScheduleAutoModeStateSSubscriptionVariables>, 'query'>, handler?: Urql.SubscriptionHandlerArg<ScheduleAutoModeStateSSubscription, R>) {
  return Urql.useSubscription<ScheduleAutoModeStateSSubscription, R, ScheduleAutoModeStateSSubscriptionVariables>({ query: ScheduleAutoModeStateSDocument, ...options }, handler);
};
export const ScheduleQueueItemsSDocument = gql`
    subscription ScheduleQueueItemsS {
  scheduleQueueItems {
    id
    name
    createdAt
    script
  }
}
    `;

export function useScheduleQueueItemsSSubscription<R = ScheduleQueueItemsSSubscription>(options: Omit<Urql.UseSubscriptionArgs<never, ScheduleQueueItemsSSubscriptionVariables>, 'query'>, handler?: Urql.SubscriptionHandlerArg<ScheduleQueueItemsSSubscription, R>) {
  return Urql.useSubscription<ScheduleQueueItemsSSubscription, R, ScheduleQueueItemsSSubscriptionVariables>({ query: ScheduleQueueItemsSDocument, ...options }, handler);
};