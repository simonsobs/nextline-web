/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

const documents = {
    "mutation Exec {\n  exec\n}": types.ExecDocument,
    "mutation Interrupt {\n  interrupt\n}": types.InterruptDocument,
    "mutation Kill {\n  kill\n}": types.KillDocument,
    "mutation Reset($statement: String) {\n  reset(statement: $statement)\n}": types.ResetDocument,
    "mutation SendPdbCommand($command: String!, $promptNo: Int!, $traceNo: Int!) {\n  sendPdbCommand(command: $command, promptNo: $promptNo, traceNo: $traceNo)\n}": types.SendPdbCommandDocument,
    "mutation Terminate {\n  terminate\n}": types.TerminateDocument,
    "query Exception {\n  exception\n}": types.ExceptionDocument,
    "query Runs {\n  history {\n    runs {\n      edges {\n        node {\n          runNo\n          state\n          startedAt\n          endedAt\n          script\n          exception\n        }\n      }\n    }\n  }\n}": types.RunsDocument,
    "query Source($fileName: String) {\n  source(fileName: $fileName)\n}": types.SourceDocument,
    "subscription Counter {\n  counter\n}": types.CounterDocument,
    "subscription Prompting($traceId: Int!) {\n  prompting(traceId: $traceId) {\n    prompting\n    fileName\n    lineNo\n    traceEvent\n  }\n}": types.PromptingDocument,
    "subscription RunNo {\n  runNo\n}": types.RunNoDocument,
    "subscription State {\n  state\n}": types.StateDocument,
    "subscription Stdout {\n  stdout\n}": types.StdoutDocument,
    "subscription TraceIds {\n  traceIds\n}": types.TraceIdsDocument,
};

export function graphql(source: "mutation Exec {\n  exec\n}"): (typeof documents)["mutation Exec {\n  exec\n}"];
export function graphql(source: "mutation Interrupt {\n  interrupt\n}"): (typeof documents)["mutation Interrupt {\n  interrupt\n}"];
export function graphql(source: "mutation Kill {\n  kill\n}"): (typeof documents)["mutation Kill {\n  kill\n}"];
export function graphql(source: "mutation Reset($statement: String) {\n  reset(statement: $statement)\n}"): (typeof documents)["mutation Reset($statement: String) {\n  reset(statement: $statement)\n}"];
export function graphql(source: "mutation SendPdbCommand($command: String!, $promptNo: Int!, $traceNo: Int!) {\n  sendPdbCommand(command: $command, promptNo: $promptNo, traceNo: $traceNo)\n}"): (typeof documents)["mutation SendPdbCommand($command: String!, $promptNo: Int!, $traceNo: Int!) {\n  sendPdbCommand(command: $command, promptNo: $promptNo, traceNo: $traceNo)\n}"];
export function graphql(source: "mutation Terminate {\n  terminate\n}"): (typeof documents)["mutation Terminate {\n  terminate\n}"];
export function graphql(source: "query Exception {\n  exception\n}"): (typeof documents)["query Exception {\n  exception\n}"];
export function graphql(source: "query Runs {\n  history {\n    runs {\n      edges {\n        node {\n          runNo\n          state\n          startedAt\n          endedAt\n          script\n          exception\n        }\n      }\n    }\n  }\n}"): (typeof documents)["query Runs {\n  history {\n    runs {\n      edges {\n        node {\n          runNo\n          state\n          startedAt\n          endedAt\n          script\n          exception\n        }\n      }\n    }\n  }\n}"];
export function graphql(source: "query Source($fileName: String) {\n  source(fileName: $fileName)\n}"): (typeof documents)["query Source($fileName: String) {\n  source(fileName: $fileName)\n}"];
export function graphql(source: "subscription Counter {\n  counter\n}"): (typeof documents)["subscription Counter {\n  counter\n}"];
export function graphql(source: "subscription Prompting($traceId: Int!) {\n  prompting(traceId: $traceId) {\n    prompting\n    fileName\n    lineNo\n    traceEvent\n  }\n}"): (typeof documents)["subscription Prompting($traceId: Int!) {\n  prompting(traceId: $traceId) {\n    prompting\n    fileName\n    lineNo\n    traceEvent\n  }\n}"];
export function graphql(source: "subscription RunNo {\n  runNo\n}"): (typeof documents)["subscription RunNo {\n  runNo\n}"];
export function graphql(source: "subscription State {\n  state\n}"): (typeof documents)["subscription State {\n  state\n}"];
export function graphql(source: "subscription Stdout {\n  stdout\n}"): (typeof documents)["subscription Stdout {\n  stdout\n}"];
export function graphql(source: "subscription TraceIds {\n  traceIds\n}"): (typeof documents)["subscription TraceIds {\n  traceIds\n}"];

export function graphql(source: string): unknown;
export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;