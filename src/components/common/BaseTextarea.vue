<script setup lang="ts">
interface Props {
  modelValue?: string;
  placeholder?: string;
}

defineProps<Props>();

const emit = defineEmits<{
  "update:modelValue": [value: string];
}>();
</script>

<template>
  <textarea
    :value="modelValue"
    :placeholder="placeholder"
    @input="
      emit('update:modelValue', ($event.target as HTMLTextAreaElement).value)
    "
    rows="4"
    class="w-full resize-none rounded-xl border px-4 py-3 text-sm outline-none focus:ring-2"
    :style="{
      background: 'var(--surface-2)',
      borderColor: 'var(--border)',
      color: 'var(--foreground)',
    }"
  />
</template>
