<script setup lang="ts">
import { computed } from "vue";
import Input from "../ui/input/Input.vue";

const props = defineProps<{
  label?: string;
  modelValue?: string;
  placeholder?: string;
  type?: string;
  error?: string;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();

const value = computed({
  get: () => props.modelValue,
  set: (v) => emit("update:modelValue", v ?? ""),
});
</script>

<template>
  <div class="space-y-2">

    <label
      v-if="label"
      class="text-sm font-medium"
      :style="{ color: 'var(--foreground)' }"
    >
      {{ label }}
    </label>

    <Input
      v-model="value"
      :type="type ?? 'text'"
      :placeholder="placeholder"
      class="h-11 rounded-xl"
    />

    <p
      v-if="error"
      class="text-sm text-red-500"
    >
      {{ error }}
    </p>

  </div>
</template>