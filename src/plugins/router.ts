import { createRouter, createWebHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "home",
    component: () => import("@/views/main/HomeView.vue"),
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
    component: () => import("@/components/rdb/RunsView.vue"),
  },
  {
    path: "/db/runs/:runNo",
    name: "run",
    component: () => import("@/components/rdb/RunView.vue"),
  },
  {
    path: "/dev",
    name: "dev",
    component: () => import("@/views/dev/DevView.vue"),
  },
  {
    path: "/dev/headers",
    name: "dev-headers",
    component: () => import("@/views/dev/DevHeadersView.vue"),
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
