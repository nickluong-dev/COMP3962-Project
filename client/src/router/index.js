import { createRouter, createWebHistory } from "vue-router";
import FrontPage from "../views/FrontPage.vue";

const routes = [
  {
    path: "/",
    name: "Fronte",
    component: FrontPage,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
