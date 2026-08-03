import { defineStore } from "pinia";
import { ref, computed } from "vue";

import { FluidService } from "../services/fluid.service";
import type { FluidIntake, FluidPayload } from "../types/fluid";

import { useAuthStore } from "./auth";
import { storeToRefs } from "pinia";

export const useFluidStore = defineStore("fluid", () => {
  const fluidIntakes = ref<FluidIntake[]>([]);
  const loading = ref(false);

  const auth = useAuthStore();
  const { user } = storeToRefs(auth);

  const todayTotal = computed(() => {
    const now = new Date();

    return fluidIntakes.value
      .filter((item) => {
        const d = new Date(item.drank_at);

        return (
          d.getFullYear() === now.getFullYear() &&
          d.getMonth() === now.getMonth() &&
          d.getDate() === now.getDate()
        );
      })
      .reduce((sum, item) => sum + item.amount, 0);
  });

  const entries = computed(() => {
    const now = new Date();

    return fluidIntakes.value.filter((item) => {
      const d = new Date(item.drank_at);

      return (
        d.getFullYear() === now.getFullYear() &&
        d.getMonth() === now.getMonth() &&
        d.getDate() === now.getDate()
      );
    }).length;
  });

  const dailyLimit = computed(() => user.value?.daily_fluid_limit ?? 0);

  const remaining = computed(() =>
    Math.max(dailyLimit.value - todayTotal.value, 0),
  );

  const chartData = computed(() => {
    const sorted = [...fluidIntakes.value].sort(
      (a, b) => new Date(a.drank_at).getTime() - new Date(b.drank_at).getTime(),
    );

    return {
      categories: sorted.map((item) =>
        new Date(item.drank_at).toLocaleDateString("id-ID", {
          day: "2-digit",
          month: "short",
        }),
      ),

      series: [
        {
          name: "Fluid Intake",
          data: sorted.map((item) => item.amount),
        },
      ],
    };
  });

  const progress = computed(() => {
    if (!dailyLimit.value) return 0;

    return Math.min((todayTotal.value / dailyLimit.value) * 100, 100);
  });

  async function fetchFluidIntakes() {
    loading.value = true;
    try {
      const res = await FluidService.getAll();
      fluidIntakes.value = res.data;
    } finally {
      loading.value = false;
    }
  }

  async function createFluidIntake(payload: FluidPayload) {
    const res = await FluidService.create(payload);
    fluidIntakes.value.unshift(res.data);
    return res.data;
  }

  async function updateFluidIntake(id: number, payload: FluidPayload) {
    const res = await FluidService.update(id, payload);
    const index = fluidIntakes.value.findIndex((item) => item.id === id);
    if (index !== -1) {
      fluidIntakes.value[index] = res.data;
    }

    return res.data;
  }

  async function deleteFluidIntake(id: number) {
    await FluidService.delete(id);

    fluidIntakes.value = fluidIntakes.value.filter((item) => item.id !== id);
  }

  return {
    fluidIntakes,
    loading,
    chartData,

    todayTotal,
    entries,
    dailyLimit,
    remaining,
    progress,

    fetchFluidIntakes,
    createFluidIntake,
    updateFluidIntake,
    deleteFluidIntake,
  };
});
