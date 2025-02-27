import { ref, shallowRef, watchEffect } from "vue";
import type { MaybeRef, Ref, ShallowRef } from "vue";

import { useDebounceFn, createEventHook } from "@vueuse/core";
import type * as Monaco from "monaco-editor";

export interface UseModelOptions {
  source?: MaybeRef<string>;
  language?: string;
  sourceUpdateDelayMilliseconds?: number;
  sourceUpdateMaxWaitMilliseconds?: number;
}

const _default: Required<UseModelOptions> = {
  source: "",
  language: "python",
  sourceUpdateDelayMilliseconds: 50,
  sourceUpdateMaxWaitMilliseconds: 100,
};

interface _UseModelReturn {
  model: ShallowRef<Monaco.editor.ITextModel | undefined>;
  source: Ref<string>;
  beforeSetValue: (fn: () => void) => void;
  afterSetValue: (fn: () => void) => void;
  ready: Promise<void>;
}

type UseModelReturn = _UseModelReturn & PromiseLike<_UseModelReturn>;

export function useModel(options?: UseModelOptions): UseModelReturn {
  const {
    source: source_,
    language,
    sourceUpdateDelayMilliseconds,
    sourceUpdateMaxWaitMilliseconds,
  } = { ..._default, ...options };

  const monaco = ref<typeof Monaco>();
  const model = shallowRef<Monaco.editor.ITextModel>();

  const source = ref(source_);

  const beforeSetValue = createEventHook<null>();
  const afterSetValue = createEventHook<null>();

  // Update model when source changes.
  watchEffect(() => {
    if (!model.value) return;
    if (source.value === model.value.getValue()) return;
    beforeSetValue.trigger(null);
    model.value.setValue(source.value);
    afterSetValue.trigger(null);
  });

  // Update source when model changes (debounced).
  const updateSource = useDebounceFn(
    () => {
      if (!model.value) return;
      source.value = model.value.getValue();
    },
    sourceUpdateDelayMilliseconds,
    { maxWait: sourceUpdateMaxWaitMilliseconds }
  );

  async function loadMonaco() {
    monaco.value = await import("monaco-editor");
    model.value = monaco.value.editor.createModel(source.value, language);
    model.value.onDidChangeContent(updateSource);
  }

  const ready = loadMonaco();

  const ret = {
    model,
    source,
    beforeSetValue: beforeSetValue.on,
    afterSetValue: afterSetValue.on,
    ready,
  };

  return {
    ...ret,
    async then(onFulfilled, onRejected) {
      await ready;
      return Promise.resolve(ret).then(onFulfilled, onRejected);
    },
  };
}
