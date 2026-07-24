<script setup lang="ts">
import { ref } from "vue";
import { RouterLink } from "vue-router";
import { HeartPulse } from "lucide-vue-next";

import BaseCard from "../components/common/BaseCard.vue";
import BaseInput from "../components/common/BaseInput.vue";

const email = ref("");
const password = ref("");

const login = () => {
  console.log(email.value, password.value);
};
</script>

<template>
  <div class="flex min-h-screen items-center justify-center px-5 w-[600px]">
    <div class="w-full max-w-md">
      <BaseCard>
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
        <RouterLink to="/dashboard" >
          <button to="/login"
            @click="login"
            class="h-11 w-full rounded-xl bg-sky-600 font-medium text-white transition hover:opacity-90 cursor-pointer"
          >
            Login
          </button>
        </RouterLink>
          <p class="text-center text-sm" :style="{ color: 'var(--muted)' }">
            Don't have an account?

            <RouterLink to="/register" class="font-semibold text-sky-600 ">
              Register
            </RouterLink>
          </p>
        </div>
      </BaseCard>
    </div>
  </div>
</template>
