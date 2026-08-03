import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "../stores/auth.ts";

import AppLayout from "../layouts/AppLayout.vue";
import AuthLayout from "../layouts/AuthLayout.vue";

const router = createRouter({
  history: createWebHistory(),

  routes: [
    {
      path: "/",
      component: AppLayout,
      meta: {
        requiresAuth: true,
      },
      children: [
        {
          path: "",
          redirect: "/dashboard",
          meta: {
            requiresAuth: true,
          },
        },
        {
          path: "dashboard",
          component: () => import("../pages/DashboardPage.vue"),
          meta: {
            requiresAuth: true,
          },
        },
        {
          path: "fluid",
          component: () => import("../pages/FluidPage.vue"),
          meta: {
            requiresAuth: true,
          },
        },
        {
          path: "blood-pressure",
          component: () => import("../pages/BloodPressurePage.vue"),
          meta: {
            requiresAuth: true,
          },
        },
        {
          path: "weight",
          component: () => import("../pages/WeightPage.vue"),
          meta: {
            requiresAuth: true,
          },
        },
        {
          path: "schedule",
          component: () => import("../pages/SchedulePage.vue"),
          meta: {
            requiresAuth: true,
          },
        },
        {
          path: "insights",
          component: () => import("../pages/InsightPage.vue"),
          meta: {
            requiresAuth: true,
          },
        },
        {
          path: "reports",
          component: () => import("../pages/ReportPage.vue"),
          meta: {
            requiresAuth: true,
          },
        },
        {
          path: "settings",
          component: () => import("../pages/SettingPage.vue"),
          meta: {
            requiresAuth: true,
          },
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
          meta: {
            guestOnly: true,
          },
        },
        {
          path: "register",
          component: () => import("../pages/RegisterPage.vue"),
          meta: {
            guestOnly: true,
          },
        },
      ],
    },
  ],
});

router.beforeEach((to) => {
  const auth = useAuthStore();

  if (to.meta.requiresAuth && !auth.isAuthenticated) {
    return "/login";
  }

  if (to.meta.guestOnly && auth.isAuthenticated) {
    return "/dashboard";
  }
});

export default router;
