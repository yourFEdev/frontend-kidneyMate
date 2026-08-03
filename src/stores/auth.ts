import { defineStore } from "pinia";
import { ref, computed } from "vue";

import { authService } from "../services/auth.service";
import type {
  UserProps,
  LoginPayload,
  LoginResponse,
  RegisterPayload,
} from "../types/auth";

export const useAuthStore = defineStore("auth", () => {
  const user = ref<UserProps | null>(null);
  const token = ref(localStorage.getItem("token") || "");
  const loading = ref(false);
  const initialized = ref(false);
  const isAuthenticated = computed(() => !!token.value);

  async function login(payload: LoginPayload) {
    loading.value = true;

    try {
      const response = await authService.login(payload);
      const data: LoginResponse = response.data;

      user.value = data.user;
      token.value = data.token;

      localStorage.setItem("token", data.token);
    } finally {
      loading.value = false;
    }
  }

  function clearAuth() {
    user.value = null;
    token.value = "";

    localStorage.removeItem("token");
  }

  async function register(payload: RegisterPayload) {
    loading.value = true;

    try {
      await authService.register(payload);
    } finally {
      loading.value = false;
    }
  }

  async function logout() {
    try {
      await authService.logout();
    } finally {
      clearAuth();
    }
  }

  async function initialize() {
    if (!token.value) {
      initialized.value = true;
      return;
    }

    try {
      const response = await authService.me();
      user.value = response.data;
    } catch {
      clearAuth();
    } finally {
      initialized.value = true;
    }
  }

  return {
    user,
    token,
    loading,

    isAuthenticated,

    login,
    register,
    logout,
    initialize,
  };
});
