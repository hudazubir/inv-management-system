<script setup>
import { ChevronDown, Search, X } from 'lucide-vue-next'

defineProps({
  search: {
    type: String,
    default: '',
  },
  category: {
    type: String,
    default: '',
  },
  status: {
    type: String,
    default: '',
  },
  categories: {
    type: Array,
    default: () => [],
  },
})

const emit = defineEmits([
  'update:search',
  'update:category',
  'update:status',
  'clear',
])
</script>

<template>
  <section
    class="flex flex-col gap-3 rounded-2xl border border-stone-200 bg-white p-4 shadow-sm lg:flex-row"
    aria-label="Product filters"
  >
    <label class="relative flex-1">
      <span class="sr-only">Search products</span>

      <Search
        :size="18"
        class="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400"
      />

      <input
        type="search"
        :value="search"
        placeholder="Search by name, SKU, or supplier..."
        class="w-full rounded-xl border border-stone-200 bg-stone-50 py-2.5 pl-11 pr-4 text-sm text-stone-800 outline-none transition focus:border-amber-400 focus:bg-white focus:ring-4 focus:ring-amber-100"
        @input="emit('update:search', $event.target.value)"
      />
    </label>


    <label class="relative">
        <span class="sr-only">Filter by category</span>

        <select
            :value="category"
            class="min-w-44 appearance-none rounded-xl border border-stone-200 bg-stone-50 py-2.5 pl-4 pr-11 text-sm text-stone-700 outline-none focus:border-amber-400 focus:ring-4 focus:ring-amber-100"
            @change="emit('update:category', $event.target.value)"
        >
            <option value="">All categories</option>

            <option
            v-for="categoryName in categories"
            :key="categoryName"
            :value="categoryName"
            >
            {{ categoryName }}
            </option>
        </select>

        <ChevronDown
            :size="17"
            class="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-stone-400"
        />
    </label>

    <label class="relative">
        <span class="sr-only">Filter by stock status</span>

        <select
            :value="status"
            class="min-w-40 appearance-none rounded-xl border border-stone-200 bg-stone-50 py-2.5 pl-4 pr-11 text-sm text-stone-700 outline-none focus:border-amber-400 focus:ring-4 focus:ring-amber-100"
            @change="emit('update:status', $event.target.value)"
        >
            <option value="">All statuses</option>
            <option value="in-stock">In stock</option>
            <option value="low-stock">Low stock</option>
            <option value="out-of-stock">Out of stock</option>
        </select>

        <ChevronDown
            :size="17"
            class="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-stone-400"
        />
    </label>

    <button
      v-if="search || category || status"
      type="button"
      class="inline-flex items-center justify-center gap-2 rounded-xl border border-stone-200 px-4 py-2.5 text-sm font-semibold text-stone-600 transition hover:bg-stone-50"
      @click="emit('clear')"
    >
      <X :size="17" />
      Clear
    </button>
  </section>
</template>