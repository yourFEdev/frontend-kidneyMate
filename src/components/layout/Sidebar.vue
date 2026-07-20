<script setup lang="ts">
import {
  LayoutDashboard,
  Droplets,
  HeartPulse,
  CalendarDays,
  ChartSpline,
  FileText,
  Settings,
} from "lucide-vue-next"

import SidebarItem from "./SidebarItem.vue";
import ThemeToggle from "../common/ThemeToggle.vue";

const menus = [
  {
    title: "Dashboard",
    to: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Fluid",
    to: "/fluid",
    icon: Droplets,
  },
  {
    title: "Blood Pressure",
    to: "/pressure",
    icon: HeartPulse,
  },
  {
    title: "Schedule",
    to: "/schedule",
    icon: CalendarDays,
  },
  {
    title: "Insight",
    to: "/insight",
    icon: ChartSpline,
  },
  {
    title: "Reports",
    to: "/reports",
    icon: FileText,
  },
  {
    title: "Settings",
    to: "/settings",
    icon: Settings,
  },
]
</script>

<template>
  <aside
    class="flex w-[290px] flex-col  border p-6"
    style="
      background: var(--surface);
      border-color: var(--border);
      box-shadow: var(--shadow);
    "
  >
   <div class="flex items-center gap-4">
  <div
    class="flex h-14 w-14 items-center justify-center  text-white font-bold"
    style="background:linear-gradient(135deg,var(--primary),var(--secondary));"
  >
    K
  </div>

  <div>
    <h2 class="text-xl font-bold">Kidney Mate</h2>
    <p class="text-sm" style="color:var(--muted)">
      Daily Health Partner
    </p>
  </div>
</div>

    <div
      class="my-6 h-px"
      style="background:var(--border)"
    />

    <div class="flex flex-col gap-2">
      <SidebarItem
        v-for="item in menus"
        :key="item.to"
        v-bind="item"
      />
    </div>

    <div class="mt-auto">
      <div
        class="my-6 h-px"
        style="background:var(--border)"
      />

      <div class="flex items-center justify-between">
        <span
          class="font-medium"
          style="color:var(--muted)"
        >
          Theme
        </span>

        <ThemeToggle />
      </div>

      <div
        class="mt-6 flex items-center gap-3 rounded-2xl p-3 transition-all hover:translate-y-[-2px]"
        style="background:var(--background)"
      >
        <img
          src="https://i.pravatar.cc/100"
          class="h-12 w-12 rounded-full"
        />

        <div>
          <h4 class="font-semibold">
            Andre Eka
          </h4>

          <p
            class="text-sm"
            style="color:var(--muted)"
          >
            Frontend Developer
          </p>
        </div>
      </div>
    </div>
  </aside>
</template>