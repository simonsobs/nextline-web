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
  exec: Scalars['Boolean']['output'];
  interrupt: Scalars['Boolean']['output'];
  kill: Scalars['Boolean']['output'];
  rdb: MutationRdb;
  reset: Scalars['Boolean']['output'];
  runAndContinue: Scalars['Boolean']['output'];
  schedule: MutationSchedule;
  sendPdbCommand: Scalars['Boolean']['output'];
  terminate: Scalars['Boolean']['output'];
};


export type MutationResetArgs = {
  statement?: InputMaybe<Scalars['String']['input']>;
};


export type MutationSendPdbCommandArgs = {
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
  loadScript: Scalars['Boolean']['output'];
  queue: MutationScheduleQueue;
  scheduler: MutationScheduler;
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
  push: ScheduleQueueItem;
  remove: Scalars['Boolean']['output'];
};


export type MutationScheduleQueuePushArgs = {
  input: ScheduleQueuePushInput;
};


export type MutationScheduleQueueRemoveArgs = {
  id: Scalars['Int']['input'];
};

export type MutationScheduler = {
  __typename?: 'MutationScheduler';
  update: Scalars['Boolean']['output'];
};


export type MutationSchedulerUpdateArgs = {
  input: MutationSchedulerInput;
};

export type MutationSchedulerInput = {
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
  continuousEnabled: Scalars['Boolean']['output'];
  dev: QueryDev;
  exception?: Maybe<Scalars['String']['output']>;
  hello: Scalars['String']['output'];
  history: QueryRdb;
  rdb: QueryRdb;
  runNo: Scalars['Int']['output'];
  schedule: QuerySchedule;
  settings: Scalars['String']['output'];
  source: Array<Scalars['String']['output']>;
  sourceLine: Scalars['String']['output'];
  state: Scalars['String']['output'];
  traceIds: Array<Scalars['Int']['output']>;
};


export type QuerySourceArgs = {
  fileName?: InputMaybe<Scalars['String']['input']>;
};


export type QuerySourceLineArgs = {
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
  scheduler: QueryScheduler;
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

export type QueryScheduler = {
  __typename?: 'QueryScheduler';
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
  continuousEnabled: Scalars['Boolean']['output'];
  counter: Scalars['Int']['output'];
  prompting: PromptingData;
  runNo: Scalars['Int']['output'];
  scheduleAutoModeMode: Scalars['String']['output'];
  scheduleAutoModeState: Scalars['String']['output'];
  scheduleQueueItems: Array<ScheduleQueueItem>;
  state: Scalars['String']['output'];
  stdout: Scalars['String']['output'];
  traceIds: Array<Scalars['Int']['output']>;
};


export type SubscriptionPromptingArgs = {
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

export type AutoModeTurnOffMutationVariables = Exact<{ [key: string]: never; }>;


export type AutoModeTurnOffMutation = { __typename?: 'Mutation', schedule: { __typename?: 'MutationSchedule', autoMode: { __typename?: 'MutationScheduleAutoMode', turnOff: boolean } } };

export type AutoModeTurnOnMutationVariables = Exact<{ [key: string]: never; }>;


export type AutoModeTurnOnMutation = { __typename?: 'Mutation', schedule: { __typename?: 'MutationSchedule', autoMode: { __typename?: 'MutationScheduleAutoMode', turnOn: boolean } } };

export type ExecMutationVariables = Exact<{ [key: string]: never; }>;


export type ExecMutation = { __typename?: 'Mutation', exec: boolean };

export type InterruptMutationVariables = Exact<{ [key: string]: never; }>;


export type InterruptMutation = { __typename?: 'Mutation', interrupt: boolean };

export type KillMutationVariables = Exact<{ [key: string]: never; }>;


export type KillMutation = { __typename?: 'Mutation', kill: boolean };

export type LoadScriptMutationVariables = Exact<{ [key: string]: never; }>;


export type LoadScriptMutation = { __typename?: 'Mutation', schedule: { __typename?: 'MutationSchedule', loadScript: boolean } };

export type ResetMutationVariables = Exact<{
  statement?: InputMaybe<Scalars['String']['input']>;
}>;


export type ResetMutation = { __typename?: 'Mutation', reset: boolean };

export type RunAndContinueMutationVariables = Exact<{ [key: string]: never; }>;


export type RunAndContinueMutation = { __typename?: 'Mutation', runAndContinue: boolean };

export type ScheduleAutoModeChangeModeMutationVariables = Exact<{
  mode: Scalars['String']['input'];
}>;


export type ScheduleAutoModeChangeModeMutation = { __typename?: 'Mutation', schedule: { __typename?: 'MutationSchedule', autoMode: { __typename?: 'MutationScheduleAutoMode', changeMode: boolean } } };

export type ScheduleQueuePushMutationVariables = Exact<{
  input: ScheduleQueuePushInput;
}>;


export type ScheduleQueuePushMutation = { __typename?: 'Mutation', schedule: { __typename?: 'MutationSchedule', queue: { __typename?: 'MutationScheduleQueue', push: { __typename?: 'ScheduleQueueItem', id: number, name: string, createdAt: any, script: string } } } };

export type ScheduleQueueRemoveMutationVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type ScheduleQueueRemoveMutation = { __typename?: 'Mutation', schedule: { __typename?: 'MutationSchedule', queue: { __typename?: 'MutationScheduleQueue', remove: boolean } } };

export type SendPdbCommandMutationVariables = Exact<{
  command: Scalars['String']['input'];
  promptNo: Scalars['Int']['input'];
  traceNo: Scalars['Int']['input'];
}>;


export type SendPdbCommandMutation = { __typename?: 'Mutation', sendPdbCommand: boolean };

export type TerminateMutationVariables = Exact<{ [key: string]: never; }>;


export type TerminateMutation = { __typename?: 'Mutation', terminate: boolean };

export type QContinuousEnabledQueryVariables = Exact<{ [key: string]: never; }>;


export type QContinuousEnabledQuery = { __typename?: 'Query', continuousEnabled: boolean };

export type ExceptionQueryVariables = Exact<{ [key: string]: never; }>;


export type ExceptionQuery = { __typename?: 'Query', exception?: string | null };

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

export type QRunNoQueryVariables = Exact<{ [key: string]: never; }>;


export type QRunNoQuery = { __typename?: 'Query', runNo: number };

export type RunsQueryVariables = Exact<{ [key: string]: never; }>;


export type RunsQuery = { __typename?: 'Query', rdb: { __typename?: 'QueryRDB', runs: { __typename?: 'RunNodeConnection', edges: Array<{ __typename?: 'RunNodeEdge', node: { __typename?: 'RunNode', runNo: number, state?: string | null, startedAt?: any | null, endedAt?: any | null, script?: string | null, exception?: string | null } }> } } };

export type QScheduleAutoModeModeQueryVariables = Exact<{ [key: string]: never; }>;


export type QScheduleAutoModeModeQuery = { __typename?: 'Query', schedule: { __typename?: 'QuerySchedule', autoMode: { __typename?: 'QueryScheduleAutoMode', mode: string } } };

export type QScheduleAutoModeStateQueryVariables = Exact<{ [key: string]: never; }>;


export type QScheduleAutoModeStateQuery = { __typename?: 'Query', schedule: { __typename?: 'QuerySchedule', autoMode: { __typename?: 'QueryScheduleAutoMode', state: string } } };

export type QScheduleQueueItemsQueryVariables = Exact<{ [key: string]: never; }>;


export type QScheduleQueueItemsQuery = { __typename?: 'Query', schedule: { __typename?: 'QuerySchedule', queue: { __typename?: 'QueryScheduleQueue', items: Array<{ __typename?: 'ScheduleQueueItem', id: number, name: string, createdAt: any, script: string }> } } };

export type SourceQueryVariables = Exact<{
  fileName?: InputMaybe<Scalars['String']['input']>;
}>;


export type SourceQuery = { __typename?: 'Query', source: Array<string> };

export type QStateQueryVariables = Exact<{ [key: string]: never; }>;


export type QStateQuery = { __typename?: 'Query', state: string };

export type QTraceIdsQueryVariables = Exact<{ [key: string]: never; }>;


export type QTraceIdsQuery = { __typename?: 'Query', traceIds: Array<number> };

export type ContinuousEnabledSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type ContinuousEnabledSubscription = { __typename?: 'Subscription', continuousEnabled: boolean };

export type CounterSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type CounterSubscription = { __typename?: 'Subscription', counter: number };

export type PromptingSubscriptionVariables = Exact<{
  traceId: Scalars['Int']['input'];
}>;


export type PromptingSubscription = { __typename?: 'Subscription', prompting: { __typename?: 'PromptingData', prompting: number, fileName: string, lineNo: number, traceEvent: string } };

export type RunNoSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type RunNoSubscription = { __typename?: 'Subscription', runNo: number };

export type ScheduleAutoModeModeSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type ScheduleAutoModeModeSubscription = { __typename?: 'Subscription', scheduleAutoModeMode: string };

export type ScheduleAutoModeStateSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type ScheduleAutoModeStateSubscription = { __typename?: 'Subscription', scheduleAutoModeState: string };

export type SScheduleQueueItemsSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type SScheduleQueueItemsSubscription = { __typename?: 'Subscription', scheduleQueueItems: Array<{ __typename?: 'ScheduleQueueItem', id: number, name: string, createdAt: any, script: string }> };

export type StateSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type StateSubscription = { __typename?: 'Subscription', state: string };

export type StdoutSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type StdoutSubscription = { __typename?: 'Subscription', stdout: string };

export type TraceIdsSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type TraceIdsSubscription = { __typename?: 'Subscription', traceIds: Array<number> };


export const AutoModeTurnOffDocument = gql`
    mutation AutoModeTurnOff {
  schedule {
    autoMode {
      turnOff
    }
  }
}
    `;

export function useAutoModeTurnOffMutation() {
  return Urql.useMutation<AutoModeTurnOffMutation, AutoModeTurnOffMutationVariables>(AutoModeTurnOffDocument);
};
export const AutoModeTurnOnDocument = gql`
    mutation AutoModeTurnOn {
  schedule {
    autoMode {
      turnOn
    }
  }
}
    `;

export function useAutoModeTurnOnMutation() {
  return Urql.useMutation<AutoModeTurnOnMutation, AutoModeTurnOnMutationVariables>(AutoModeTurnOnDocument);
};
export const ExecDocument = gql`
    mutation Exec {
  exec
}
    `;

export function useExecMutation() {
  return Urql.useMutation<ExecMutation, ExecMutationVariables>(ExecDocument);
};
export const InterruptDocument = gql`
    mutation Interrupt {
  interrupt
}
    `;

export function useInterruptMutation() {
  return Urql.useMutation<InterruptMutation, InterruptMutationVariables>(InterruptDocument);
};
export const KillDocument = gql`
    mutation Kill {
  kill
}
    `;

export function useKillMutation() {
  return Urql.useMutation<KillMutation, KillMutationVariables>(KillDocument);
};
export const LoadScriptDocument = gql`
    mutation LoadScript {
  schedule {
    loadScript
  }
}
    `;

export function useLoadScriptMutation() {
  return Urql.useMutation<LoadScriptMutation, LoadScriptMutationVariables>(LoadScriptDocument);
};
export const ResetDocument = gql`
    mutation Reset($statement: String) {
  reset(statement: $statement)
}
    `;

export function useResetMutation() {
  return Urql.useMutation<ResetMutation, ResetMutationVariables>(ResetDocument);
};
export const RunAndContinueDocument = gql`
    mutation RunAndContinue {
  runAndContinue
}
    `;

export function useRunAndContinueMutation() {
  return Urql.useMutation<RunAndContinueMutation, RunAndContinueMutationVariables>(RunAndContinueDocument);
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
export const SendPdbCommandDocument = gql`
    mutation SendPdbCommand($command: String!, $promptNo: Int!, $traceNo: Int!) {
  sendPdbCommand(command: $command, promptNo: $promptNo, traceNo: $traceNo)
}
    `;

export function useSendPdbCommandMutation() {
  return Urql.useMutation<SendPdbCommandMutation, SendPdbCommandMutationVariables>(SendPdbCommandDocument);
};
export const TerminateDocument = gql`
    mutation Terminate {
  terminate
}
    `;

export function useTerminateMutation() {
  return Urql.useMutation<TerminateMutation, TerminateMutationVariables>(TerminateDocument);
};
export const QContinuousEnabledDocument = gql`
    query QContinuousEnabled {
  continuousEnabled
}
    `;

export function useQContinuousEnabledQuery(options: Omit<Urql.UseQueryArgs<never, QContinuousEnabledQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<QContinuousEnabledQuery>({ query: QContinuousEnabledDocument, ...options });
};
export const ExceptionDocument = gql`
    query Exception {
  exception
}
    `;

export function useExceptionQuery(options: Omit<Urql.UseQueryArgs<never, ExceptionQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<ExceptionQuery>({ query: ExceptionDocument, ...options });
};
export const RdbRunDocument = gql`
    query RDBRun($runNo: Int!) {
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

export function useRdbRunQuery(options: Omit<Urql.UseQueryArgs<never, RdbRunQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<RdbRunQuery>({ query: RdbRunDocument, ...options });
};
export const RdbRunsDocument = gql`
    query RDBRuns($before: String, $after: String, $first: Int, $last: Int) {
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

export function useRdbRunsQuery(options: Omit<Urql.UseQueryArgs<never, RdbRunsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<RdbRunsQuery>({ query: RdbRunsDocument, ...options });
};
export const QRunNoDocument = gql`
    query QRunNo {
  runNo
}
    `;

export function useQRunNoQuery(options: Omit<Urql.UseQueryArgs<never, QRunNoQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<QRunNoQuery>({ query: QRunNoDocument, ...options });
};
export const RunsDocument = gql`
    query Runs {
  rdb {
    runs {
      edges {
        node {
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

export function useRunsQuery(options: Omit<Urql.UseQueryArgs<never, RunsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<RunsQuery>({ query: RunsDocument, ...options });
};
export const QScheduleAutoModeModeDocument = gql`
    query QScheduleAutoModeMode {
  schedule {
    autoMode {
      mode
    }
  }
}
    `;

export function useQScheduleAutoModeModeQuery(options: Omit<Urql.UseQueryArgs<never, QScheduleAutoModeModeQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<QScheduleAutoModeModeQuery>({ query: QScheduleAutoModeModeDocument, ...options });
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

export function useQScheduleAutoModeStateQuery(options: Omit<Urql.UseQueryArgs<never, QScheduleAutoModeStateQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<QScheduleAutoModeStateQuery>({ query: QScheduleAutoModeStateDocument, ...options });
};
export const QScheduleQueueItemsDocument = gql`
    query QScheduleQueueItems {
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

export function useQScheduleQueueItemsQuery(options: Omit<Urql.UseQueryArgs<never, QScheduleQueueItemsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<QScheduleQueueItemsQuery>({ query: QScheduleQueueItemsDocument, ...options });
};
export const SourceDocument = gql`
    query Source($fileName: String) {
  source(fileName: $fileName)
}
    `;

export function useSourceQuery(options: Omit<Urql.UseQueryArgs<never, SourceQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<SourceQuery>({ query: SourceDocument, ...options });
};
export const QStateDocument = gql`
    query QState {
  state
}
    `;

export function useQStateQuery(options: Omit<Urql.UseQueryArgs<never, QStateQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<QStateQuery>({ query: QStateDocument, ...options });
};
export const QTraceIdsDocument = gql`
    query QTraceIds {
  traceIds
}
    `;

export function useQTraceIdsQuery(options: Omit<Urql.UseQueryArgs<never, QTraceIdsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<QTraceIdsQuery>({ query: QTraceIdsDocument, ...options });
};
export const ContinuousEnabledDocument = gql`
    subscription ContinuousEnabled {
  continuousEnabled
}
    `;

export function useContinuousEnabledSubscription<R = ContinuousEnabledSubscription>(options: Omit<Urql.UseSubscriptionArgs<never, ContinuousEnabledSubscriptionVariables>, 'query'> = {}, handler?: Urql.SubscriptionHandlerArg<ContinuousEnabledSubscription, R>) {
  return Urql.useSubscription<ContinuousEnabledSubscription, R, ContinuousEnabledSubscriptionVariables>({ query: ContinuousEnabledDocument, ...options }, handler);
};
export const CounterDocument = gql`
    subscription Counter {
  counter
}
    `;

export function useCounterSubscription<R = CounterSubscription>(options: Omit<Urql.UseSubscriptionArgs<never, CounterSubscriptionVariables>, 'query'> = {}, handler?: Urql.SubscriptionHandlerArg<CounterSubscription, R>) {
  return Urql.useSubscription<CounterSubscription, R, CounterSubscriptionVariables>({ query: CounterDocument, ...options }, handler);
};
export const PromptingDocument = gql`
    subscription Prompting($traceId: Int!) {
  prompting(traceId: $traceId) {
    prompting
    fileName
    lineNo
    traceEvent
  }
}
    `;

export function usePromptingSubscription<R = PromptingSubscription>(options: Omit<Urql.UseSubscriptionArgs<never, PromptingSubscriptionVariables>, 'query'> = {}, handler?: Urql.SubscriptionHandlerArg<PromptingSubscription, R>) {
  return Urql.useSubscription<PromptingSubscription, R, PromptingSubscriptionVariables>({ query: PromptingDocument, ...options }, handler);
};
export const RunNoDocument = gql`
    subscription RunNo {
  runNo
}
    `;

export function useRunNoSubscription<R = RunNoSubscription>(options: Omit<Urql.UseSubscriptionArgs<never, RunNoSubscriptionVariables>, 'query'> = {}, handler?: Urql.SubscriptionHandlerArg<RunNoSubscription, R>) {
  return Urql.useSubscription<RunNoSubscription, R, RunNoSubscriptionVariables>({ query: RunNoDocument, ...options }, handler);
};
export const ScheduleAutoModeModeDocument = gql`
    subscription ScheduleAutoModeMode {
  scheduleAutoModeMode
}
    `;

export function useScheduleAutoModeModeSubscription<R = ScheduleAutoModeModeSubscription>(options: Omit<Urql.UseSubscriptionArgs<never, ScheduleAutoModeModeSubscriptionVariables>, 'query'> = {}, handler?: Urql.SubscriptionHandlerArg<ScheduleAutoModeModeSubscription, R>) {
  return Urql.useSubscription<ScheduleAutoModeModeSubscription, R, ScheduleAutoModeModeSubscriptionVariables>({ query: ScheduleAutoModeModeDocument, ...options }, handler);
};
export const ScheduleAutoModeStateDocument = gql`
    subscription ScheduleAutoModeState {
  scheduleAutoModeState
}
    `;

export function useScheduleAutoModeStateSubscription<R = ScheduleAutoModeStateSubscription>(options: Omit<Urql.UseSubscriptionArgs<never, ScheduleAutoModeStateSubscriptionVariables>, 'query'> = {}, handler?: Urql.SubscriptionHandlerArg<ScheduleAutoModeStateSubscription, R>) {
  return Urql.useSubscription<ScheduleAutoModeStateSubscription, R, ScheduleAutoModeStateSubscriptionVariables>({ query: ScheduleAutoModeStateDocument, ...options }, handler);
};
export const SScheduleQueueItemsDocument = gql`
    subscription SScheduleQueueItems {
  scheduleQueueItems {
    id
    name
    createdAt
    script
  }
}
    `;

export function useSScheduleQueueItemsSubscription<R = SScheduleQueueItemsSubscription>(options: Omit<Urql.UseSubscriptionArgs<never, SScheduleQueueItemsSubscriptionVariables>, 'query'> = {}, handler?: Urql.SubscriptionHandlerArg<SScheduleQueueItemsSubscription, R>) {
  return Urql.useSubscription<SScheduleQueueItemsSubscription, R, SScheduleQueueItemsSubscriptionVariables>({ query: SScheduleQueueItemsDocument, ...options }, handler);
};
export const StateDocument = gql`
    subscription State {
  state
}
    `;

export function useStateSubscription<R = StateSubscription>(options: Omit<Urql.UseSubscriptionArgs<never, StateSubscriptionVariables>, 'query'> = {}, handler?: Urql.SubscriptionHandlerArg<StateSubscription, R>) {
  return Urql.useSubscription<StateSubscription, R, StateSubscriptionVariables>({ query: StateDocument, ...options }, handler);
};
export const StdoutDocument = gql`
    subscription Stdout {
  stdout
}
    `;

export function useStdoutSubscription<R = StdoutSubscription>(options: Omit<Urql.UseSubscriptionArgs<never, StdoutSubscriptionVariables>, 'query'> = {}, handler?: Urql.SubscriptionHandlerArg<StdoutSubscription, R>) {
  return Urql.useSubscription<StdoutSubscription, R, StdoutSubscriptionVariables>({ query: StdoutDocument, ...options }, handler);
};
export const TraceIdsDocument = gql`
    subscription TraceIds {
  traceIds
}
    `;

export function useTraceIdsSubscription<R = TraceIdsSubscription>(options: Omit<Urql.UseSubscriptionArgs<never, TraceIdsSubscriptionVariables>, 'query'> = {}, handler?: Urql.SubscriptionHandlerArg<TraceIdsSubscription, R>) {
  return Urql.useSubscription<TraceIdsSubscription, R, TraceIdsSubscriptionVariables>({ query: TraceIdsDocument, ...options }, handler);
};