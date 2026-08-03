<script setup lang="ts">
import {
  LayoutDashboard,
  Droplets,
  HeartPulse,
  CalendarDays,
  ChartSpline,
  FileText,
  Settings,
  LogOut,
  Heart,
  Weight,
} from "lucide-vue-next";

import SidebarItem from "./SidebarItem.vue";
import { useLayoutStore } from "../../stores/layout.ts";
import { useRouter } from "vue-router";
import { useAuthStore } from "../../stores/auth";
import { ref } from "vue";
import { toast } from "vue-sonner";

const router = useRouter();
const auth = useAuthStore();

const loggingOut = ref(false);

async function handleLogout() {
  if (loggingOut.value) return;

  loggingOut.value = true;

  try {
    await auth.logout();
    toast.success("Logout Successfully");
    router.replace("/login");
  } finally {
    loggingOut.value = false;
  }
}
const layout = useLayoutStore();

const menus = [
  {
    group: "Health",
    items: [
      {
        title: "Dashboard",
        to: "/dashboard",
        icon: LayoutDashboard,
      },
      {
        title: "Blood Pressure",
        to: "/blood-pressure",
        icon: HeartPulse,
      },
      {
        title: "Fluid",
        to: "/fluid",
        icon: Droplets,
      },
      {
        title: "Schedule",
        to: "/schedule",
        icon: CalendarDays,
      },
      {
        title: "Weight",
        to: "/weight",
        icon: Weight,
      },
    ],
  },
  {
    group: "Analytics",
    items: [
      {
        title: "Insights",
        to: "/insights",
        icon: ChartSpline,
      },
      {
        title: "Reports",
        to: "/reports",
        icon: FileText,
      },
    ],
  },
  {
    group: "System",
    items: [
      {
        title: "Settings",
        to: "/settings",
        icon: Settings,
      },
    ],
  },
];
</script>

<template>
  <!-- Overlay Mobile -->
  <Transition name="fade">
    <div
      v-if="layout.mobileSidebar"
      class="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
      @click="layout.closeMobileSidebar"
    />
  </Transition>

  <!-- Sidebar -->
  <aside
    :class="[
      'fixed lg:relative z-50 m-4 flex h-[calc(100vh-2rem)] flex-col rounded-3xl border transition-all duration-300 ease-in-out',
      layout.sidebarOpen ? 'lg:w-72' : 'lg:w-20',
      'w-72',
      layout.mobileSidebar
        ? 'translate-x-0'
        : '-translate-x-[120%] lg:translate-x-0',
    ]"
    :style="{
      background: 'var(--sidebar)',
      borderColor: 'var(--sidebar-border)',
      boxShadow: 'var(--shadow)',
      backdropFilter: 'blur(18px)',
    }"
  >
    <!-- Logo -->
    <div
      class="flex items-center border-b p-4"
      :style="{ borderColor: 'var(--border)' }"
    >
      <div
        class="flex h-12 w-12 items-center justify-center rounded-2xl"
        :style="{ background: 'var(--primary-soft)' }"
      >
        <Heart class="h-6 w-6" :style="{ color: 'var(--primary)' }" />
      </div>

      <Transition name="fade">
        <div v-if="layout.sidebarOpen" class="ml-4">
          <h2
            class="text-lg font-semibold"
            :style="{ color: 'var(--foreground)' }"
          >
            KidneyMate
          </h2>

          <p class="text-sm" :style="{ color: 'var(--muted)' }">
            Dialysis Companion
          </p>
        </div>
      </Transition>
    </div>

    <!-- Menu -->
    <div class="flex-1 overflow-y-auto px-3 py-5">
      <div v-for="group in menus" :key="group.group" class="mb-6">
        <Transition name="fade">
          <p
            v-if="layout.sidebarOpen"
            class="mb-3 px-3 text-xs font-semibold uppercase tracking-widest"
            :style="{ color: 'var(--muted)' }"
          >
            {{ group.group }}
          </p>
        </Transition>

        <div class="space-y-1">
          <SidebarItem
            v-for="item in group.items"
            :key="item.to"
            :title="item.title"
            :to="item.to"
            :icon="item.icon"
            :collapsed="!layout.sidebarOpen"
          />
        </div>
      </div>
    </div>

    <!-- Footer -->
    <div class="border-t p-3" :style="{ borderColor: 'var(--border)' }">
      <button
        @click="handleLogout"
        class="flex h-12 w-full cursor-pointer items-center rounded-2xl transition-all hover:bg-red-50 dark:hover:bg-red-950/40"
        :class="layout.sidebarOpen ? 'justify-start px-4' : 'justify-center'"
        :style="{ color: '#ef4444' }"
      >
        <LogOut class="h-5 w-5 shrink-0" />

        <Transition name="fade">
          <span
            v-if="layout.sidebarOpen"
            class="ml-3 font-medium text-[var(--muted)]"
          >
            Logout
          </span>
        </Transition>
      </button>
    </div>
  </aside>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
