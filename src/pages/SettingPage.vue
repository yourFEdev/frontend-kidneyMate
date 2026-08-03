<script setup lang="ts">
import { computed } from "vue";
import { storeToRefs } from "pinia";
import {
  BaseButton,
  BaseDialog,
  BaseInput,
  BaseFormField,
  BaseHeader,
  BaseCard,
} from "../components/common/";

import { Shield, CalendarDays, LockKeyhole, Pencil } from "lucide-vue-next";

import { StatSkeleton, HeaderSkeleton } from "../components/skeleton";
import { useAuthStore } from "../stores/auth.ts";
import { reactive, ref } from "vue";
import { useProfileStore } from "../stores/profile.store";

const authStore = useAuthStore();
const { user, loading } = storeToRefs(authStore);

const initials = computed(() => {
  if (!user.value?.name) return "?";
  return user.value.name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase();
});

const profileStore = useProfileStore();
const showPasswordDialog = ref(false);
const passwordForm = reactive({
  current_password: "",
  password: "",
  password_confirmation: "",
});

async function savePassword() {
  await profileStore.changePassword(passwordForm);
  showPasswordDialog.value = false;
  passwordForm.current_password = "";
  passwordForm.password = "";
  passwordForm.password_confirmation = "";
}
</script>

<template>
  <div class="space-y-8 text-[var(--muted)]">
    <HeaderSkeleton v-if="loading" />
    <BaseHeader
      title="Account Settings"
      subtitle="Manage your account information and security."
      v-else
    />

    <StatSkeleton v-if="loading" />
    <section class="grid gap-6 lg:grid-cols-3" v-else>
      <div class="lg:col-span-2">
        <BaseCard title="Account Info">
          <div class="flex flex-col gap-6 md:flex-row md:items-center">
            <div
              class="flex h-24 w-24 items-center justify-center rounded-full bg-sky-100 text-3xl font-bold text-sky-600"
            >
              {{ initials }}
            </div>
            <div>
              <h2
                class="text-2xl font-bold"
                :style="{ color: 'var(--foreground)' }"
              >
                {{ user?.name }}
              </h2>
              <p class="mt-1">
                {{ user?.email }}
              </p>
              <span
                class="mt-4 inline-flex rounded-full bg-sky-100 px-4 py-1 text-sm font-medium text-sky-700"
              >
                Patient
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
                {{ new Date(user!.created_at).toLocaleDateString() }}
              </p>
            </div>
          </div>
          <div class="flex items-center gap-3">
            <Shield class="text-emerald-500" :size="20" />

            <div>
              <p class="text-sm font-medium">Account Role</p>

              <p :style="{ color: 'var(--muted)' }">Patient</p>
            </div>
          </div>
        </div>
      </BaseCard>
    </section>

    <!-- Personal Information -->
    <StatSkeleton v-if="loading" />
    <BaseCard
      title="Personal Information"
      description="Your account details"
      v-else
    >
      <div class="grid gap-5 md:grid-cols-2">
        <div>
          <label class="mb-2 block text-sm font-medium"> Full Name </label>

          <input
            disabled
            :value="user?.name"
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
            :value="user?.email"
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
    <StatSkeleton v-if="loading" />
    <BaseCard title="Security" description="Keep your account secure" v-else>
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

        <BaseButton @click="showPasswordDialog = true">
          <Pencil class="mr-2 h-4 w-4" />
          Change Password
        </BaseButton>
      </div>
    </BaseCard>

    <BaseDialog
      v-model:open="showPasswordDialog"
      title="Change Password"
      description="Update your account password."
    >
      <div class="space-y-5">
        <BaseFormField label="Current Password">
          <BaseInput
            v-model="passwordForm.current_password"
            type="password"
            placeholder="Current password"
          />
        </BaseFormField>

        <BaseFormField label="New Password">
          <BaseInput
            v-model="passwordForm.password"
            type="password"
            placeholder="New password"
          />
        </BaseFormField>

        <BaseFormField label="Confirm Password">
          <BaseInput
            v-model="passwordForm.password_confirmation"
            type="password"
            placeholder="Confirm password"
          />
        </BaseFormField>
      </div>

      <template #footer>
        <div class="flex gap-3">
          <BaseButton variant="outline" @click="showPasswordDialog = false">
            Cancel
          </BaseButton>

          <BaseButton :loading="profileStore.loading" @click="savePassword">
            Save Password
          </BaseButton>
        </div>
      </template>
    </BaseDialog>
  </div>
</template>
