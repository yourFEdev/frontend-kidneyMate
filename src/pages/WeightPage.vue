<script setup lang="ts">
import { ref, onMounted } from "vue";
import { storeToRefs } from "pinia";
import { toast } from "vue-sonner";

import {
  Scale,
  Plus,
  TrendingDown,
  Weight,
  Pencil,
  Trash2,
} from "lucide-vue-next";

import {
  BaseCard,
  BaseButton,
  BaseDialog,
  BaseInput,
  BaseFormField,
  BaseTextarea,
  BaseHeader,
} from "../components/common";
import { StatSkeleton, HeaderSkeleton } from "../components/skeleton";

import { useWeightStore } from "../stores/weight.store";
import TableSkeleton from "../components/skeleton/TableSkeleton.vue";

const weightStore = useWeightStore();

const { weightRecords, currentWeight, loading, difference, entries } =
  storeToRefs(weightStore);
const isSaving = ref(false);
const showWeightDialog = ref(false);
const showDeleteDialog = ref(false);

const selectedId = ref<number | null>(null);
const selectedWeight = ref<any>(null);

const weightForm = ref({
  weight: 0,
  notes: "",
});

onMounted(() => {
  weightStore.fetchWeightRecords();
});

function openCreate() {
  selectedWeight.value = null;

  weightForm.value = {
    weight: 0,
    notes: "",
  };

  showWeightDialog.value = true;
}

function editWeight(item: any) {
  selectedWeight.value = item;

  weightForm.value = {
    weight: item.weight,
    notes: item.notes ?? "",
  };

  showWeightDialog.value = true;
}

async function saveWeight() {
  isSaving.value = true;

  try {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const payload = {
      weight: Number(weightForm.value.weight),
      notes: weightForm.value.notes,
    };

    if (selectedWeight.value) {
      await weightStore.updateWeight(selectedWeight.value.id, payload);
      toast.success("Weight updated successfully.");
    } else {
      await weightStore.createWeight(payload);
      toast.success("Weight added successfully.");
    }

    selectedWeight.value = null;

    weightForm.value = {
      weight: 0,
      notes: "",
    };

    showWeightDialog.value = false;
  } finally {
    isSaving.value = false;
  }
}

function openDeleteDialog(id: number) {
  selectedId.value = id;
  showDeleteDialog.value = true;
}

async function handleDeleteWeight() {
  if (selectedId.value === null) return;

  await weightStore.deleteWeight(selectedId.value);

  toast.success("Weight deleted successfully.");

  selectedId.value = null;
  showDeleteDialog.value = false;
}
</script>

<template>
  <div class="space-y-6 mb-8 text-[var(--muted)]">
    <!-- Header -->
    <HeaderSkeleton v-if="loading" />
    <BaseHeader
      title="Weight Tracker"
      subtitle=" Track your body weight and monitor changes over time."
      v-else
    />

    <StatSkeleton v-if="loading" />
    <!-- Summary -->
    <section class="grid gap-6 lg:grid-cols-12" v-else>
      <!-- Current Weight -->
      <BaseCard class="lg:col-span-6" title="Current Weight">
        <div class="space-y-6">
          <div class="flex items-center gap-4">
            <div
              class="flex h-14 w-14 items-center justify-center rounded-2xl"
              :style="{ background: 'var(--primary-soft)' }"
            >
              <Scale class="h-7 w-7" :style="{ color: 'var(--primary)' }" />
            </div>

            <div>
              <h2 class="text-4xl font-bold">{{ currentWeight ?? "-" }} kg</h2>

              <p :style="{ color: 'var(--muted)' }">Latest recorded weight</p>
            </div>
          </div>
        </div>
      </BaseCard>

      <!-- Weight Change -->
      <BaseCard class="lg:col-span-3">
        <TrendingDown class="mb-6 h-8 w-8 text-green-500" />

        <p class="text-sm text-[var(--muted)]">Weight Change</p>

        <h2 class="mt-2 text-2xl font-bold">
          {{ difference > 0 ? "+" : "" }}{{ difference }} kg
        </h2>

        <p class="mt-2 text-sm text-[var(--muted)]">
          Compared to previous record
        </p>
      </BaseCard>

      <!-- Records -->
      <BaseCard class="lg:col-span-3">
        <Weight class="mb-6 h-8 w-8 text-blue-500" />

        <p class="text-sm text-[var(--muted)]">Records</p>

        <h2 class="mt-2 text-3xl font-bold">
          {{ entries }}
        </h2>

        <p class="mt-2 text-sm text-[var(--muted)]">Total weight records</p>
      </BaseCard>
    </section>

    <!-- Table -->
    <TableSkeleton v-if="loading" />
    <BaseCard
      title="Weight Records"
      description="History of your recorded body weight."
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
              <th class="px-5 py-4 text-left">Weight</th>
              <th class="px-5 py-4 text-left">Notes</th>
              <th class="px-5 py-4 text-right">Action</th>
            </tr>
          </thead>

          <tbody>
            <tr
              v-for="item in weightRecords"
              :key="item.id"
              class="border-t transition hover:bg-black/5 dark:hover:bg-white/5"
              :style="{ borderColor: 'var(--border)' }"
            >
              <td class="px-5 py-4">
                {{
                  new Date(item.recorded_at).toLocaleDateString([], {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })
                }}
              </td>

              <td class="px-5 py-4 font-semibold">{{ item.weight }} kg</td>

              <td class="px-5 py-4" :style="{ color: 'var(--muted)' }">
                {{ item.notes || "-" }}
              </td>

              <td class="px-5 py-4">
                <div class="flex justify-end gap-2">
                  <BaseButton
                    size="icon"
                    variant="outline"
                    @click="editWeight(item)"
                  >
                    <Pencil class="h-4 w-4" />
                  </BaseButton>

                  <BaseButton
                    size="icon"
                    variant="destructive"
                    @click="openDeleteDialog(item.id)"
                  >
                    <Trash2 class="h-4 w-4" />
                  </BaseButton>
                </div>
              </td>
            </tr>

            <tr v-if="!weightRecords.length">
              <td colspan="4" class="py-10 text-center text-[var(--muted)]">
                No weight records found.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </BaseCard>
  </div>

  <!-- Dialog -->
  <!-- Create / Update Dialog -->
  <BaseDialog
    v-model:open="showWeightDialog"
    :title="selectedWeight ? 'Update Weight Record' : 'Add Weight Record'"
    :description="
      selectedWeight
        ? 'Update your body weight record.'
        : 'Record your latest body weight.'
    "
  >
    <div class="space-y-5">
      <BaseFormField label="Weight (kg)">
        <BaseInput
          v-model="weightForm.weight"
          type="number"
          step="0.1"
          placeholder="61.8"
        />
      </BaseFormField>

      <BaseFormField label="Notes" hint="Optional">
        <BaseTextarea
          v-model="weightForm.notes"
          placeholder="Example: After dialysis"
        />
      </BaseFormField>
    </div>

    <template #footer>
      <div class="flex justify-end gap-3">
        <BaseButton
          variant="outline"
          @click="showWeightDialog = false"
          :disabled="isSaving"
        >
          Cancel
        </BaseButton>

        <BaseButton
          @click="saveWeight"
          :loading="isSaving"
          :disabled="isSaving"
        >
          {{ selectedWeight ? "Update" : "Save Weight" }}
        </BaseButton>
      </div>
    </template>
  </BaseDialog>
  <!-- Delete Dialog -->
  <BaseDialog
    v-model:open="showDeleteDialog"
    title="Delete Weight Record?"
    description="This action cannot be undone."
  >
    <div
      class="flex items-center gap-3 rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-900 dark:bg-red-950/30"
    >
      <TriangleAlert class="h-5 w-5 text-red-500" />

      <div>
        <p class="font-medium text-red-700 dark:text-red-300">Are you sure?</p>

        <p class="text-sm text-muted-foreground">
          This action will permanently delete this weight record.
        </p>
      </div>
    </div>

    <template #footer>
      <div class="flex justify-end gap-3">
        <BaseButton variant="outline" @click="showDeleteDialog = false">
          Cancel
        </BaseButton>

        <BaseButton variant="destructive" @click="handleDeleteWeight">
          Delete
        </BaseButton>
      </div>
    </template>
  </BaseDialog>
</template>
