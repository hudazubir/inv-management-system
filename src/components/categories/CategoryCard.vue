<script setup>
import { FolderOpen, Package, Pencil, Trash2 } from 'lucide-vue-next'

defineProps({
  category: {
    type: Object,
    required: true,
  },
})

defineEmits(['edit', 'delete'])

const dateFormatter = new Intl.DateTimeFormat('en-MY', {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
})

function formatDate(date) {
  if (!date) return '—'

  const parsedDate = new Date(date)

  if (Number.isNaN(parsedDate.getTime())) {
    return '—'
  }

  return dateFormatter.format(parsedDate)
}
</script>

<template>
  <article
    class="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
  >
    <div class="flex items-start justify-between gap-4">
      <div
        class="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-100 text-amber-700"
      >
        <FolderOpen :size="21" />
      </div>

      <div class="flex gap-1">
        <button
          type="button"
          class="rounded-lg p-2 text-stone-400 transition hover:bg-amber-50 hover:text-amber-700"
          :aria-label="`Edit ${category.name}`"
          @click="$emit('edit', category)"
        >
          <Pencil :size="17" />
        </button>

        <button
          type="button"
          class="rounded-lg p-2 text-stone-400 transition hover:bg-red-50 hover:text-red-700"
          :aria-label="`Delete ${category.name}`"
          @click="$emit('delete', category)"
        >
          <Trash2 :size="17" />
        </button>
      </div>
    </div>

    <h3 class="mt-5 text-lg font-bold text-stone-900">
      {{ category.name }}
    </h3>

    <p class="mt-2 min-h-10 text-sm leading-5 text-stone-500">
      {{ category.description || 'No description provided.' }}
    </p>

    <div
      class="mt-5 flex items-center justify-between border-t border-stone-100 pt-4"
    >
      <div class="flex items-center gap-2 text-sm text-stone-500">
        <Package :size="16" />
        <span>
          <strong class="font-semibold text-stone-700">
            {{ category.productCount }}
          </strong>
          products
        </span>
      </div>

      <time class="text-xs text-stone-400">
        {{ formatDate(category.createdAt) }}
      </time>
    </div>
  </article>
</template>