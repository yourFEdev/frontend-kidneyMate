import { createRouter, createWebHistory } from "vue-router";

import AppLayout from "../layouts/AppLayout.vue";
import AuthLayout from "../layouts/AuthLayout.vue";
const router = createRouter({
  history: createWebHistory(),

  routes: [
    {
      path: "/",
      component: AppLayout,
      children: [
        {
          path: "",
          redirect: "/dashboard",
        },
        {
          path: "dashboard",
          component: () => import("../pages/DashboardPage.vue"),
        },
        {
          path: "notes",
          component: () => import("../pages/DashboardPage.vue"),
        },
        {
          path: "insight",
          component: () => import("../pages/DashboardPage.vue"),
        },
        {
          path: "schedule",
          component: () => import("../pages/DashboardPage.vue"),
        },
        {
          path: "reports",
          component: () => import("../pages/DashboardPage.vue"),
        },
        {
          path: "profile",
          component: () => import("../pages/DashboardPage.vue"),
        },
        {
          path: "settings",
          component: () => import("../pages/DashboardPage.vue"),
        },
      ],
    },

    {
      path: "/",
      component: AuthLayout,
      children: [
        {
          path: "login",
          component: () => import("../pages/LoginPage.vue"),
        },
        {
          path: "register",
          component: () => import("../pages/RegisterPage.vue"),
        },
      ],
    },
  ],
});

export default router;