<script setup lang="ts">
import { ref } from "vue";
import { RouterLink } from "vue-router";
import { HeartPulse } from "lucide-vue-next";

import { BaseCard, BaseButton, BaseInput } from "../components/common/";
import { useAuthStore } from "../stores/auth.ts";
import { useRouter } from "vue-router";
import { toast } from "vue-sonner";

const auth = useAuthStore();
const email = ref("");
const password = ref("");
const router = useRouter();
const isLoading = ref(false);
const isDemoLoading = ref(false);

const login = async () => {
  if (isLoading.value) return;

  isLoading.value = true;

  try {
    await auth.login({
      email: email.value,
      password: password.value,
    });

    toast.success("Login Successfully");
    router.push("/dashboard");
  } catch (error: any) {
    toast.error(error.response?.data?.message ?? "Login failed");
  } finally {
    isLoading.value = false;
  }
};

const loginDemo = async () => {
  if (isDemoLoading.value) return;

  isDemoLoading.value = true;

  try {
    await auth.login({
      email: "demo@mail.com",
      password: "password123",
    });

    toast.success("Logged in as Demo User");
    router.push("/dashboard");
  } catch {
    toast.error("Demo account unavailable");
  } finally {
    isDemoLoading.value = false;
  }
};
</script>

<template>
  <div
    class="flex min-h-screen items-center justify-center px-5 w-[600px] text-[var(--muted)]"
  >
    <div class="w-full max-w-md">
      <BaseCard :hoverable="false">
        <div class="space-y-6">
          <div class="text-center">
            <div
              class="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-sky-100"
            >
              <HeartPulse class="text-sky-600" :size="30" />
            </div>

            <h1
              class="text-3xl font-bold"
              :style="{ color: 'var(--foreground)' }"
            >
              Welcome Back
            </h1>

            <p class="mt-2" :style="{ color: 'var(--muted)' }">
              Login to your KidneyMate account.
            </p>
          </div>

          <BaseInput
            v-model="email"
            label="Email"
            placeholder="Enter your email"
            type="email"
          />

          <BaseInput
            v-model="password"
            label="Password"
            placeholder="Enter password"
            type="password"
          />

          <div class="space-y-3">
            <BaseButton
              @click="login"
              :disabled="isLoading"
              class="h-11 w-full cursor-pointer rounded-xl font-medium transition disabled:pointer-events-none disabled:opacity-50"
              :style="{
                backgroundColor: 'var(--primary)',
                color: 'var(--primary-foreground)',
              }"
            >
              {{ isLoading ? "Signing in..." : "Login" }}
            </BaseButton>

            <BaseButton
              @click="loginDemo"
              :disabled="isDemoLoading"
              class="h-11 w-full cursor-pointer rounded-xl border font-medium transition disabled:pointer-events-none disabled:opacity-50"
              :style="{
                backgroundColor: 'var(--secondary)',
                color: 'var(--secondary-foreground)',
                borderColor: 'var(--border)',
              }"
            >
              {{ isDemoLoading ? "Signing in..." : "Login as Demo" }}
            </BaseButton>
          </div>

          <p class="text-center text-sm" :style="{ color: 'var(--muted)' }">
            Don't have an account?

            <RouterLink to="/register" class="font-semibold text-sky-600">
              Register
            </RouterLink>
          </p>
        </div>
      </BaseCard>
    </div>
  </div>
</template>
