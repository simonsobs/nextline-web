import { ref, watchEffect, toValue } from "vue";
import { useDisplay } from "vuetify";

/**
 * v-model for v-navigation-drawer
 */
export function useDrawer() {
  const { mobile } = useDisplay();
  const drawer = ref(false);
  watchEffect(() => {
    if (toValue(mobile)) return;
    drawer.value = false;
  });

  function toggleDrawer() {
    drawer.value = !drawer.value;
  }
  return { drawer, toggleDrawer };
}
