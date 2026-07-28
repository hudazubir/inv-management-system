<script setup>
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  value: {
    type: [String, Number],
    required: true,
  },
  description: {
    type: String,
    default: '',
  },
  icon: {
    type: [Object, Function],
    required: true,
  },
  tone: {
    type: String,
    default: 'amber',
  },
})

const toneClasses = {
  amber: {
    icon: 'bg-amber-100 text-amber-700',
    dot: 'bg-amber-500',
  },
  emerald: {
    icon: 'bg-emerald-100 text-emerald-700',
    dot: 'bg-emerald-500',
  },
  blue: {
    icon: 'bg-blue-100 text-blue-700',
    dot: 'bg-blue-500',
  },
  orange: {
    icon: 'bg-orange-100 text-orange-700',
    dot: 'bg-orange-500',
  },
  red: {
    icon: 'bg-red-100 text-red-700',
    dot: 'bg-red-500',
  },
}
</script>

<template>
  <article
    class="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
  >
    <div class="flex items-start justify-between gap-4">
      <div>
        <p class="text-sm font-medium text-stone-500">{{ title }}</p>

        <p class="mt-2 text-2xl font-bold tracking-tight text-stone-900">
          {{ value }}
        </p>
      </div>

      <div
        class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl"
        :class="toneClasses[props.tone].icon"
      >
        <component :is="icon" :size="21" />
      </div>
    </div>

    <div v-if="description" class="mt-4 flex items-center gap-2">
      <span
        class="h-1.5 w-1.5 rounded-full"
        :class="toneClasses[props.tone].dot"
      ></span>

      <p class="text-xs text-stone-500">{{ description }}</p>
    </div>
  </article>
</template>