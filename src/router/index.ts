import { RouteRecordRaw, createRouter, createWebHistory } from "vue-router";

import HomeView from "../views/HomeView.vue";
import RunsView from "@/views/RunsView.vue";
import RunView from "@/views/RunView.vue";

const routes: RouteRecordRaw[] = [
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
    component: RunsView,
  },
  {
    path: "/history/runs/:runNo",
    name: "run",
    component: RunView,
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

// TODO: need to check if this is the right way to set the base
const router = createRouter({
  // mode: "history",
  // base: import.meta.env.VITE_PUBLIC_PATH,
  history: createWebHistory(import.meta.env.VITE_PUBLIC_PATH),
  routes,
});

export default router;
