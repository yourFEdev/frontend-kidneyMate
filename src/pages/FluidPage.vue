<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { storeToRefs } from "pinia";
import { toast } from "vue-sonner";

import {
  Droplets,
  Plus,
  GlassWater,
  TrendingUp,
  CircleAlert,
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

import {
  StatSkeleton,
  ChartSkeleton,
  HeaderSkeleton,
} from "../components/skeleton";

import Chart from "../components/charts/Chart.vue";

import { useAuthStore } from "../stores/auth";
import { useFluidStore } from "../stores/fluid.store";

const auth = useAuthStore();
const fluidStore = useFluidStore();

const { user } = storeToRefs(auth);
const { chartData, loading, entries, remaining } = storeToRefs(fluidStore);

const showLimitDialog = ref(false);
const showIntakeDialog = ref(false);
const showDeleteDialog = ref(false);

const selectedId = ref<number | null>(null);
const selectedIntake = ref<any>(null);

const limitForm = ref({
  dailyLimit: "",
});

const intakeForm = ref({
  drink_name: "",
  amount: 0,
  notes: "",
});

const isSaving = ref(false);

const hasLimit = computed(() => (user.value?.daily_fluid_limit ?? 0) > 0);

const todayIntakes = computed(() => {
  const now = new Date();

  return fluidStore.fluidIntakes.filter((item) => {
    const d = new Date(item.drank_at);

    return (
      d.getFullYear() === now.getFullYear() &&
      d.getMonth() === now.getMonth() &&
      d.getDate() === now.getDate()
    );
  });
});

onMounted(() => {
  fluidStore.fetchFluidIntakes();
});

// function saveLimit() {
//   if (!limitForm.value.dailyLimit) return;

//   if (hasLimit.value) {
//     console.log("UPDATE LIMIT");
//   } else {
//     console.log("CREATE LIMIT");
//   }

//   showLimitDialog.value = false;
// }

function openCreate() {
  selectedIntake.value = null;

  intakeForm.value = {
    drink_name: "",
    amount: 0,
    notes: "",
  };

  showIntakeDialog.value = true;
}

function EditIntake(item: any) {
  selectedIntake.value = item;

  intakeForm.value = {
    drink_name: item.drink_name,
    amount: item.amount,
    notes: item.notes ?? "",
  };

  showIntakeDialog.value = true;
}

async function saveIntake() {
  isSaving.value = true;

  try {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const payload = {
      drink_name: intakeForm.value.drink_name,
      amount: Number(intakeForm.value.amount),
      notes: intakeForm.value.notes,
    };

    if (selectedIntake.value) {
      await fluidStore.updateFluidIntake(selectedIntake.value.id, payload);
      toast.success("Update Success");
    } else {
      await fluidStore.createFluidIntake(payload);
      toast.success("Create Success");
    }

    selectedIntake.value = null;

    intakeForm.value = {
      drink_name: "",
      amount: 0,
      notes: "",
    };

    showIntakeDialog.value = false;
  } finally {
    isSaving.value = false;
  }
}

function openDeleteDialog(id: number) {
  selectedId.value = id;
  showDeleteDialog.value = true;
}

async function handleDeleteIntake() {
  if (selectedId.value === null) return;

  await fluidStore.deleteFluidIntake(selectedId.value);

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
      title=" Fluid Tracker"
      subtitle="  Monitor your daily fluid intake."
      v-else
    />
    <StatSkeleton v-if="loading" />
    <section class="grid gap-6 lg:grid-cols-12" v-else>
      <BaseCard class="lg:col-span-6" title="Today's Progress">
        <div class="space-y-6">
          <div class="flex items-center gap-4">
            <div
              class="flex h-14 w-14 items-center justify-center rounded-2xl"
              :style="{ background: 'var(--primary-soft)' }"
            >
              <Droplets class="h-7 w-7" :style="{ color: 'var(--primary)' }" />
            </div>
            <div>
              <h2 class="text-4xl font-bold">
                <h2 class="mt-2 text-3xl font-bold">
                  {{ fluidStore.todayTotal }} ml
                </h2>
              </h2>
              <p :style="{ color: 'var(--muted)' }">
                of {{ user?.daily_fluid_limit }} ml daily limit
              </p>
            </div>
          </div>
        </div>
      </BaseCard>
      <BaseCard class="lg:col-span-2">
        <GlassWater class="mb-6 h-8 w-8 text-blue-500" />
        <p class="text-sm text-[var(--muted)]">Remaining</p>
        <h2 class="mt-2 text-2xl font-bold">{{ remaining }} ml</h2>
      </BaseCard>
      <BaseCard class="lg:col-span-2">
        <CircleAlert class="mb-6 h-8 w-8 text-yellow-500" />
        <p class="text-sm text-[var(--muted)]">Daily Limit</p>
        <h2 class="mt-2 text-2xl font-bold">
          {{ user?.daily_fluid_limit }} ml
        </h2>
      </BaseCard>
      <BaseCard class="lg:col-span-2">
        <TrendingUp class="mb-6 h-8 w-8 text-green-500" />
        <p class="text-sm text-[var(--muted)]">Entries</p>
        <h2 class="mt-2 text-3xl font-bold">
          {{ entries }}
        </h2>
      </BaseCard>
    </section>
    <!-- Table -->
    <TableSkeleton v-if="loading" />
    <BaseCard
      title="Today's Intake"
      description="All fluid records for today"
      v-else
    >
      <template #action>
        <BaseButton variant="ghost" @click="openCreate">
          <Plus class="mr-2 h-4 w-4" />
          Add Intake
        </BaseButton>
      </template>

      <div
        class="overflow-hidden rounded-2xl border"
        :style="{
          borderColor: 'var(--border)',
        }"
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
              <th class="px-5 py-4 text-left">Time</th>
              <th class="px-5 py-4 text-left">Drink</th>
              <th class="px-5 py-4 text-left">Amount</th>
              <th class="px-5 py-4 text-left">Notes</th>
              <th class="px-5 py-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="item in todayIntakes"
              :key="item.id"
              class="border-t transition hover:bg-black/5 dark:hover:bg-white/5"
              :style="{
                borderColor: 'var(--border)',
              }"
            >
              <td class="px-5 py-4">
                {{
                  new Date(item.drank_at).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                }}
              </td>

              <td class="px-5 py-4 font-medium">
                {{ item.drink_name }}
              </td>

              <td class="px-5 py-4">{{ item.amount }} ml</td>

              <td class="px-5 py-4" :style="{ color: 'var(--muted)' }">
                {{ item.notes || "-" }}
              </td>

              <td class="px-5 py-4">
                <div class="flex justify-end gap-2">
                  <BaseButton
                    size="icon"
                    variant="outline"
                    @click="EditIntake(item)"
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
          </tbody>
        </table>
      </div>
    </BaseCard>

    <ChartSkeleton v-if="loading" />
    <section class="grid gap-6 lg:grid-cols-12" v-else>
      <BaseCard class="lg:col-span-8" title="Weekly Fluid Trend">
        <div
          class="flex h-80 items-center justify-center rounded-2xl"
          :style="{ background: 'var(--surface-2)' }"
        >
          <Chart
            :categories="chartData.categories"
            :series="chartData.series"
            suffix="ml"
          />
        </div>
      </BaseCard>
      <BaseCard class="lg:col-span-4" title="Daily Tips">
        <div class="space-y-4">
          <div
            class="rounded-xl p-4"
            :style="{ background: 'var(--primary-soft)' }"
          >
            💧 Drink slowly instead of consuming a large amount at once.
          </div>
          <div
            class="rounded-xl p-4"
            :style="{ background: 'var(--surface-2)' }"
          >
            🍉 Fruits also contribute to fluid intake.
          </div>
          <div
            class="rounded-xl p-4"
            :style="{ background: 'var(--surface-2)' }"
          >
            ⏰ Track every drink immediately after consuming it.
          </div>
        </div>
      </BaseCard>
    </section>
  </div>
  <!-- dialog confirmation -->
  <BaseDialog
    v-model:open="showDeleteDialog"
    title="Delete Fluid Intake?"
    description="This action cannot be undone."
  >
    <div
      class="flex items-center gap-3 rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-900 dark:bg-red-950/30"
    >
      <TriangleAlert class="h-5 w-5 text-red-500" />

      <div>
        <p class="font-medium text-red-700 dark:text-red-300">Are you sure?</p>
        <p class="text-sm text-muted-foreground">
          This action will permanently delete this fluid intake record.
        </p>
      </div>
    </div>

    <template #footer>
      <div class="flex justify-end gap-3">
        <BaseButton variant="outline" @click="showDeleteDialog = false">
          Cancel
        </BaseButton>

        <BaseButton variant="destructive" @click="handleDeleteIntake">
          Delete
        </BaseButton>
      </div>
    </template>
  </BaseDialog>
  <!-- dialog daily limit -->
  <BaseDialog
    v-model:open="showLimitDialog"
    :title="hasLimit ? 'Update Daily Limit' : 'Set Daily Limit'"
    description="Set your maximum daily fluid intake."
  >
    <div class="space-y-5">
      <BaseFormField label="Daily Limit">
        <BaseInput
          v-model="limitForm.dailyLimit"
          type="number"
          placeholder="1500"
        />
      </BaseFormField>
    </div>

    <template #footer>
      <div class="flex gap-3">
        <BaseButton variant="outline" @click="showIntakeDialog = false">
          Cancel
        </BaseButton>

        <BaseButton
          @click="saveIntake"
          :loading="isSaving"
          :disabled="isSaving"
        >
          {{ selectedIntake ? "Update" : "Save Intake" }}
        </BaseButton>
      </div>
    </template>
  </BaseDialog>
  <!-- dialog limit -->
  <BaseDialog
    v-model:open="showIntakeDialog"
    :title="selectedIntake ? 'Update Fluid Intake' : 'Add Fluid Intake'"
    :description="
      selectedIntake ? 'Update your fluid record.' : 'Record your latest drink.'
    "
  >
    <div class="space-y-5">
      <BaseFormField label="Drink Name">
        <BaseInput v-model="intakeForm.drink_name" placeholder="Water" />
      </BaseFormField>

      <BaseFormField label="Amount (ml)">
        <BaseInput
          v-model="intakeForm.amount"
          type="number"
          placeholder="250"
        />
      </BaseFormField>

      <BaseFormField label="Notes" hint="Optional">
        <BaseTextarea
          v-model="intakeForm.notes"
          placeholder="Example: Morning drink"
        />
      </BaseFormField>
    </div>

    <template #footer>
      <div class="flex gap-3">
        <BaseButton variant="outline" @click="showIntakeDialog = false">
          Cancel
        </BaseButton>

        <BaseButton
          @click="saveIntake"
          :loading="isSaving"
          :disabled="isSaving"
        >
          {{ selectedIntake ? "Update" : "Save Intake" }}
        </BaseButton>
      </div>
    </template>
  </BaseDialog>
</template>
