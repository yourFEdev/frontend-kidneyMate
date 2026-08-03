<script setup lang="ts">
import { Menu, Moon, Sun } from "lucide-vue-next";

import { useLayoutStore } from "../../stores/layout";
import { useThemeStore } from "../../stores/theme";
import { useAuthStore } from "../../stores/auth";
import { storeToRefs } from "pinia";
import { computed } from "vue";

const userInitial = computed(() => {
  if (!user.value?.name) return "G";

  return user.value.name
    .trim()
    .split(" ")
    .map((word) => word[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
});

const layout = useLayoutStore();
const theme = useThemeStore();

const auth = useAuthStore();

const { user } = storeToRefs(auth);
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
        class="flex h-10 w-10 items-center justify-center rounded-xl transition hover:bg-[var(--surface-2)] text-[var(--muted)] cursor-pointer"
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
        <Sun v-if="theme.dark" class="h-5 w-5 text-[var(--muted)]" />
        <Moon v-else class="h-5 w-5 text-[var(--muted)]" />
      </button>
      <button
        class="group flex items-center gap-3 rounded-2xl p-2 transition-all duration-200 hover:bg-[var(--surface-2)]"
      >
        <!-- Avatar -->
        <div
          class="flex h-11 w-11 shrink-0 items-center justify-center rounded-full font-semibold text-sm shadow-sm"
          :style="{
            background: 'var(--primary-soft)',
            color: 'var(--primary)',
          }"
        >
          {{ userInitial }}
        </div>

        <!-- User Info -->
        <div class="min-w-0 text-left">
          <h4
            class="truncate text-sm font-semibold text-[var(--foreground)] transition-colors group-hover:text-[var(--primary)]"
          >
            {{ user?.name ?? "Guest" }}
          </h4>

          <p class="truncate text-xs text-[var(--muted)]">
            {{ user?.email ?? "Not signed in" }}
          </p>
        </div>
      </button>
    </div>
  </header>
</template>
