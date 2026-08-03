<script setup lang="ts">
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog/";

const open = defineModel<boolean>("open", {
  default: false,
});

defineProps<{
  title?: string;
  description?: string;
  width?: string;
}>();
</script>

<template>
  <Dialog v-model:open="open">
    <DialogContent
      :class="width ?? 'sm:max-w-lg'"
      class="rounded-3xl border p-6 backdrop-blur-xl"
      :style="{
        background: 'var(--sidebar)',
        borderColor: 'var(--sidebar-border)',
        boxShadow: 'var(--shadow)',
        color: 'var(--foreground)',
      }"
    >
      <DialogHeader v-if="title || description">
        <DialogTitle :style="{ color: 'var(--foreground)' }">
          {{ title }}
        </DialogTitle>

        <DialogDescription
          v-if="description"
          :style="{ color: 'var(--muted)' }"
        >
          {{ description }}
        </DialogDescription>
      </DialogHeader>

      <div class="py-4">
        <slot />
      </div>

      <DialogFooter v-if="$slots.footer">
        <slot name="footer" />
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
