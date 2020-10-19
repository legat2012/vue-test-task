import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "MainPage",
    component: () => import("../views/Main.vue")
  },
  {
    path: "/history/",
    name: "HistoryPage",
    component: () =>
      import("../views/History.vue"),
    children: [
      {
        path: ":type"
      }
    ]
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
