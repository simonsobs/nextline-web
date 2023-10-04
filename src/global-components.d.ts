// Types of global components
// https://stackoverflow.com/a/70223296/7309855
import DevToolCheckboxes from "@/components/dev/DevToolCheckboxes.vue";
import SuspenseC from "@/components/SuspenseC.vue";

declare module "@vue/runtime-core" {
  export interface GlobalComponents {
    DevToolCheckboxes: typeof DevToolCheckboxes;
    SuspenseC: typeof SuspenseC;
  }
}
