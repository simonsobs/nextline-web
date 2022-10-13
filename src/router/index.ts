import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";

import HomeView from "../views/HomeView.vue";
import Runs from "@/views/RunsView.vue";
import Run from "@/views/RunView.vue";

// Pinia must be plugged in before the router if a store is used in a route
// https://github.com/vuejs/pinia/discussions/723#discussioncomment-2110660
// import { PiniaVuePlugin } from "pinia";
// Vue.use(PiniaVuePlugin);

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/about",
    name: "about",
    component: () => import("../views/AboutView.vue"),
  },
  {
    path: "/history/runs",
    name: "runs",
    component: Runs,
  },
  {
    path: "/history/runs/:runNo",
    name: "run",
    component: Run,
  },
  {
    path: "/scratch",
    name: "scratch",
    component: () => import("@/views/ScratchView.vue"),
  },
  {
    path: "/scratch/theme",
    name: "scratch-theme",
    component: () => import("@/views/ScratchThemeView.vue"),
  },
  {
    path: "/scratch/urql",
    name: "scratch-urql",
    component: () => import("@/views/ScratchUrql.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: import.meta.env.VITE_PUBLIC_PATH,
  routes,
});

export default router;
