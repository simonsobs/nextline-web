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
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
  {
    path: "/runs",
    name: "runs",
    component: Runs,
  },
  {
    path: "/scratch",
    name: "scratch",
    component: () =>
      import(/* webpackChunkName: "scratch" */ "@/views/ScratchView.vue"),
  },
  {
    path: "/scratch/theme",
    name: "scratch-theme",
    component: () =>
      import(/* webpackChunkName: "scratch" */ "@/views/ScratchThemeView.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
