<script setup lang="ts">
import { onMounted } from "vue";
import { storeToRefs } from "pinia";
import {
  BaseCard,
  BaseButton,
  BaseDialog,
  BaseInput,
  BaseFormField,
  BaseHeader,
} from "../components/common";
import { useScheduleStore } from "../stores/schedule.store";
import { HeaderSkeleton } from "../components/skeleton";
import { toast } from "vue-sonner";
import { Trash2, CalendarDays, Clock3, Pencil, Plus } from "lucide-vue-next";
import { ref } from "vue";

const showDialog = ref(false);
const isSaving = ref(false);
function openCreate() {
  resetForm();
  showDialog.value = true;
}

function resetForm() {
  editMode.value = false;

  selectedId.value = null;

  form.value = {
    type: "dialysis",
    title: "",
    description: "",
    scheduled_at: new Date().toISOString().slice(0, 16),
  };
}

const scheduleStore = useScheduleStore();

const { dialysisSchedules, medicationSchedules, doctorSchedules, loading } =
  storeToRefs(scheduleStore);

onMounted(() => {
  scheduleStore.fetchSchedules();
});

const editMode = ref(false);

const selectedId = ref<number | null>(null);

const form = ref({
  type: "dialysis",
  title: "",
  description: "",
  scheduled_at: "",
});

function openEdit(item: any) {
  editMode.value = true;

  selectedId.value = item.id;

  form.value = {
    type: item.type,
    title: item.title,
    description: item.description,
    scheduled_at: new Date(item.scheduled_at).toISOString().slice(0, 16),
  };

  showDialog.value = true;
}

const handleSave = async () => {
  isSaving.value = true;

  try {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (editMode.value) {
      await scheduleStore.updateSchedule(selectedId.value!, form.value);
      toast.success("Schedule updated successfully");
    } else {
      await scheduleStore.createSchedule(form.value);
      toast.success("Schedule created successfully");
    }

    showDialog.value = false;
  } finally {
    isSaving.value = false;
  }
};
</script>

<template>
  <div class="space-y-8 text-[var(--muted)]">
    <!-- Header -->
    <HeaderSkeleton v-if="loading" />
    <BaseHeader
      title="Schedule"
      subtitle="Stay on top of your dialysis sessions and medication schedule."
      v-else
    >
    </BaseHeader>

    <!-- First Card -->
    <BaseCard
      title="Manage Your Schedule"
      description="Create and manage dialysis, medication and consultation schedules."
    >
      <template #action>
        <BaseButton variant="ghost" @click="openCreate">
          <Plus class="mr-2 h-4 w-4" />
          Add Record
        </BaseButton>
      </template>
    </BaseCard>

    <section class="grid gap-6 lg:grid-cols-3">
      <!-- Dialysis -->
      <BaseCard
        title="Dialysis"
        description="Dialysis schedules"
        class="h-[650px]"
      >
        <div class="h-[520px] space-y-3 overflow-y-auto pr-1">
          <BaseCard
            v-for="item in dialysisSchedules"
            :key="item.id"
            class="transition-all hover:shadow-md"
            :hoverable="false"
          >
            <div class="space-y-4">
              <!-- Header -->
              <div class="flex items-start justify-between">
                <div class="flex gap-3">
                  <div>
                    <h3 class="font-semibold text-[var(--foreground)]">
                      {{ item.title }}
                    </h3>

                    <p class="text-sm text-[var(--muted)]">
                      {{ item.description }}
                    </p>
                  </div>
                </div>

                <span
                  class="rounded-full px-3 py-1 text-xs font-medium"
                  :class="{
                    'bg-green-100 text-green-700': item.status === 'completed',
                    'bg-yellow-100 text-yellow-700':
                      item.status === 'scheduled',
                    'bg-red-100 text-red-700': item.status === 'cancelled',
                  }"
                >
                  {{ item.status }}
                </span>
              </div>

              <!-- Date -->
              <div
                class="flex items-center justify-between rounded-xl bg-[var(--surface-2)] p-3 text-sm"
              >
                <div class="flex items-center gap-2">
                  <CalendarDays class="h-4 w-4" />
                  {{ new Date(item.scheduled_at).toLocaleDateString() }}
                </div>

                <div class="flex items-center gap-2">
                  <Clock3 class="h-4 w-4" />
                  {{
                    new Date(item.scheduled_at).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                  }}
                </div>
              </div>

              <!-- Action -->
              <div class="flex justify-end gap-2">
                <BaseButton
                  size="icon"
                  variant="outline"
                  @click="openEdit(item)"
                >
                  <Pencil class="h-4 w-4" />
                </BaseButton>

                <BaseButton size="icon" variant="destructive">
                  <Trash2 class="h-4 w-4" />
                </BaseButton>
              </div>
            </div>
          </BaseCard>
        </div>
      </BaseCard>

      <!-- Medication -->
      <BaseCard
        title="Medication"
        description="Medication reminders"
        class="h-[650px]"
      >
        <div class="h-[520px] space-y-3 overflow-y-auto pr-1">
          <BaseCard
            v-for="item in medicationSchedules"
            :key="item.id"
            class="transition-all hover:shadow-md"
            :hoverable="false"
          >
            <div class="space-y-4">
              <!-- Header -->
              <div class="flex items-start justify-between">
                <div class="flex gap-3">
                  <div>
                    <h3 class="font-semibold text-[var(--foreground)]">
                      {{ item.title }}
                    </h3>

                    <p class="text-sm text-[var(--muted)]">
                      {{ item.description }}
                    </p>
                  </div>
                </div>

                <span
                  class="rounded-full px-3 py-1 text-xs font-medium"
                  :class="{
                    'bg-green-100 text-green-700': item.status === 'completed',
                    'bg-yellow-100 text-yellow-700':
                      item.status === 'scheduled',
                    'bg-red-100 text-red-700': item.status === 'cancelled',
                  }"
                >
                  {{ item.status }}
                </span>
              </div>

              <!-- Date -->
              <div
                class="flex items-center justify-between rounded-xl bg-[var(--surface-2)] p-3 text-sm"
              >
                <div class="flex items-center gap-2">
                  <CalendarDays class="h-4 w-4" />
                  {{ new Date(item.scheduled_at).toLocaleDateString() }}
                </div>

                <div class="flex items-center gap-2">
                  <Clock3 class="h-4 w-4" />
                  {{
                    new Date(item.scheduled_at).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                  }}
                </div>
              </div>

              <!-- Action -->
              <div class="flex justify-end gap-2">
                <BaseButton
                  size="icon"
                  variant="outline"
                  @click="openEdit(item)"
                >
                  <Pencil class="h-4 w-4" />
                </BaseButton>

                <BaseButton size="icon" variant="destructive">
                  <Trash2 class="h-4 w-4" />
                </BaseButton>
              </div>
            </div>
          </BaseCard>
        </div>
      </BaseCard>

      <!-- Doctor -->
      <BaseCard
        title="Doctor"
        description="Doctor consultations"
        class="h-[650px]"
      >
        <div class="h-[520px] space-y-3 overflow-y-auto pr-1">
          <BaseCard
            v-for="item in doctorSchedules"
            :key="item.id"
            class="transition-all hover:shadow-md"
            :hoverable="false"
          >
            <div class="space-y-4">
              <!-- Header -->
              <div class="flex items-start justify-between">
                <div class="flex gap-3">
                  <div>
                    <h3 class="font-semibold text-[var(--foreground)]">
                      {{ item.title }}
                    </h3>

                    <p class="text-sm text-[var(--muted)]">
                      {{ item.description }}
                    </p>
                  </div>
                </div>

                <span
                  class="rounded-full px-3 py-1 text-xs font-medium"
                  :class="{
                    'bg-green-100 text-green-700': item.status === 'completed',
                    'bg-yellow-100 text-yellow-700':
                      item.status === 'scheduled',
                    'bg-red-100 text-red-700': item.status === 'cancelled',
                  }"
                >
                  {{ item.status }}
                </span>
              </div>

              <!-- Date -->
              <div
                class="flex items-center justify-between rounded-xl bg-[var(--surface-2)] p-3 text-sm"
              >
                <div class="flex items-center gap-2">
                  <CalendarDays class="h-4 w-4" />
                  {{ new Date(item.scheduled_at).toLocaleDateString() }}
                </div>

                <div class="flex items-center gap-2">
                  <Clock3 class="h-4 w-4" />
                  {{
                    new Date(item.scheduled_at).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                  }}
                </div>
              </div>

              <!-- Action -->
              <div class="flex justify-end gap-2">
                <BaseButton
                  size="icon"
                  variant="outline"
                  @click="openEdit(item)"
                >
                  <Pencil class="h-4 w-4" />
                </BaseButton>

                <BaseButton size="icon" variant="destructive">
                  <Trash2 class="h-4 w-4" />
                </BaseButton>
              </div>
            </div>
          </BaseCard>
        </div>
      </BaseCard>
    </section>
  </div>

  <!--  -->
  <BaseDialog
    v-model:open="showDialog"
    :title="editMode ? 'Edit Schedule' : 'Create Schedule'"
    :description="editMode ? 'Update your schedule.' : 'Create a new schedule.'"
  >
    <div class="space-y-5">
      <BaseFormField label="Schedule Type">
        <select
          v-model="form.type"
          class="w-full rounded-xl border px-3 py-2"
          :style="{
            background: 'var(--surface-2)',
            borderColor: 'var(--border)',
            color: 'var(--foreground)',
          }"
        >
          <option value="dialysis">Dialysis</option>
          <option value="medication">Medication</option>
          <option value="doctor">Doctor Consultation</option>
        </select>
      </BaseFormField>

      <BaseFormField label="Title">
        <BaseInput v-model="form.title" placeholder="Morning Dialysis" />
      </BaseFormField>

      <BaseFormField label="Description">
        <BaseInput v-model="form.description" placeholder="Routine dialysis" />
      </BaseFormField>

      <BaseFormField label="Date & Time">
        <BaseInput type="datetime-local" v-model="form.scheduled_at" />
      </BaseFormField>
    </div>

    <template #footer>
      <div class="flex justify-end gap-3">
        <BaseButton
          variant="outline"
          @click="showDialog = false"
          :disabled="isSaving"
        >
          Cancel
        </BaseButton>

        <BaseButton
          @click="handleSave"
          :loading="isSaving"
          :disabled="isSaving"
        >
          {{ editMode ? "Update" : "Create" }}
        </BaseButton>
      </div>
    </template>
  </BaseDialog>
</template>
