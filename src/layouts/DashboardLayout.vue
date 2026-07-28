<script setup>
import { ref } from 'vue'
import AppHeader from '@/components/navigation/AppHeader.vue'
import AppSidebar from '@/components/navigation/AppSidebar.vue'
import { RouterView } from 'vue-router'

const isSidebarOpen = ref(false)

function toggleSidebar() {
  isSidebarOpen.value = !isSidebarOpen.value
}

function closeSidebar() {
  isSidebarOpen.value = false
}
</script>

<template>
  <div class="min-h-screen bg-stone-100">
    <!-- Desktop sidebar -->
    <div class="fixed inset-y-0 left-0 z-30 hidden lg:block">
      <AppSidebar />
    </div>

    <!-- Mobile backdrop -->
    <div
      v-if="isSidebarOpen"
      class="fixed inset-0 z-40 bg-slate-950/50 lg:hidden"
      aria-hidden="true"
      @click="closeSidebar"
    ></div>

    <!-- Mobile sidebar -->
    <div
      class="fixed inset-y-0 left-0 z-50 transition-transform duration-300 lg:hidden"
      :class="isSidebarOpen ? 'translate-x-0' : '-translate-x-full'"
    >
        <AppSidebar @close="closeSidebar" />
    </div>

    <!-- Header and page content -->
    <div class="flex min-h-screen flex-col lg:pl-70">
      <AppHeader @toggle-sidebar="toggleSidebar" />

        <main class="flex-1 overflow-x-hidden p-4 sm:p-6 lg:p-8">
            <div class="mx-auto max-w-screen-2xl">
                <RouterView />
            </div>
        </main>
    </div>
  </div>
</template>