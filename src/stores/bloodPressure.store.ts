import { defineStore } from "pinia";
import { ref, computed } from "vue";

import { bloodPressureService } from "../services/bloodPressure.service";
import type {
  BloodPressure,
  BloodPressurePayload,
} from "../types/bloodPressure";

export const useBloodPressureStore = defineStore("bloodPressure", () => {
  const bloodPressures = ref<BloodPressure[]>([]);
  const loading = ref(false);

  const latest = computed(() => bloodPressures.value[0]);
  const chartData = computed(() => {
    const sorted = [...bloodPressures.value].sort(
      (a, b) =>
        new Date(a.measured_at).getTime() - new Date(b.measured_at).getTime(),
    );

    return {
      categories: sorted.map((item) =>
        new Date(item.measured_at).toLocaleDateString("id-ID", {
          day: "2-digit",
          month: "short",
        }),
      ),

      series: [
        {
          name: "Systolic",
          data: sorted.map((item) => item.systolic),
        },
        {
          name: "Diastolic",
          data: sorted.map((item) => item.diastolic),
        },
      ],
    };
  });
  const todayCount = computed(() => {
    const now = new Date();

    return bloodPressures.value.filter((item) => {
      const d = new Date(item.measured_at);

      return (
        d.getFullYear() === now.getFullYear() &&
        d.getMonth() === now.getMonth() &&
        d.getDate() === now.getDate()
      );
    }).length;
  });
  const latestMeasuredTime = computed(() => {
    if (!latest.value) return "-";

    const date = new Date(latest.value.measured_at);

    const formattedDate = date.toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

    const formattedTime = date.toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
    });

    return `${formattedDate} • ${formattedTime}`;
  });

  async function getBloodPressures() {
    loading.value = true;
    try {
      const res = await bloodPressureService.getAll();
      bloodPressures.value = res.data;
    } finally {
      loading.value = false;
    }
  }

  async function createBloodPressure(payload: BloodPressurePayload) {
    const res = await bloodPressureService.create(payload);
    bloodPressures.value.unshift(res.data);
    return res.data;
  }

  async function updateBloodPressure(
    id: number,
    payload: BloodPressurePayload,
  ) {
    const res = await bloodPressureService.update(id, payload);
    const index = bloodPressures.value.findIndex((item) => item.id === id);
    if (index !== -1) {
      bloodPressures.value[index] = res.data;
    }
    return res.data;
  }

  async function deleteBloodPressure(id: number) {
    await bloodPressureService.delete(id);
    bloodPressures.value = bloodPressures.value.filter(
      (item) => item.id !== id,
    );
  }

  return {
    bloodPressures,
    loading,

    latest,
    todayCount,
    chartData,
    latestMeasuredTime,

    getBloodPressures,
    createBloodPressure,
    updateBloodPressure,
    deleteBloodPressure,
  };
});
