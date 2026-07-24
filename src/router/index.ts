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
          path: "fluid",
          component: () => import("../pages/FluidPage.vue"),
        },
        {
          path: "blood-pressure",
          component: () => import("../pages/BloodPressurePage.vue"),
        },
        {
          path: "schedule",
          component: () => import("../pages/SchedulePage.vue"),
        },
        {
          path: "insights",
          component: () => import("../pages/InsightPage.vue"),
        },
        {
          path: "reports",
          component: () => import("../pages/ReportPage.vue"),
        },
        {
          path: "settings",
          component: () => import("../pages/SettingPage.vue"),
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