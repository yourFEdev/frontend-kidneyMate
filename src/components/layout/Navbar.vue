<script setup lang="ts">
import {
  Menu,
  Moon,
  Sun,
  CircleUserRound,
} from "lucide-vue-next";

import { useLayoutStore } from "../../stores/layout";
import { useThemeStore } from "../../stores/theme";

const layout = useLayoutStore();
const theme = useThemeStore();
</script>

<template>
  <header
    class="sticky top-4 z-30 mx-4 mt-4 flex h-18 items-center justify-between rounded-3xl border px-6 backdrop-blur-xl"
    :style="{
      background: 'var(--sidebar)',
      borderColor: 'var(--sidebar-border)',
      boxShadow: 'var(--shadow)',
      backdropFilter: 'blur(18px)',
    }"
   
  >
    <!-- Left -->
    <div class="flex items-center gap-4">
      <button
        class="flex h-10 w-10 items-center justify-center rounded-xl transition hover:bg-[var(--surface-2)] cursor-pointer"
        @click="layout.toggleSidebar"
      >
        <Menu class="h-5 w-5" />
      </button>
    </div>
    <div class="flex items-center gap-3">
      <button
        class="flex h-10 w-10 items-center justify-center rounded-xl transition hover:bg-[var(--surface-2)] cursor-pointer"
        @click="theme.toggle()"
      >
        <Sun
          v-if="theme.dark"
          class="h-5 w-5 text-[var(--muted)]"
        />
        <Moon
          v-else
          class="h-5 w-5 text-[var(--muted)]"
        />
      </button>
      <button
        class="flex items-center gap-3 rounded-2xl p-1 pr-3 transition hover:bg-[var(--surface-2)]"
      >
        <div
          class="flex h-10 w-10 items-center justify-center rounded-full"
          :style="{ background:'var(--primary-soft)' }"
        >
          <CircleUserRound
            class="h-6 w-6"
            :style="{ color:'var(--primary)' }"
          />
        </div>
        <div class="hidden md:block text-left">
          <h4 class="font-medium text-[var(--muted)]">
            Andre
          </h4>
          <p
            class="text-xs"
            :style="{ color:'var(--muted)' }"
          >
            andre@mail.com
          </p>
        </div>
      </button>
    </div>
  </header>
</template>