<script setup lang="ts">
interface Props {
  modelValue?: string | number;
  type?: string;
  placeholder?: string;
  disabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  type: "text",
  placeholder: "",
  disabled: false,
});

const emit = defineEmits<{
  "update:modelValue": [value: string | number];
}>();
</script>

<template>
  <input
    :value="modelValue"
    :type="type"
    :placeholder="placeholder"
    :disabled="disabled"
    @input="
      emit('update:modelValue', ($event.target as HTMLInputElement).value)
    "
    class="h-11 w-full rounded-xl border px-4 text-sm outline-none transition-all focus:ring-2 disabled:opacity-50"
    :style="{
      background: 'var(--surface-2)',
      borderColor: 'var(--border)',
      color: 'var(--foreground)',
    }"
  />
</template>
