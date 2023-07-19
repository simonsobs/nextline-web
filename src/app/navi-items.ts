import { RouteLocationRaw } from "vue-router";

interface NaviItem {
  icon: string;
  title: string;
  to: RouteLocationRaw;
  exact: boolean;
}

const naviItems: NaviItem[] = [
  {
    icon: "mdi-home",
    title: "Main",
    to: { name: "home" },
    exact: true,
  },
  {
    icon: "mdi-history",
    title: "History",
    to: { name: "runs" },
    exact: false,
  },
];

export default naviItems;
