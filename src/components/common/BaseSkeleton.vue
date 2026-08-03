<script setup lang="ts">
import { Skeleton } from "../ui/skeleton";

interface Props {
  class?: string;
}

defineProps<Props>();
</script>

<template>
  <Skeleton :class="class" />
</template>
