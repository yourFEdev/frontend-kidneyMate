<script setup lang="ts">
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../../components/ui/alert-dialog";

const open = defineModel<boolean>("open", { default: false });

defineProps({
  title: {
    type: String,
    default: "Are you sure?",
  },
  description: {
    type: String,
    default: "This action cannot be undone.",
  },
  confirmText: {
    type: String,
    default: "Delete",
  },
  cancelText: {
    type: String,
    default: "Cancel",
  },
});

const emit = defineEmits<{
  confirm: [];
}>();

const onConfirm = () => {
  emit("confirm");
  open.value = false;
};
</script>

<template>
  <AlertDialog v-model:open="open">
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>
          {{ title }}
        </AlertDialogTitle>

        <AlertDialogDescription>
          {{ description }}
        </AlertDialogDescription>
      </AlertDialogHeader>

      <AlertDialogFooter>
        <AlertDialogCancel>
          {{ cancelText }}
        </AlertDialogCancel>

        <AlertDialogAction
          class="bg-red-600 text-white hover:bg-red-700"
          @click="onConfirm"
        >
          {{ confirmText }}
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</template>
