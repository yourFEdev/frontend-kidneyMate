import api from "./api";
import type { BloodPressurePayload } from "../types/bloodPressure";

export const bloodPressureService = {
  async getAll() {
    const { data } = await api.get("/blood-pressures");
    return data;
  },

  async create(payload: BloodPressurePayload) {
    const { data } = await api.post("/blood-pressures", payload);
    return data;
  },

  async update(id: number, payload: BloodPressurePayload) {
    const { data } = await api.put(`/blood-pressures/${id}`, payload);
    return data;
  },

  async delete(id: number) {
    await api.delete(`/blood-pressures/${id}`);
  },
};
