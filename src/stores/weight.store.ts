import { computed, ref } from "vue";
import { defineStore } from "pinia";

import { WeightService } from "../services/weight.service";

import type { WeightRecord, WeightPayload } from "../types/weight";

export const useWeightStore = defineStore("weight", () => {
  const weightRecords = ref<WeightRecord[]>([]);
  const loading = ref(false);

  /* ===========================
   * Computed
   * =========================== */

  const currentWeight = computed(() => {
    if (!weightRecords.value.length) return null;

    return Number(weightRecords.value[0].weight);
  });

  const previousWeight = computed(() => {
    if (weightRecords.value.length < 2) return null;

    return Number(weightRecords.value[1].weight);
  });

  const difference = computed(() => {
    if (currentWeight.value === null || previousWeight.value === null) {
      return 0;
    }

    return Number((currentWeight.value - previousWeight.value).toFixed(1));
  });

  const entries = computed(() => weightRecords.value.length);

  const chartData = computed(() =>
    [...weightRecords.value]
      .sort(
        (a, b) =>
          new Date(a.recorded_at).getTime() - new Date(b.recorded_at).getTime(),
      )
      .map((item) => ({
        date: item.recorded_at,
        value: Number(item.weight),
      })),
  );

  /* ===========================
   * Actions
   * =========================== */

  async function fetchWeightRecords() {
    loading.value = true;

    try {
      const res = await WeightService.getAll();

      weightRecords.value = res.data;
    } finally {
      loading.value = false;
    }
  }

  async function createWeight(payload: WeightPayload) {
    const res = await WeightService.create(payload);

    weightRecords.value.unshift(res.data);

    return res.data;
  }

  async function updateWeight(id: number, payload: WeightPayload) {
    const res = await WeightService.update(id, payload);

    const index = weightRecords.value.findIndex((item) => item.id === id);

    if (index !== -1) {
      weightRecords.value[index] = res.data;
    }

    return res.data;
  }

  async function deleteWeight(id: number) {
    await WeightService.delete(id);

    weightRecords.value = weightRecords.value.filter((item) => item.id !== id);
  }

  return {
    loading,

    weightRecords,

    currentWeight,
    previousWeight,
    difference,
    entries,
    chartData,

    fetchWeightRecords,
    createWeight,
    updateWeight,
    deleteWeight,
  };
});
