<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { ArrowLeft, Mail } from 'lucide-vue-next'

import { useAuthStore } from '@/stores/useAuthStore'

const authStore = useAuthStore()

const email = ref('')
const isSubmitting = ref(false)
const errorMessage = ref('')
const successMessage = ref('')

async function handleSubmit() {
  errorMessage.value = ''
  successMessage.value = ''
  isSubmitting.value = true

  try {
    await authStore.sendPasswordReset(email.value.trim())

    successMessage.value =
      'If an account exists for this email, a reset link has been sent.'
  } catch (error) {
    errorMessage.value = error.message
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <section>
    <p class="text-sm font-semibold uppercase tracking-widest text-amber-600">
      Account recovery
    </p>

    <h2 class="mt-2 text-3xl font-bold tracking-tight text-stone-900">
      Reset your password
    </h2>

    <p class="mt-2 text-sm leading-6 text-stone-500">
      Enter your email address and we’ll send you a secure password-reset link.
    </p>

    <form class="mt-8 space-y-5" @submit.prevent="handleSubmit">
      <label class="block">
        <span class="text-sm font-semibold text-stone-700">
          Email address
        </span>

        <div class="relative mt-2">
          <Mail
            :size="18"
            class="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400"
          />

          <input
            v-model="email"
            type="email"
            required
            autocomplete="email"
            placeholder="name@company.com"
            class="w-full rounded-xl border border-stone-300 bg-white py-3 pl-11 pr-4 text-sm outline-none focus:border-amber-500 focus:ring-4 focus:ring-amber-100"
          />
        </div>
      </label>

      <div
        v-if="errorMessage"
        role="alert"
        class="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
      >
        {{ errorMessage }}
      </div>

      <div
        v-if="successMessage"
        role="status"
        class="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700"
      >
        {{ successMessage }}
      </div>

      <button
        type="submit"
        :disabled="isSubmitting"
        class="w-full rounded-xl bg-stone-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-stone-800 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {{ isSubmitting ? 'Sending link...' : 'Send reset link' }}
      </button>
    </form>

    <RouterLink
      :to="{ name: 'login' }"
      class="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-stone-600 hover:text-amber-700"
    >
      <ArrowLeft :size="17" />
      Back to sign in
    </RouterLink>
  </section>
</template>