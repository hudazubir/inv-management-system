<script setup>
import {
  Boxes,
  CircleDollarSign,
  PackageX,
  Tags,
  TriangleAlert,
} from 'lucide-vue-next'

import StatCard from '@/components/dashboard/StatCard.vue'
import StockMovementChart from '@/components/dashboard/StockMovementChart.vue'
import InventoryStatusChart from '@/components/dashboard/InventoryStatusChart.vue'
import RecentActivities from '@/components/dashboard/RecentActivities.vue'
import LowStockTable from '@/components/dashboard/LowStockTable.vue'

const statistics = [
  {
    title: 'Total Products',
    value: '248',
    description: 'Across all warehouses',
    icon: Boxes,
    tone: 'amber',
  },
  {
    title: 'Total Categories',
    value: '18',
    description: 'Active product groups',
    icon: Tags,
    tone: 'blue',
  },
  {
    title: 'Low Stock',
    value: '12',
    description: 'Require attention',
    icon: TriangleAlert,
    tone: 'orange',
  },
  {
    title: 'Out of Stock',
    value: '4',
    description: 'Restock immediately',
    icon: PackageX,
    tone: 'red',
  },
  {
    title: 'Inventory Value',
    value: 'RM 186,420',
    description: 'Current stock value',
    icon: CircleDollarSign,
    tone: 'emerald',
  },
]
</script>

<template>
  <div class="space-y-6">
    <section class="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p class="text-sm font-medium text-stone-500">
          Monday, 27 July 2026
        </p>

        <h2 class="mt-1 text-2xl font-bold tracking-tight text-stone-900">
          Good morning, Admin
        </h2>

        <p class="mt-1 text-sm text-stone-500">
          Here’s what is happening with your inventory today.
        </p>
      </div>

      <div
        class="inline-flex w-fit items-center gap-2 rounded-xl border border-stone-200 bg-white px-4 py-2.5 text-sm font-medium text-stone-600 shadow-sm"
      >
        <span class="h-2 w-2 rounded-full bg-emerald-500"></span>
        Inventory data is up to date
      </div>
    </section>

    <section
      class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5"
      aria-label="Inventory statistics"
    >
      <StatCard
        v-for="statistic in statistics"
        :key="statistic.title"
        :title="statistic.title"
        :value="statistic.value"
        :description="statistic.description"
        :icon="statistic.icon"
        :tone="statistic.tone"
      />
    </section>

    <section class="grid gap-6 xl:grid-cols-3">
      <div class="xl:col-span-2">
        <StockMovementChart />
      </div>

      <InventoryStatusChart />
    </section>

    <section>
      <RecentActivities />
    </section>

    <section class="grid items-start gap-6 xl:grid-cols-3">
      <div class="xl:col-span-2">
        <LowStockTable />
      </div>

      <RecentActivities />
    </section>
  </div>
</template>