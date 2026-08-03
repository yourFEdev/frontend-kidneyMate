import api from "./api";
import type { WeightPayload } from "../types/weight";

export const WeightService = {
  async getAll() {
    const { data } = await api.get("/weight-records");
    return data;
  },

  async create(payload: WeightPayload) {
    const { data } = await api.post("/weight-records", payload);
    return data;
  },

  async update(id: number, payload: WeightPayload) {
    const { data } = await api.put(`/weight-records/${id}`, payload);
    return data;
  },

  async delete(id: number) {
    const { data } = await api.delete(`/weight-records/${id}`);
    return data;
  },
};
