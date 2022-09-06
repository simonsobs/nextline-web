import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";

import HomeView from "../views/HomeView.vue";
import Runs from "@/views/Runs.vue";

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
    path: "/runs",
    name: "runs",
    component: Runs,
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
  base: import.meta.env.BASE_URL,
  routes,
});

export default router;
