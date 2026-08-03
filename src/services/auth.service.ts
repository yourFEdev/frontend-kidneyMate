import api from "./api";
import type { RegisterPayload, LoginPayload } from "../types/auth";

export const authService = {
  async register(payload: RegisterPayload) {
    const { data } = await api.post("/register", payload);
    return data;
  },

  async login(payload: LoginPayload) {
    const { data } = await api.post("/login", payload);
    return data;
  },

  async me() {
    const { data } = await api.get("/me");
    return data;
  },

  logout() {
    return api.post("/logout");
  },
};
