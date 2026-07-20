<script setup lang="ts">
import Sidebar from "../components/layout/Sidebar.vue";
import Navbar from "../components/layout/Navbar.vue";
</script>

<template>
  <div
    class="flex h-screen "
    style="background:var(--background)"
  >
    <Sidebar />

    <div class="flex flex-1 flex-col gap-6">
      <Navbar />

      <main class="flex-1 overflow-auto">
        <RouterView />
      </main>
    </div>
  </div>
</template>