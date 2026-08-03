import { defineStore } from "pinia";
import { ref, computed } from "vue";
import type { ScheduleResponse, SchedulePayload } from "../types/schedule";
import { ScheduleService } from "../services/schedule.service";

export const useScheduleStore = defineStore("schedule", () => {
  const schedules = ref<ScheduleResponse[]>([]);
  const loading = ref(false);

  const dialysisSchedules = computed(() =>
    schedules.value.filter((item) => item.type === "dialysis"),
  );

  const medicationSchedules = computed(() =>
    schedules.value.filter((item) => item.type === "medication"),
  );

  const doctorSchedules = computed(() =>
    schedules.value.filter((item) => item.type === "doctor"),
  );

  const nextDoctor = computed(
    () =>
      doctorSchedules.value.find((item) => item.status === "scheduled") ?? null,
  );

  const nextDialysis = computed(() => {
    return dialysisSchedules.value.find(
      (item) =>
        item.status === "scheduled" && new Date(item.scheduled_at) > new Date(),
    );
  });

  async function fetchSchedules() {
    loading.value = true;
    try {
      const res = await ScheduleService.getAll();
      schedules.value = res.data;
    } finally {
      loading.value = false;
    }
  }

  async function createSchedule(payload: SchedulePayload) {
    const res = await ScheduleService.create(payload);
    schedules.value.unshift(res.data);
    return res.data;
  }

  async function updateSchedule(id: number, payload: SchedulePayload) {
    const res = await ScheduleService.update(id, payload);
    const index = schedules.value.findIndex((item) => item.id === id);
    if (index !== -1) {
      schedules.value[index] = res.data;
    }
    return res.data;
  }

  async function deleteSchedule(id: number) {
    await ScheduleService.delete(id);

    schedules.value = schedules.value.filter((item) => item.id !== id);
  }

  return {
    schedules,
    loading,

    dialysisSchedules,
    medicationSchedules,
    doctorSchedules,
    nextDialysis,
    nextDoctor,

    fetchSchedules,
    createSchedule,
    updateSchedule,
    deleteSchedule,
  };
});
