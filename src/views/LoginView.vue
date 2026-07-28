<script setup>
import { ref } from 'vue'
// import { useRouter } from 'vue-router'
import { Eye, EyeOff, LockKeyhole, Mail } from 'lucide-vue-next'
import { RouterLink, useRouter } from 'vue-router'

import { useAuthStore } from '@/stores/useAuthStore'

const router = useRouter()
const authStore = useAuthStore()

const email = ref('')
const password = ref('')
const showPassword = ref(false)
const errorMessage = ref('')

async function handleLogin() {
  errorMessage.value = ''

  try {
    await authStore.signIn(email.value.trim(), password.value)
    await router.push({ name: 'dashboard' })
  } catch (error) {
    errorMessage.value = error.message
  }
}
</script>

<template>
  <section>
    <div class="mb-8 lg:hidden">
      <p class="text-2xl font-bold text-stone-900">Shelfwise</p>
      <p class="text-sm text-stone-500">Inventory Management</p>
    </div>

    <div>
      <p class="text-sm font-semibold uppercase tracking-widest text-amber-600">
        Welcome back
      </p>

      <h2 class="mt-2 text-3xl font-bold tracking-tight text-stone-900">
        Sign in to your account
      </h2>

      <p class="mt-2 text-sm text-stone-500">
        Enter your account details to access your inventory.
      </p>
    </div>

    <form class="mt-8 space-y-5" @submit.prevent="handleLogin">
      <div>
        <label for="email" class="text-sm font-semibold text-stone-700">
          Email address
        </label>

        <div class="relative mt-2">
          <Mail
            :size="18"
            class="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400"
          />

          <input
            id="email" v-model="email" required
            type="email"
            autocomplete="email"
            placeholder="name@company.com"
            class="w-full rounded-xl border border-stone-300 bg-white py-3 pl-11 pr-4 text-sm text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-amber-500 focus:ring-4 focus:ring-amber-100"
          />
        </div>
      </div>

      <div>
        <div class="flex items-center justify-between">
          <label for="password" class="text-sm font-semibold text-stone-700">
            Password
          </label>

          <RouterLink
            :to="{ name: 'forgot-password' }"
            class="text-sm font-semibold text-amber-700 hover:text-amber-800"
          >
            Forgot password?
          </RouterLink>
        </div>

        <div class="relative mt-2">
          <LockKeyhole
            :size="18"
            class="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400"
          />

          <input
            id="password"
            v-model="password"
            required
            :type="showPassword ? 'text' : 'password'"
            autocomplete="current-password"
            placeholder="Enter your password"
            class="w-full rounded-xl border border-stone-300 bg-white py-3 pl-11 pr-12 text-sm text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-amber-500 focus:ring-4 focus:ring-amber-100"
          />

          <button
            type="button"
            class="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700"
            :aria-label="showPassword ? 'Hide password' : 'Show password'"
            @click="showPassword = !showPassword"
          >
            <EyeOff v-if="showPassword" :size="18" />
            <Eye v-else :size="18" />
          </button>
        </div>
      </div>

      <label class="flex items-center gap-2 text-sm text-stone-600">
        <input
          type="checkbox"
          class="h-4 w-4 rounded border-stone-300 accent-amber-500"
        />
        Remember me
      </label>

      <div
        v-if="errorMessage"
        role="alert"
        class="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
      >
        {{ errorMessage }}
      </div>

      <button
        type="submit"
        :disabled="authStore.isLoading"
        class="w-full rounded-xl bg-stone-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-stone-800 focus:outline-none focus:ring-4 focus:ring-amber-200 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {{ authStore.isLoading ? 'Signing in...' : 'Sign in' }}
      </button>
    </form>

    <p class="mt-8 text-center text-xs text-stone-400">
      Authentication will be connected to Supabase in Phase 9.
    </p>
  </section>
</template>