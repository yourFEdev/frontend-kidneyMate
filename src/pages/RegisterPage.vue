<script setup lang="ts">
import { ref } from "vue";
import { RouterLink } from "vue-router";
import { HeartPulse } from "lucide-vue-next";

import BaseCard from "../components/common/BaseCard.vue";
import BaseInput from "../components/common/BaseInput.vue";

const name = ref("");
const email = ref("");
const password = ref("");
const confirmPassword = ref("");

const register = () => {
  console.log(name.value);
};
</script>

<template>
  <div
    class="flex min-h-screen items-center justify-center px-5 w-[600px]"
  >
    <div class="w-full max-w-md">
      <BaseCard>
        <div class="space-y-6">
          <div class="text-center">
            <div
              class="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-sky-100"
            >
              <HeartPulse
                class="text-sky-600"
                :size="30"
              />
            </div>
            <h1
              class="text-3xl font-bold"
              :style="{ color: 'var(--foreground)' }"
            >
              Create Account
            </h1>
            <p
              class="mt-2"
              :style="{ color: 'var(--muted)' }"
            >
              Join KidneyMate today.
            </p>
          </div>
          <BaseInput
            v-model="name"
            label="Full Name"
            placeholder="John Doe"
          />
          <BaseInput
            v-model="email"
            label="Email"
            type="email"
            placeholder="example@email.com"
          />
          <BaseInput
            v-model="password"
            label="Password"
            type="password"
          />
          <BaseInput
            v-model="confirmPassword"
            label="Confirm Password"
            type="password"
          />
          <button
            @click="register"
            class="h-11 w-full rounded-xl bg-sky-600 font-medium text-white transition hover:opacity-90"
          >
            Create Account
          </button>
          <p
            class="text-center text-sm"
            :style="{ color: 'var(--muted)' }"
          >
            Already have an account?

            <RouterLink
              to="/login"
              class="font-semibold text-sky-600"
            >
              Login
            </RouterLink>
          </p>
        </div>
      </BaseCard>
    </div>
  </div>
</template>