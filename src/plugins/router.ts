import { createRouter, createWebHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";

import HomeView from "../views/main/HomeView.vue";
import RunsView from "@/views/db/RunsView.vue";
import RunView from "@/views/db/RunView.vue";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/about",
    name: "about",
    component: () => import("@/views/AboutView.vue"),
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
    component: () => import("@/views/scratch/ScratchView.vue"),
  },
  {
    path: "/scratch/theme",
    name: "scratch-theme",
    component: () => import("@/views/scratch/ScratchThemeView.vue"),
  },
  {
    path: "/scratch/urql",
    name: "scratch-urql",
    component: () => import("@/views/scratch/ScratchUrql.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_PUBLIC_PATH),
  routes,
});

export default router;
