<script setup lang="ts">
import { ref } from "vue";
import { RouterLink, useRouter } from "vue-router";
import { HeartPulse } from "lucide-vue-next";

import { BaseCard, BaseButton, BaseInput } from "../components/common/";
import { useAuthStore } from "../stores/auth.ts";
import { toast } from "vue-sonner";

const name = ref("");
const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const auth = useAuthStore();
const router = useRouter();

const register = async () => {
  try {
    const form = {
      name: name.value,
      email: email.value,
      password: password.value,
      password_confirmation: confirmPassword.value,
    };

    await auth.register(form);
    toast.success("Login Successfully");
    router.push("/dashboard");
  } catch (error: any) {
    toast.error(error.response?.data?.message ?? "Login failed");
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
              Create Account
            </h1>
            <p class="mt-2" :style="{ color: 'var(--muted)' }">
              Join KidneyMate today.
            </p>
          </div>
          <BaseInput v-model="name" label="Full Name" placeholder="John Doe" />
          <BaseInput
            v-model="email"
            label="Email"
            type="email"
            placeholder="johndoe@email.com"
          />
          <BaseInput
            v-model="password"
            label="Password"
            type="password"
            placeholder="password"
          />
          <BaseInput
            v-model="confirmPassword"
            label="Confirm Password"
            type="password"
            placeholder="Confirm Password"
          />
          <BaseButton
            @click="register"
            class="h-11 w-full rounded-xl bg-sky-600 font-medium text-white transition hover:opacity-90"
          >
            Create Account
          </BaseButton>
          <p class="text-center text-sm" :style="{ color: 'var(--muted)' }">
            Already have an account?

            <RouterLink to="/login" class="font-semibold text-sky-600">
              Login
            </RouterLink>
          </p>
        </div>
      </BaseCard>
    </div>
  </div>
</template>
