import { createRouter, createWebHistory } from "vue-router";
import TimerPage from "@/views/TimerPage.vue";
import PlayView from "@/views/PlayView.vue";

const routes = [
  {
    path: "/menu",
    name: "MenuView",
    component: PlayView
  },
  {
    path: "/",
    name: "TimerPage",
    component: TimerPage
  },
  {
    path: "/:catchAll(.*)",
    redirect: "/"
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
