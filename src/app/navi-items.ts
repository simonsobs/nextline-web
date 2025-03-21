import { computed, ref, watchEffect, toValue } from "vue";
import { useSessionStorage } from "@vueuse/core";
import { useRoute } from "vue-router";
import type { RouteLocationRaw } from "vue-router";

interface NaviItem {
  icon: string;
  title: string;
  to: RouteLocationRaw;
  exact: boolean;
}

export function useNaviItems() {
  const route = useRoute();
  const routeNamesDb = ["runs", "run"];

  const lastInDb = useSessionStorage<RouteLocationRaw>("lastInDb", {
    name: "runs",
  });

  watchEffect(() => {
    if (!routeNamesDb.includes(route.name as string)) return;
    lastInDb.value = { path: route.path };
  });

  const naviItems = computed<NaviItem[]>(() => [
    {
      icon: "mdi-home",
      title: "Main",
      to: { name: "home" },
      exact: true,
    },
    {
      icon: "mdi-database",
      title: "History",
      to: toValue(lastInDb),
      exact: false,
    },
    {
      icon: "mdi-list-box",
      title: "Queue",
      to: { name: "queue" },
      exact: true,
    },
    {
      icon: "mdi-script-text",
      title: "Preview",
      to: { name: "preview" },
      exact: true,
    },
  ]);

  return { naviItems };
}
