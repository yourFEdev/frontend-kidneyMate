<script setup lang="ts">
import { Loader2 } from "lucide-vue-next";
import Button from "../ui/button/Button.vue";

interface Props {
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  size?: "default" | "sm" | "lg" | "icon";
  loading?: boolean;
  disabled?: boolean;
  block?: boolean;
  className?: string;
}

withDefaults(defineProps<Props>(), {
  variant: "default",
  size: "default",
  loading: false,
  disabled: false,
  block: false,
  className: "",
});
</script>

<template>
  <Button
    v-bind="$attrs"
    :variant="variant"
    :size="size"
    :disabled="disabled || loading"
    :class="[
      block && 'w-full',
      'rounded-2xl',
      'font-medium',
      'transition-all duration-200',
      'hover:-translate-y-0.5',
      'active:translate-y-0',
      'focus-visible:ring-2',
      'disabled:pointer-events-none',
      'disabled:opacity-50',
      'shadow-sm',
      'hover:shadow-md',
      'cursor-pointer',
      'bg-[var(--sidebar-active)]',
      'text-[var(--primary)]',
      'hover:bg-[var(--sidebar-hover)]',

      className,
    ]"
  >
    <Loader2 v-if="loading" class="mr-2 h-4 w-4 animate-spin" />
    <slot />
  </Button>
</template>
