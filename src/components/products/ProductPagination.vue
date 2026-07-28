<script setup>
import { computed } from 'vue'
import { ChevronLeft, ChevronRight } from 'lucide-vue-next'

const props = defineProps({
  currentPage: {
    type: Number,
    required: true,
  },
  totalItems: {
    type: Number,
    required: true,
  },
  pageSize: {
    type: Number,
    required: true,
  },
})

const emit = defineEmits(['update:currentPage'])

const totalPages = computed(() => {
  return Math.max(1, Math.ceil(props.totalItems / props.pageSize))
})

const visiblePages = computed(() => {
  return Array.from({ length: totalPages.value }, (_, index) => index + 1)
})

const firstItem = computed(() => {
  if (props.totalItems === 0) return 0
  return (props.currentPage - 1) * props.pageSize + 1
})

const lastItem = computed(() => {
  return Math.min(props.currentPage * props.pageSize, props.totalItems)
})

function changePage(page) {
  if (page >= 1 && page <= totalPages.value) {
    emit('update:currentPage', page)
  }
}
</script>

<template>
  <div
    class="flex flex-col gap-3 rounded-2xl border border-stone-200 bg-white px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
  >
    <p class="text-sm text-stone-500">
      Showing
      <span class="font-semibold text-stone-700">{{ firstItem }}</span>
      to
      <span class="font-semibold text-stone-700">{{ lastItem }}</span>
      of
      <span class="font-semibold text-stone-700">{{ totalItems }}</span>
      products
    </p>

    <nav class="flex items-center gap-1" aria-label="Product pagination">
      <button
        type="button"
        class="rounded-lg border border-stone-200 p-2 text-stone-500 transition hover:bg-stone-50 disabled:cursor-not-allowed disabled:opacity-40"
        :disabled="currentPage === 1"
        aria-label="Previous page"
        @click="changePage(currentPage - 1)"
      >
        <ChevronLeft :size="17" />
      </button>

      <button
        v-for="page in visiblePages"
        :key="page"
        type="button"
        class="h-9 min-w-9 rounded-lg px-2 text-sm font-semibold transition"
        :class="
          page === currentPage
            ? 'bg-stone-950 text-white'
            : 'text-stone-600 hover:bg-stone-100'
        "
        :aria-current="page === currentPage ? 'page' : undefined"
        @click="changePage(page)"
      >
        {{ page }}
      </button>

      <button
        type="button"
        class="rounded-lg border border-stone-200 p-2 text-stone-500 transition hover:bg-stone-50 disabled:cursor-not-allowed disabled:opacity-40"
        :disabled="currentPage === totalPages"
        aria-label="Next page"
        @click="changePage(currentPage + 1)"
      >
        <ChevronRight :size="17" />
      </button>
    </nav>
  </div>
</template>