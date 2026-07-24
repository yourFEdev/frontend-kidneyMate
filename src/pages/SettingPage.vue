<script setup lang="ts">
import {
  User,
  Shield,
  CalendarDays,
  LockKeyhole,
  Pencil,
} from "lucide-vue-next";

import BaseCard from "../components/common/BaseCard.vue";
const user = {
  name: "Andre",
  email: "andre@mail.com",
  role: "admin",
  joined: "19 July 2026",
};
</script>

<template>
  <div class="space-y-6 text-[var(--muted)]">
    <section>
      <h1 class="text-3xl font-bold" :style="{ color: 'var(--foreground)' }">
        Account Settings
      </h1>
      <p class="mt-2" :style="{ color: 'var(--muted)' }">
        Manage your account information and security.
      </p>
    </section>
    <section class="grid gap-6 lg:grid-cols-3">
      <div class="lg:col-span-2">
        <BaseCard title="Account Info">
          <div class="flex flex-col gap-6 md:flex-row md:items-center">
            <div
              class="flex h-24 w-24 items-center justify-center rounded-full bg-sky-100"
            >
              <User class="text-sky-600" :size="40" />
            </div>
            <div>
              <h2
                class="text-2xl font-bold"
                :style="{ color: 'var(--foreground)' }"
              >
                {{ user.name }}
              </h2>
              <p class="mt-1" :style="{ color: 'var(--muted)' }">
                {{ user.email }}
              </p>
              <span
                class="mt-4 inline-flex rounded-full bg-sky-100 px-4 py-1 text-sm font-medium text-sky-700"
              >
                {{ user.role }}
              </span>
            </div>
          </div>
        </BaseCard>
      </div>

      <!-- Quick Info -->

      <BaseCard title="Quick Info">
        <div class="space-y-5">
          <div class="flex items-center gap-3">
            <CalendarDays class="text-sky-500" :size="20" />
            <div>
              <p class="text-sm font-medium">Joined</p>
              <p :style="{ color: 'var(--muted)' }">
                {{ user.joined }}
              </p>
            </div>
          </div>
          <div class="flex items-center gap-3">
            <Shield class="text-emerald-500" :size="20" />

            <div>
              <p class="text-sm font-medium">Account Role</p>

              <p :style="{ color: 'var(--muted)' }">
                {{ user.role }}
              </p>
            </div>
          </div>
        </div>
      </BaseCard>
    </section>

    <!-- Personal Information -->

    <BaseCard title="Personal Information" description="Your account details">
      <div class="grid gap-5 md:grid-cols-2">
        <div>
          <label class="mb-2 block text-sm font-medium"> Full Name </label>

          <input
            disabled
            :value="user.name"
            class="w-full rounded-xl border p-3"
            :style="{
              borderColor: 'var(--border)',
              background: 'var(--background)',
            }"
          />
        </div>

        <div>
          <label class="mb-2 block text-sm font-medium"> Email Address </label>

          <input
            disabled
            :value="user.email"
            class="w-full rounded-xl border p-3"
            :style="{
              borderColor: 'var(--border)',
              background: 'var(--background)',
            }"
          />
        </div>
      </div>
    </BaseCard>

    <!-- Security -->

    <BaseCard title="Security" description="Keep your account secure">
      <div
        class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between"
      >
        <div class="flex gap-4">
          <div
            class="flex h-12 w-12 items-center justify-center rounded-xl bg-red-100"
          >
            <LockKeyhole class="text-red-500" :size="22" />
          </div>

          <div>
            <h3 class="font-semibold">Password</h3>

            <p :style="{ color: 'var(--muted)' }">Last updated 30 days ago</p>
          </div>
        </div>

        <button
          class="flex items-center justify-center gap-2 rounded-xl bg-sky-600 px-5 py-3 text-white transition hover:opacity-90"
        >
          <Pencil :size="18" />
          Change Password
        </button>
      </div>
    </BaseCard>
  </div>
</template>
