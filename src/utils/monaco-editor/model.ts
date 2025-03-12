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

function resolveOptions(options?: UseModelOptions) {
  // Remove `undefined` so default has precedence.
  const given = Object.fromEntries(
    Object.entries(options || {}).filter(([, v]) => v !== undefined),
  );
  const defaultApplied = { ..._default, ...given };

  // Turn `MaybeRef` into `Ref`.
  const { source: source_, ...rest } = defaultApplied;
  const source: Ref<string> = ref(source_);
  return { source, ...rest };
}

interface _UseModelReturn {
  model: ShallowRef<Monaco.editor.ITextModel | undefined>;
  source: Ref<string>;
  beforeSetValue: (fn: () => void) => void;
  afterSetValue: (fn: () => void) => void;
  dispose: () => void;
  ready: Promise<void>;
}

type UseModelReturn = _UseModelReturn & PromiseLike<_UseModelReturn>;

export function useModel(options?: UseModelOptions): UseModelReturn {
  const {
    source,
    language,
    sourceUpdateDelayMilliseconds,
    sourceUpdateMaxWaitMilliseconds,
  } = resolveOptions(options);

  const monaco = ref<typeof Monaco>();
  const model = shallowRef<Monaco.editor.ITextModel>();

  const beforeSetValue = createEventHook<null>();
  const afterSetValue = createEventHook<null>();

  // Update model when source changes.
  const stop = watchEffect(() => {
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
    { maxWait: sourceUpdateMaxWaitMilliseconds },
  );

  function registerLanguage(monaco: typeof Monaco, language: string) {
    // Register the language if it is not registered.
    // Many languages are typically registered in browsers.
    // Only `plaintext` is registered in Vitest because of `vitest.config.ts`.
    if (!language) return;
    if (
      monaco.languages
        .getLanguages()
        .map((lang) => lang.id)
        .includes(language)
    )
      return;
    monaco.languages.register({ id: language });
  }

  function dispose() {
    stop();
    // TODO: Cancel debounced function. https://github.com/vueuse/vueuse/pull/4561
    disposeOnDidChangeContent?.dispose();
    if (model.value) model.value.dispose();
  }

  let disposeOnDidChangeContent: Monaco.IDisposable | undefined;

  async function loadMonaco() {
    monaco.value = await import("monaco-editor");
    registerLanguage(monaco.value, language);
    model.value = monaco.value.editor.createModel(source.value, language);
    disposeOnDidChangeContent = model.value.onDidChangeContent(updateSource);
  }

  const ready = loadMonaco();

  const ret = {
    model,
    source,
    beforeSetValue: beforeSetValue.on,
    afterSetValue: afterSetValue.on,
    dispose,
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
