import {createRouter, createWebHistory} from "vue-router";
import TimerPage from "@/views/TimerPage.vue";
import MenuView from "@/views/MenuView.vue";
import PlayView from "@/views/PlayView.vue";

const routes = [
    {
        path: "/menu/:id",
        name: "PlayView",
        component: PlayView,
    },
    {
        path: "/menu",
        name: "MenuView",
        component: MenuView,
    },
    {
        path: "/",
        name: "TimerPage",
        component: TimerPage,
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;
