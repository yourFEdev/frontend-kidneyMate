import api from "./api";
import type { SchedulePayload } from "../types/schedule";

export const ScheduleService = {
  async getAll() {
    const { data } = await api.get("/schedule");
    return data;
  },

  async create(payload: SchedulePayload) {
    const { data } = await api.post("/schedule", payload);
    return data;
  },

  async update(id: number, payload: SchedulePayload) {
    const { data } = await api.put(`/schedule/${id}`, payload);
    return data;
  },

  async delete(id: number) {
    const { data } = await api.delete(`/schedule/${id}`);
    return data;
  },
};
