import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "@/views/HomeView.vue";
import Runs from "@/views/Runs.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomeView,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "@/views/AboutView.vue"),
  },
  {
    path: "/runs",
    name: "Runs",
    component: Runs,
  },
  {
    path: "/scratch",
    name: "Scratch",
    component: () =>
      import(/* webpackChunkName: "scratch" */ "@/views/ScratchView.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
