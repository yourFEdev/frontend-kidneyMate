<script setup lang="ts">
import { BaseCard, BaseSkeleton } from "../common/";
</script>

<template>
  <BaseCard>
    <div class="space-y-4">
      <BaseSkeleton class="h-5 w-52" />

      <BaseSkeleton class="h-80 w-full rounded-2xl" />
    </div>
  </BaseCard>
</template>
