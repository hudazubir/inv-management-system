<script setup>
import {
  ArrowDownUp,
  ChartNoAxesCombined,
  LayoutGrid,
  PackageOpen,
  Shapes,
  Store,
  Truck,
  X,
} from 'lucide-vue-next'

import { RouterLink, useRoute } from 'vue-router'

defineEmits(['close'])
const route = useRoute()

const menuItems = [
  { label: 'Overview', icon: LayoutGrid, route: 'dashboard' },
  { label: 'Products', icon: PackageOpen, route: 'products' },
  { label: 'Categories', icon: Shapes, route: 'categories' },
  { label: 'Suppliers', icon: Truck, route: 'suppliers' },
  { label: 'Stock Movement', icon: ArrowDownUp, route: 'transactions' },
  { label: 'Reports', icon: ChartNoAxesCombined, route: 'reports' },
]
</script>

<template>
  <aside
    class="flex h-full w-72 flex-col border-r border-stone-800 bg-stone-950 text-stone-400"
  >
    <!-- Brand -->
    <div class="flex h-20 items-center gap-3 px-6">
      <div
        class="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-400 text-stone-950 shadow-lg shadow-amber-950/20"
      >
        <Store :size="23" :stroke-width="2.2" />
      </div>

      <div>
        <p class="text-lg font-bold tracking-tight text-white">Shelfwise</p>
        <p class="text-xs font-medium uppercase tracking-widest text-stone-500">
          Inventory
        </p>
      </div>
    </div>

    <button
        type="button"
        class="ml-auto rounded-lg p-2 text-stone-500 transition hover:bg-stone-800 hover:text-white lg:hidden"
        aria-label="Close navigation menu"
        @click="$emit('close')"
        >
        <X :size="20" />
        </button>

    <!-- Workspace -->
    <div class="mx-4 mb-5 rounded-xl border border-stone-800 bg-stone-900 p-3">
      <p class="text-xs font-medium text-stone-500">Current workspace</p>

      <div class="mt-1 flex items-center justify-between">
        <p class="truncate text-sm font-semibold text-stone-200">
          Main Warehouse
        </p>

        <span class="h-2 w-2 rounded-full bg-emerald-400"></span>
      </div>
    </div>

    <!-- Navigation -->
    <nav class="flex-1 space-y-1 px-4" aria-label="Main navigation">
      <p
        class="mb-3 px-3 text-[11px] font-semibold uppercase tracking-widest text-stone-600"
      >
        Operations
      </p>

      <RouterLink
        v-for="item in menuItems"
        :key="item.route"
        :to="{ name: item.route }"
        class="group relative flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-medium transition"
        :class="
          route.name === item.route
            ? 'bg-stone-800 text-white'
            : 'hover:bg-stone-900 hover:text-stone-200'
        "
        @click="$emit('close')"
      >
        <span
          v-if="route.name === item.route"
          class="absolute -left-4 h-7 w-1 rounded-r-full bg-amber-400"
        ></span>

        <component
          :is="item.icon"
          :size="19"
          :class="
            route.name === item.route ? 'text-amber-400' : 'text-stone-500'
          "
        />

        <span>{{ item.label }}</span>
      </RouterLink>
    </nav>

    <!-- Footer -->
    <div class="border-t border-stone-800 p-4">
      <div class="rounded-xl bg-stone-900 p-3">
        <div class="flex items-center justify-between">
          <p class="text-xs font-medium text-stone-300">System status</p>
          <span class="text-xs font-semibold text-emerald-400">Healthy</span>
        </div>

        <div class="mt-2 h-1.5 overflow-hidden rounded-full bg-stone-800">
          <div class="h-full w-4/5 rounded-full bg-amber-400"></div>
        </div>

        <p class="mt-2 text-[11px] text-stone-600">
          80% inventory capacity
        </p>
      </div>
    </div>
  </aside>
</template>