import gql from 'graphql-tag';
import * as Urql from '@urql/vue';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
};

export type History = {
  __typename?: 'History';
  prompts: PromptHistoryConnection;
  runs: RunHistoryConnection;
  stdouts: StdoutHistoryConnection;
  traces: TraceHistoryConnection;
};


export type HistoryPromptsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};


export type HistoryRunsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};


export type HistoryStdoutsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};


export type HistoryTracesArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  exec: Scalars['Boolean'];
  interrupt: Scalars['Boolean'];
  kill: Scalars['Boolean'];
  reset: Scalars['Boolean'];
  schedule: MutationSchedule;
  sendPdbCommand: Scalars['Boolean'];
  terminate: Scalars['Boolean'];
};


export type MutationResetArgs = {
  statement?: InputMaybe<Scalars['String']>;
};


export type MutationSendPdbCommandArgs = {
  command: Scalars['String'];
  promptNo: Scalars['Int'];
  traceNo: Scalars['Int'];
};

export type MutationAutoMode = {
  __typename?: 'MutationAutoMode';
  turnOff: Scalars['Boolean'];
  turnOn: Scalars['Boolean'];
};

export type MutationSchedule = {
  __typename?: 'MutationSchedule';
  autoMode: MutationAutoMode;
  scheduler: MutationScheduler;
};

export type MutationScheduler = {
  __typename?: 'MutationScheduler';
  update: Scalars['Boolean'];
};


export type MutationSchedulerUpdateArgs = {
  input: MutationSchedulerInput;
};

export type MutationSchedulerInput = {
  apiUrl?: InputMaybe<Scalars['String']>;
  lengthMinutes?: InputMaybe<Scalars['Int']>;
  policy?: InputMaybe<Scalars['String']>;
};

export type PageInfo = {
  __typename?: 'PageInfo';
  endCursor?: Maybe<Scalars['String']>;
  hasNextPage: Scalars['Boolean'];
  hasPreviousPage: Scalars['Boolean'];
  startCursor?: Maybe<Scalars['String']>;
};

export type PromptHistory = {
  __typename?: 'PromptHistory';
  command?: Maybe<Scalars['String']>;
  endedAt?: Maybe<Scalars['DateTime']>;
  event: Scalars['String'];
  fileName?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  lineNo?: Maybe<Scalars['Int']>;
  open: Scalars['Boolean'];
  promptNo: Scalars['Int'];
  run: RunHistory;
  runNo: Scalars['Int'];
  startedAt: Scalars['DateTime'];
  stdout?: Maybe<Scalars['String']>;
  trace: TraceHistory;
  traceNo: Scalars['Int'];
};

export type PromptHistoryConnection = {
  __typename?: 'PromptHistoryConnection';
  edges: Array<PromptHistoryEdge>;
  pageInfo: PageInfo;
};

export type PromptHistoryEdge = {
  __typename?: 'PromptHistoryEdge';
  cursor: Scalars['String'];
  node: PromptHistory;
};

export type PromptingData = {
  __typename?: 'PromptingData';
  fileName: Scalars['String'];
  lineNo: Scalars['Int'];
  prompting: Scalars['Int'];
  traceEvent: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  exception?: Maybe<Scalars['String']>;
  hello: Scalars['String'];
  history: History;
  runNo: Scalars['Int'];
  schedule: QuerySchedule;
  settings: Scalars['String'];
  source: Array<Scalars['String']>;
  sourceLine: Scalars['String'];
  state: Scalars['String'];
};


export type QuerySourceArgs = {
  fileName?: InputMaybe<Scalars['String']>;
};


export type QuerySourceLineArgs = {
  fileName?: InputMaybe<Scalars['String']>;
  lineNo: Scalars['Int'];
};

export type QueryAutoMode = {
  __typename?: 'QueryAutoMode';
  state: Scalars['String'];
};

export type QuerySchedule = {
  __typename?: 'QuerySchedule';
  autoMode: QueryAutoMode;
  scheduler: QueryScheduler;
};

export type QueryScheduler = {
  __typename?: 'QueryScheduler';
  apiUrl: Scalars['String'];
  lengthMinutes: Scalars['Int'];
  policy: Scalars['String'];
};

export type RunHistory = {
  __typename?: 'RunHistory';
  endedAt?: Maybe<Scalars['DateTime']>;
  exception?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  prompts: Array<PromptHistory>;
  runNo: Scalars['Int'];
  script?: Maybe<Scalars['String']>;
  startedAt?: Maybe<Scalars['DateTime']>;
  state?: Maybe<Scalars['String']>;
  stdouts: Array<StdoutHistory>;
  traces: Array<TraceHistory>;
};

export type RunHistoryConnection = {
  __typename?: 'RunHistoryConnection';
  edges: Array<RunHistoryEdge>;
  pageInfo: PageInfo;
};

export type RunHistoryEdge = {
  __typename?: 'RunHistoryEdge';
  cursor: Scalars['String'];
  node: RunHistory;
};

export type StdoutHistory = {
  __typename?: 'StdoutHistory';
  id: Scalars['Int'];
  run: RunHistory;
  runNo: Scalars['Int'];
  text?: Maybe<Scalars['String']>;
  trace: TraceHistory;
  traceNo: Scalars['Int'];
  writtenAt?: Maybe<Scalars['DateTime']>;
};

export type StdoutHistoryConnection = {
  __typename?: 'StdoutHistoryConnection';
  edges: Array<StdoutHistoryEdge>;
  pageInfo: PageInfo;
};

export type StdoutHistoryEdge = {
  __typename?: 'StdoutHistoryEdge';
  cursor: Scalars['String'];
  node: StdoutHistory;
};

export type Subscription = {
  __typename?: 'Subscription';
  counter: Scalars['Int'];
  prompting: PromptingData;
  runNo: Scalars['String'];
  scheduleAutoModeState: Scalars['String'];
  state: Scalars['String'];
  stdout: Scalars['String'];
  traceIds: Array<Scalars['Int']>;
};


export type SubscriptionPromptingArgs = {
  traceId: Scalars['Int'];
};

export type TraceHistory = {
  __typename?: 'TraceHistory';
  endedAt?: Maybe<Scalars['DateTime']>;
  id: Scalars['Int'];
  prompts: Array<PromptHistory>;
  run: RunHistory;
  runNo: Scalars['Int'];
  startedAt: Scalars['DateTime'];
  state: Scalars['String'];
  stdouts: Array<StdoutHistory>;
  taskNo?: Maybe<Scalars['Int']>;
  threadNo: Scalars['Int'];
  traceNo: Scalars['Int'];
};

export type TraceHistoryConnection = {
  __typename?: 'TraceHistoryConnection';
  edges: Array<TraceHistoryEdge>;
  pageInfo: PageInfo;
};

export type TraceHistoryEdge = {
  __typename?: 'TraceHistoryEdge';
  cursor: Scalars['String'];
  node: TraceHistory;
};

export type ExecMutationVariables = Exact<{ [key: string]: never; }>;


export type ExecMutation = { __typename?: 'Mutation', exec: boolean };

export type InterruptMutationVariables = Exact<{ [key: string]: never; }>;


export type InterruptMutation = { __typename?: 'Mutation', interrupt: boolean };

export type KillMutationVariables = Exact<{ [key: string]: never; }>;


export type KillMutation = { __typename?: 'Mutation', kill: boolean };

export type ResetMutationVariables = Exact<{
  statement?: InputMaybe<Scalars['String']>;
}>;


export type ResetMutation = { __typename?: 'Mutation', reset: boolean };

export type SendPdbCommandMutationVariables = Exact<{
  command: Scalars['String'];
  promptNo: Scalars['Int'];
  traceNo: Scalars['Int'];
}>;


export type SendPdbCommandMutation = { __typename?: 'Mutation', sendPdbCommand: boolean };

export type TerminateMutationVariables = Exact<{ [key: string]: never; }>;


export type TerminateMutation = { __typename?: 'Mutation', terminate: boolean };

export type ExceptionQueryVariables = Exact<{ [key: string]: never; }>;


export type ExceptionQuery = { __typename?: 'Query', exception?: string | null };

export type RunsQueryVariables = Exact<{ [key: string]: never; }>;


export type RunsQuery = { __typename?: 'Query', history: { __typename?: 'History', runs: { __typename?: 'RunHistoryConnection', edges: Array<{ __typename?: 'RunHistoryEdge', node: { __typename?: 'RunHistory', runNo: number, state?: string | null, startedAt?: any | null, endedAt?: any | null, script?: string | null, exception?: string | null } }> } } };

export type SourceQueryVariables = Exact<{
  fileName?: InputMaybe<Scalars['String']>;
}>;


export type SourceQuery = { __typename?: 'Query', source: Array<string> };

export type CounterSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type CounterSubscription = { __typename?: 'Subscription', counter: number };

export type PromptingSubscriptionVariables = Exact<{
  traceId: Scalars['Int'];
}>;


export type PromptingSubscription = { __typename?: 'Subscription', prompting: { __typename?: 'PromptingData', prompting: number, fileName: string, lineNo: number, traceEvent: string } };

export type RunNoSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type RunNoSubscription = { __typename?: 'Subscription', runNo: string };

export type ScheduleAutoModeStateSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type ScheduleAutoModeStateSubscription = { __typename?: 'Subscription', scheduleAutoModeState: string };

export type StateSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type StateSubscription = { __typename?: 'Subscription', state: string };

export type StdoutSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type StdoutSubscription = { __typename?: 'Subscription', stdout: string };

export type TraceIdsSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type TraceIdsSubscription = { __typename?: 'Subscription', traceIds: Array<number> };


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
export const ResetDocument = gql`
    mutation Reset($statement: String) {
  reset(statement: $statement)
}
    `;

export function useResetMutation() {
  return Urql.useMutation<ResetMutation, ResetMutationVariables>(ResetDocument);
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
export const ExceptionDocument = gql`
    query Exception {
  exception
}
    `;

export function useExceptionQuery(options: Omit<Urql.UseQueryArgs<never, ExceptionQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<ExceptionQuery>({ query: ExceptionDocument, ...options });
};
export const RunsDocument = gql`
    query Runs {
  history {
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
export const SourceDocument = gql`
    query Source($fileName: String) {
  source(fileName: $fileName)
}
    `;

export function useSourceQuery(options: Omit<Urql.UseQueryArgs<never, SourceQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<SourceQuery>({ query: SourceDocument, ...options });
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
export const ScheduleAutoModeStateDocument = gql`
    subscription ScheduleAutoModeState {
  scheduleAutoModeState
}
    `;

export function useScheduleAutoModeStateSubscription<R = ScheduleAutoModeStateSubscription>(options: Omit<Urql.UseSubscriptionArgs<never, ScheduleAutoModeStateSubscriptionVariables>, 'query'> = {}, handler?: Urql.SubscriptionHandlerArg<ScheduleAutoModeStateSubscription, R>) {
  return Urql.useSubscription<ScheduleAutoModeStateSubscription, R, ScheduleAutoModeStateSubscriptionVariables>({ query: ScheduleAutoModeStateDocument, ...options }, handler);
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