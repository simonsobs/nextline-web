<template>
  <div class="pt-5 px-5 pb-16" style="max-width: 960px; margin: auto">
    <div class="text-h4 text-primary">Theme</div>
    <VContainer>
      <VRow v-for="(c, k) in bgColors" :key="k">
        <VCol cols="6">
          <VCard variant="outlined">
            <VCardTitle :class="`bg-${k}`"> {{ k }}: {{ colors[k] }} </VCardTitle>
          </VCard>
        </VCol>
        <VCol cols="6">
          <VCard v-if="`on-${k}` in colors" variant="outlined">
            <VCardTitle :class="`bg-${k} text-on-${k}`">
              {{ `on-${k}` }}: {{ colors[`on-${k}`] }}
            </VCardTitle>
          </VCard>
        </VCol>
      </VRow>
    </VContainer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useTheme } from "vuetify";

const theme = useTheme();

const colors = computed(() => theme.current.value.colors);

const bgColors = computed(() =>
  Object.fromEntries(
    Object.entries(colors.value).filter(([k, v]) => !k.startsWith("on-")),
  ),
);
</script>
