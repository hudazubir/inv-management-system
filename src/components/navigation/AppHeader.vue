<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import {
  Bell,
  ChevronDown,
  LogOut,
  Menu,
  Search,
} from 'lucide-vue-next'

import { useAuthStore } from '@/stores/useAuthStore'

defineEmits(['toggle-sidebar'])

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()

const displayName = computed(() => {
  return authStore.profile?.full_name || 'Admin User'
})

const userInitials = computed(() => {
  return displayName.value
    .split(' ')
    .map((word) => word.charAt(0))
    .join('')
    .slice(0, 2)
    .toUpperCase()
})

const displayRole = computed(() => {
  const role = authStore.profile?.role || 'owner'

  return role.charAt(0).toUpperCase() + role.slice(1)
})

async function handleLogout() {
  try {
    await authStore.signOut()
    await router.push({ name: 'login' })
  } catch (error) {
    window.alert(error.message)
  }
}
</script>

<template>
  <header
    class="flex h-20 items-center justify-between border-b border-stone-200 bg-white px-4 sm:px-6"
  >
    <div class="flex items-center gap-4">
      <button
        type="button"
        class="rounded-xl border border-stone-200 p-2.5 text-stone-600 transition hover:border-amber-300 hover:bg-amber-50 lg:hidden"
        aria-label="Open navigation menu"
        @click="$emit('toggle-sidebar')"
      >
        <Menu :size="20" />
      </button>

      <div>
        <p class="text-xs font-semibold uppercase tracking-widest text-amber-600">
          {{ route.meta.section }}
        </p>

        <h1 class="text-xl font-bold tracking-tight text-stone-900">
          {{ route.meta.title }}
        </h1>
      </div>
    </div>

    <div class="flex items-center gap-2 sm:gap-4">
      <label
        class="hidden w-64 items-center gap-2 rounded-xl border border-stone-200 bg-stone-50 px-3 py-2.5 focus-within:border-amber-400 focus-within:ring-2 focus-within:ring-amber-100 md:flex"
      >
        <Search :size="18" class="text-stone-400" />

        <input
          type="search"
          placeholder="Search inventory..."
          class="w-full bg-transparent text-sm text-stone-800 outline-none placeholder:text-stone-400"
        />
      </label>

      <button
        type="button"
        class="relative rounded-xl border border-stone-200 p-2.5 text-stone-600 transition hover:border-amber-300 hover:bg-amber-50"
        aria-label="View notifications"
      >
        <Bell :size="20" />

        <span
          class="absolute right-2 top-2 h-2 w-2 rounded-full bg-amber-500 ring-2 ring-white"
          aria-hidden="true"
        ></span>
      </button>

      <button
        type="button"
        class="flex items-center gap-3 rounded-xl p-1.5 transition hover:bg-stone-50"
      >
        <div
          class="flex h-10 w-10 items-center justify-center rounded-xl bg-stone-900 text-sm font-bold text-amber-400"
        >
          {{ userInitials }}
        </div>

        <div class="hidden text-left sm:block">
          <p class="text-sm font-semibold text-stone-800">
            {{ displayName }}
          </p>

          <p class="text-xs text-stone-500">
            {{ displayRole }}
          </p>
        </div>

        <ChevronDown
          :size="16"
          class="hidden text-stone-400 sm:block"
        />
      </button>

      <button
        type="button"
        class="inline-flex items-center gap-2 rounded-xl border border-stone-200 p-2.5 text-stone-600 transition hover:border-red-200 hover:bg-red-50 hover:text-red-700 sm:px-3"
        :disabled="authStore.isLoading"
        aria-label="Sign out"
        @click="handleLogout"
      >
        <LogOut :size="19" />

        <span class="hidden text-sm font-semibold lg:inline">
          Sign out
        </span>
      </button>
    </div>
  </header>
</template>