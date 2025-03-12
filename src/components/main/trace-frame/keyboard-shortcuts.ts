import { watch, MaybeRefOrGetter, toValue } from "vue";

import { useCtrlSendPdbCommandMutation } from "@/graphql/codegen/generated";

const keyboardShortcuts = new Map([
  ["n", "next"],
  ["c", "continue"],
  ["r", "return"],
  ["s", "step"],
]);

function useKeyboardShortcuts(
  traceNo: MaybeRefOrGetter<number>,
  promptNo: MaybeRefOrGetter<number>,
  disabled: MaybeRefOrGetter<boolean>,
  keyboardEvent: MaybeRefOrGetter<KeyboardEvent | undefined | null>,
) {
  const { executeMutation } = useCtrlSendPdbCommandMutation();
  watch(
    () => toValue(keyboardEvent),
    async (event) => {
      if (toValue(disabled)) return;
      if (!event) return;
      if (event.metaKey) return;
      if (event.ctrlKey) return;
      const command = keyboardShortcuts.get(event.key);
      if (!command) return;
      event.preventDefault();
      event.stopPropagation();
      await executeMutation({
        command,
        promptNo: toValue(promptNo),
        traceNo: toValue(traceNo),
      });
    },
  );
}

export { useKeyboardShortcuts };
