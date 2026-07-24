<script setup lang="ts">
import Sidebar from '../components/layout/Sidebar.vue';
import Navbar from '../components/layout/Navbar.vue';
</script>

<template>
  <div
  class="flex h-screen overflow-hidden"
  :style="{
    background: 'radial-gradient(circle at top, var(--surface-2), var(--background))'
  }"
>
    <Sidebar />

    <div class="flex flex-1 flex-col overflow-hidden">
      <Navbar />

      <main class="flex-1 overflow-auto p-4">
        <RouterView />
      </main>
    </div>
  </div>
</template>