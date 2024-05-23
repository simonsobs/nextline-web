<template>
  <div class="pt-5 px-5 pb-16" style="max-width: 960px; margin: auto">
    <div class="text-h4 text-primary">Theme</div>
    <v-container>
      <v-row v-for="(c, k) in bgColors" :key="k">
        <v-col cols="6">
          <v-card variant="outlined">
            <v-card-title :class="`bg-${k}`"> {{ k }}: {{ colors[k] }} </v-card-title>
          </v-card>
        </v-col>
        <v-col cols="6">
          <v-card variant="outlined" v-if="`on-${k}` in colors">
            <v-card-title :class="`bg-${k} text-on-${k}`">
              {{ `on-${k}` }}: {{ colors[`on-${k}`] }}
            </v-card-title>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useTheme } from "vuetify";

const theme = useTheme();

const colors = computed(() => theme.current.value.colors);

const bgColors = computed(() =>
  Object.fromEntries(
    Object.entries(colors.value).filter(([k, v]) => !k.startsWith("on-"))
  )
);
</script>
