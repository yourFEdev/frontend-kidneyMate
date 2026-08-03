import api from "./api";
import type { FluidPayload } from "../types/fluid";

export const FluidService = {
  async getAll() {
    const { data } = await api.get("/fluid-intakes");
    return data;
  },

  async create(payload: FluidPayload) {
    const { data } = await api.post("/fluid-intakes", payload);
    return data;
  },

  async update(id: number, payload: FluidPayload) {
    const { data } = await api.put(`/fluid-intakes/${id}`, payload);
    return data;
  },

  async delete(id: number) {
    const { data } = await api.delete(`/fluid-intakes/${id}`);
    return data;
  },
};
