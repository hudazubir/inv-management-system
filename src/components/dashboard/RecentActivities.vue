<script setup>
import {
  ArrowDownToLine,
  ArrowUpFromLine,
  PackagePlus,
  Pencil,
} from 'lucide-vue-next'

const activities = [
  {
    id: 1,
    title: 'Stock received',
    description: '40 units of Wireless Mouse were added.',
    time: '12 minutes ago',
    icon: ArrowDownToLine,
    tone: 'emerald',
  },
  {
    id: 2,
    title: 'Stock dispatched',
    description: '8 units of Mechanical Keyboard were removed.',
    time: '35 minutes ago',
    icon: ArrowUpFromLine,
    tone: 'orange',
  },
  {
    id: 3,
    title: 'Product created',
    description: 'USB-C Docking Station was added to Products.',
    time: '2 hours ago',
    icon: PackagePlus,
    tone: 'blue',
  },
  {
    id: 4,
    title: 'Product updated',
    description: 'Office Chair reorder level was changed.',
    time: '4 hours ago',
    icon: Pencil,
    tone: 'amber',
  },
]

const toneClasses = {
  emerald: 'bg-emerald-100 text-emerald-700',
  orange: 'bg-orange-100 text-orange-700',
  blue: 'bg-blue-100 text-blue-700',
  amber: 'bg-amber-100 text-amber-700',
}
</script>

<template>
  <article class="rounded-2xl border border-stone-200 bg-white shadow-sm">
    <header class="flex items-center justify-between border-b border-stone-100 p-5">
      <div>
        <h3 class="text-lg font-bold text-stone-900">Recent Activities</h3>
        <p class="mt-1 text-sm text-stone-500">
          Latest inventory changes.
        </p>
      </div>

      <button
        type="button"
        class="text-sm font-semibold text-amber-700 hover:text-amber-800"
      >
        View all
      </button>
    </header>

    <div class="divide-y divide-stone-100 px-5">
      <div
        v-for="activity in activities"
        :key="activity.id"
        class="flex gap-3 py-4"
      >
        <div
          class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
          :class="toneClasses[activity.tone]"
        >
          <component :is="activity.icon" :size="18" />
        </div>

        <div class="min-w-0 flex-1">
          <div class="flex flex-col gap-1 sm:flex-row sm:justify-between">
            <p class="text-sm font-semibold text-stone-800">
              {{ activity.title }}
            </p>

            <time class="shrink-0 text-xs text-stone-400">
              {{ activity.time }}
            </time>
          </div>

          <p class="mt-1 text-sm leading-5 text-stone-500">
            {{ activity.description }}
          </p>
        </div>
      </div>
    </div>
  </article>
</template>