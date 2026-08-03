<script setup lang="ts">
import { ref, onMounted } from "vue";
import { storeToRefs } from "pinia";
import { toast } from "vue-sonner";
import {
  HeartPulse,
  Activity,
  CircleCheck,
  Clock3,
  Plus,
  Info,
  Pencil,
  Trash2,
} from "lucide-vue-next";

import {
  StatSkeleton,
  TableSkeleton,
  ChartSkeleton,
  HeaderSkeleton,
} from "../components/skeleton";
import Chart from "../components/charts/Chart.vue";
import {
  BaseCard,
  BaseButton,
  BaseDialog,
  BaseFormField,
  BaseInput,
  BaseHeader,
} from "../components/common/";

import { useBloodPressureStore } from "../stores/bloodPressure.store";
const bpStore = useBloodPressureStore();

const {
  bloodPressures,
  latest,
  todayCount,
  chartData,
  latestMeasuredTime,
  loading,
} = storeToRefs(bpStore);

const showDialog = ref(false);
const showDeleteDialog = ref(false);

const editMode = ref(false);
const selectedId = ref<number | null>(null);

const form = ref({
  systolic: "",
  diastolic: "",
  pulse: "",
  measured_at: "",
});

onMounted(() => {
  bpStore.getBloodPressures();
});

function resetForm() {
  form.value = {
    systolic: "",
    diastolic: "",
    pulse: "",
    measured_at: "",
  };

  editMode.value = false;
  selectedId.value = null;
}

function openCreate() {
  resetForm();
  form.value.measured_at = new Date().toISOString().slice(0, 16);
  showDialog.value = true;
}

function openEdit(item: any) {
  editMode.value = true;
  selectedId.value = item.id;

  form.value = {
    systolic: String(item.systolic),
    diastolic: String(item.diastolic),
    pulse: String(item.pulse),
    measured_at: new Date(item.measured_at).toISOString().slice(0, 16),
  };

  showDialog.value = true;
}
const isSaving = ref(false);

async function handleSave() {
  isSaving.value = true;
  await new Promise((resolve) => setTimeout(resolve, 1500));
  try {
    const payload = {
      systolic: Number(form.value.systolic),
      diastolic: Number(form.value.diastolic),
      pulse: Number(form.value.pulse),
      measured_at: form.value.measured_at,
    };

    if (editMode.value && selectedId.value !== null) {
      await bpStore.updateBloodPressure(selectedId.value, payload);
      toast.success("Update Success");
    } else {
      await bpStore.createBloodPressure(payload);
      toast.success("Create Success");
    }
    showDialog.value = false;
    resetForm();
  } finally {
    isSaving.value = false;
  }
}

function openDeleteDialog(id: number) {
  selectedId.value = id;
  showDeleteDialog.value = true;
}

async function handleDelete() {
  if (selectedId.value === null) return;

  await bpStore.deleteBloodPressure(selectedId.value);
  toast.success("Delete Success");
  showDeleteDialog.value = false;
  selectedId.value = null;
}
</script>

<template>
  <div class="space-y-8 text-[var(--muted)]">
    <!-- Header -->
    <HeaderSkeleton v-if="loading" />
    <BaseHeader
      title="Blood Pressure"
      subtitle="Track and monitor your blood pressure readings."
      v-else
    />
    <!-- Summary -->
    <StatSkeleton v-if="loading" />
    <section class="grid gap-6 lg:grid-cols-12" v-else>
      <BaseCard class="lg:col-span-6" title="Latest Reading">
        <div class="space-y-2">
          <div class="flex items-center gap-4">
            <div
              class="flex h-14 w-14 items-center justify-center rounded-2xl"
              :style="{ background: 'var(--primary-soft)' }"
            >
              <HeartPulse
                class="h-7 w-7"
                :style="{ color: 'var(--primary)' }"
              />
            </div>
            <div>
              <h2 class="text-5xl font-bold">
                {{ latest?.systolic ?? "-" }}
                /
                {{ latest?.diastolic ?? "-" }}
              </h2>
              <p :style="{ color: 'var(--muted)' }" class="px-2">
                Recorded at {{ latestMeasuredTime }}
              </p>
            </div>
          </div>
        </div>
      </BaseCard>

      <!-- Pulse -->

      <BaseCard class="lg:col-span-2">
        <Activity class="mb-5 h-8 w-8 text-red-500" />
        <p class="text-sm text-[var(--muted)]">Pulse</p>
        <h2 class="mt-2 text-3xl font-bold">{{ latest?.pulse ?? "-" }} bpm</h2>
      </BaseCard>

      <!-- Status -->

      <BaseCard class="lg:col-span-2">
        <CircleCheck class="mb-5 h-8 w-8 text-green-500" />

        <p class="text-sm text-[var(--muted)]">Status</p>

        <h2 class="mt-2 text-2xl font-bold">Normal</h2>
      </BaseCard>

      <!-- Records -->

      <BaseCard class="lg:col-span-2">
        <Clock3 class="mb-5 h-8 w-8 text-blue-500" />

        <p class="text-sm text-[var(--muted)]">Today's Records</p>

        <h2 class="mt-2 text-3xl font-bold">
          {{ todayCount }}
        </h2>
      </BaseCard>
    </section>
    <!-- Table -->
    <TableSkeleton v-if="loading" />
    <BaseCard
      title="Blood Pressure History"
      description="All blood pressure records"
      v-else
    >
      <template #action>
        <BaseButton variant="ghost" @click="openCreate">
          <Plus class="mr-2 h-4 w-4" />
          Add Record
        </BaseButton>
      </template>

      <div
        class="overflow-hidden rounded-2xl border"
        :style="{ borderColor: 'var(--border)' }"
      >
        <table class="w-full">
          <thead
            class="text-sm"
            :style="{
              background: 'var(--surface-2)',
              color: 'var(--muted)',
            }"
          >
            <tr>
              <th class="px-5 py-4 text-left">Date</th>
              <th class="px-5 py-4 text-left">Time</th>
              <th class="px-5 py-4 text-left">Blood Pressure</th>
              <th class="px-5 py-4 text-left">Pulse</th>
              <th class="px-5 py-4 text-left">Status</th>
              <th class="px-5 py-4 text-right">Action</th>
            </tr>
          </thead>

          <tbody>
            <tr
              v-for="bloodPressure in bloodPressures"
              :key="bloodPressure.id"
              class="border-t transition hover:bg-black/5 dark:hover:bg-white/5"
              :style="{ borderColor: 'var(--border)' }"
            >
              <td class="px-5 py-4">
                {{ new Date(bloodPressure.measured_at).toLocaleDateString() }}
              </td>

              <td class="px-5 py-4">
                {{
                  new Date(bloodPressure.measured_at).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                }}
              </td>

              <td class="px-5 py-4 font-medium">
                {{ bloodPressure.systolic }}/{{ bloodPressure.diastolic }} mmHg
              </td>

              <td class="px-5 py-4">{{ bloodPressure.pulse }} bpm</td>

              <td class="px-5 py-4">
                <span
                  class="rounded-full bg-green-100 px-2 py-1 text-xs text-green-700"
                >
                  Normal
                </span>
              </td>

              <td class="px-5 py-4">
                <div class="flex justify-end gap-2">
                  <BaseButton
                    size="icon"
                    variant="outline"
                    @click="openEdit(bloodPressure)"
                  >
                    <Pencil class="h-4 w-4" />
                  </BaseButton>

                  <BaseButton
                    size="icon"
                    variant="destructive"
                    @click="openDeleteDialog(bloodPressure.id)"
                  >
                    <Trash2 class="h-4 w-4" />
                  </BaseButton>
                </div>
              </td>
            </tr>

            <tr v-if="bloodPressures.length === 0">
              <td
                colspan="6"
                class="px-5 py-8 text-center text-sm"
                :style="{ color: 'var(--muted)' }"
              >
                No blood pressure records found.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </BaseCard>
    <!-- Chart -->
    <ChartSkeleton v-if="loading" />
    <section class="grid gap-6 lg:grid-cols-12" v-else>
      <BaseCard class="lg:col-span-8" title="Weekly Blood Pressure Trend">
        <div
          class="flex h-80 items-center justify-center rounded-2xl"
          :style="{ background: 'var(--surface-2)' }"
        >
          <Chart
            :categories="chartData.categories"
            :series="chartData.series"
            suffix="mmHg"
          />
        </div>
      </BaseCard>
      <BaseCard class="lg:col-span-4" title="Blood Pressure Guide">
        <div class="space-y-4">
          <div
            class="rounded-xl p-4"
            :style="{ background: 'var(--surface-2)' }"
          >
            📈 Measure after resting for at least 5 minutes.
          </div>

          <div
            class="rounded-xl p-4"
            :style="{ background: 'var(--surface-2)' }"
          >
            💊 Take medication consistently before measuring if prescribed.
          </div>

          <div
            class="rounded-xl p-4"
            :style="{ background: 'var(--surface-2)' }"
          >
            <Info class="mb-2 h-5 w-5" />
            Record measurements at the same time each day for more consistent
            tracking.
          </div>
        </div>
      </BaseCard>
    </section>
  </div>

  <!-- dialog -->
  <BaseDialog
    v-model:open="showDialog"
    :title="editMode ? 'Edit Blood Pressure' : 'Add Blood Pressure'"
    description="Record your blood pressure measurement."
  >
    <div class="space-y-5">
      <BaseFormField label="Systolic">
        <BaseInput v-model="form.systolic" type="number" placeholder="120" />
      </BaseFormField>

      <BaseFormField label="Diastolic">
        <BaseInput v-model="form.diastolic" type="number" placeholder="80" />
      </BaseFormField>

      <BaseFormField label="Pulse">
        <BaseInput v-model="form.pulse" type="number" placeholder="70" />
      </BaseFormField>

      <BaseFormField label="Measured At">
        <BaseInput v-model="form.measured_at" type="datetime-local" />
      </BaseFormField>
    </div>

    <template #footer>
      <div class="flex gap-3">
        <BaseButton variant="outline" @click="showDialog = false">
          Cancel
        </BaseButton>

        <BaseButton
          :loading="isSaving"
          :disabled="isSaving"
          @click="handleSave"
        >
          {{ isSaving ? "Saving..." : editMode ? "Update" : "Save" }}
        </BaseButton>
      </div>
    </template>
  </BaseDialog>

  <BaseDialog
    v-model:open="showDeleteDialog"
    title="Delete Blood Pressure Record?"
    description="This action cannot be undone."
  >
    <div
      class="rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-900 dark:bg-red-950/30"
    >
      <p class="font-medium text-red-600">
        Are you sure you want to delete this blood pressure record?
      </p>
    </div>

    <template #footer>
      <div class="flex gap-3">
        <BaseButton variant="outline" @click="showDeleteDialog = false">
          Cancel
        </BaseButton>

        <BaseButton variant="destructive" @click="handleDelete">
          Delete
        </BaseButton>
      </div>
    </template>
  </BaseDialog>
</template>
