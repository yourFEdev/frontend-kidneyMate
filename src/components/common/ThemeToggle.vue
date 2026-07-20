<script setup lang="ts">
import { Moon, Sun } from "lucide-vue-next";
import { useTheme } from "../composables/useTheme";
const { theme, toggleTheme } = useTheme();
</script>

<template>
  <button @click="toggleTheme">
    <Sun v-if="theme === 'light'" />
    <Moon v-else />
  </button>
</template>