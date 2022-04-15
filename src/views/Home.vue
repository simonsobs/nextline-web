<template>
  <div class="g-container">
    <div class="g-ctrl">
      <main-ctrl></main-ctrl>
    </div>
    <div v-show="exception" class="g-exception">
      <exception v-model="exception"></exception>
    </div>
    <div class="g-code">
      <layout-script></layout-script>
    </div>
    <div class="g-stdout">
      <stdout></stdout>
    </div>
  </div>
</template>

<script>
import MainCtrl from "@/components/MainCtrl.vue";
import Stdout from "@/components/Stdout.vue";
import Exception from "@/components/Exception.vue";
import LayoutScript from "@/components/LayoutScript.vue";

export default {
  name: "Home",
  components: {
    MainCtrl,
    Stdout,
    Exception,
    LayoutScript,
  },
  data() {
    return {
      exception: false,
    };
  },
};
</script>

<style scoped>
.g-container {
  display: grid;
  margin: 12px;
  height: calc(100% - 2 * 12px);
  width: calc(100% - 2 * 12px);
  grid-template-columns: minmax(100px, 1fr);
  grid-template-rows: min-content min-content minmax(240px, 1fr) minmax(100px, 20vh);
  grid-template-areas: "ctrl" "exception" "code" "stdout";
  row-gap: 6px;
}
.g-ctrl {
  grid-area: ctrl;
}
.g-exception {
  grid-area: exception;
}
.g-code {
  grid-area: code;
}
.g-stdout {
  grid-area: stdout;
}
</style>
