<script setup lang="ts">
import { Bell, Search } from "lucide-vue-next"
import ThemeToggle from "../common/ThemeToggle.vue";
</script>

<template>
  <header
    class="flex h-26 items-center justify-between border px-6"
    style="
      background:var(--surface);
      border-color:var(--border);
      box-shadow:var(--shadow);
    "
  >
    <div>
      <h1 class="text-2xl font-bold">
        Dashboard
      </h1>

     
    </div>

    <div class="flex items-center gap-4">
      <div
        class="flex h-12 w-[280px] items-center gap-3 rounded-2xl px-4"
        style="background:var(--background)"
      >
        <Search
          :size="18"
          style="color:var(--muted)"
        />

        <input
          placeholder="Search..."
          class="flex-1 bg-transparent outline-none"
        />
      </div>

      <ThemeToggle />

      <button
        class="flex h-12 w-12 items-center justify-center rounded-2xl transition hover:scale-105"
        style="background:var(--background)"
      >
        <Bell :size="20" />
      </button>

      <img
        src="https://i.pravatar.cc/100"
        class="h-12 w-12 rounded-full"
      />
    </div>
  </header>
</template>