import { createRouter, createWebHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";

import HomeView from "@/views/main/HomeView.vue";
import RunsView from "@/components/rdb/RunsView.vue";
import RunView from "@/components/rdb/RunView.vue";

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
    path: "/queue",
    name: "queue",
    component: () => import("@/components/schedule/queue/QueueView.vue"),
  },
  {
    path: "/preview",
    name: "preview",
    component: () => import("@/components/schedule/preview/PreviewView.vue"),
  },
  {
    path: "/db/runs",
    name: "runs",
    component: RunsView,
  },
  {
    path: "/db/runs/:runNo",
    name: "run",
    component: RunView,
  },
  {
    path: "/dev",
    name: "dev",
    component: () => import("@/views/DevView.vue"),
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
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: () => import("@/views/NotFoundView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_PUBLIC_PATH),
  routes,
});

export default router;
