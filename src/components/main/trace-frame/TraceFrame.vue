<template>
  <VLayout full-height style="width: 100%">
    <VCard
      flat
      :ripple="false"
      tabindex="0"
      @keydown.capture="keyboardEvent = $event"
      class="g-container code-exec"
      rounded="0"
    >
      <template v-if="prompting">
        <div class="g-top-bar">
          <VCardText v-if="basename" class="px-1 py-0">
            <VTooltip bottom open-delay="500">
              <template #activator="{ props }">
                <span v-bind="props" class="text-secondary">
                  {{ basename }}
                </span>
              </template>
              <span>{{ prompting.fileName }}</span>
            </VTooltip>
          </VCardText>
        </div>
        <div class="g-content">
          <CodeEditor :state="prompting"></CodeEditor>
        </div>
        <div class="g-bottom-bar">
          <TraceAction
            :traceNo="traceId"
            :promptNo="prompting.prompting"
            :disabled="!prompting.prompting"
          ></TraceAction>
        </div>
      </template>
    </VCard>
  </VLayout>
</template>

<script setup lang="ts">
import { computed, ref, toRefs } from "vue";
import path from "path";

import { useCtrlPromptingSSubscription } from "@/graphql/codegen/generated";
import { useKeyboardShortcuts } from "./keyboard-shortcuts";
import TraceAction from "./TraceAction.vue";
import CodeEditor from "./code-editor/CodeEditor.vue";

interface Props {
  traceId: number;
}

const props = defineProps<Props>();

const keyboardEvent = ref<KeyboardEvent | null>(null);

const subscription = useCtrlPromptingSSubscription({
  variables: { traceId: props.traceId },
});

const prompting = computed(() => subscription.data.value?.ctrlPrompting);

const basename = computed(() => {
  const fileName = prompting?.value?.fileName || "";
  return fileName === "<string>" ? "" : path.basename(fileName);
});

const { traceId: traceNo } = toRefs(props);
const promptNo = computed(() => prompting.value?.prompting || 0);
const disabled = computed(() => !promptNo.value);

useKeyboardShortcuts(traceNo, promptNo, disabled, keyboardEvent);
</script>

<style scoped>
.code-exec {
  cursor: default;
}

.code-exec:before {
  background: inherit; /* prevent highlight when focused */
}
.g-container {
  display: grid;
  block-size: 100%;
  inline-size: 100%;
  grid-template-columns: minmax(100px, 1fr);
  grid-template-rows: min-content minmax(0, 1fr) min-content;
  grid-template-areas: "top-bar" "content" "bottom-bar";
}

.g-top-bar {
  grid-area: top-bar;
}

.g-content {
  grid-area: content;
  block-size: 100%;
}

.g-bottom-bar {
  grid-area: bottom-bar;
}
</style>
