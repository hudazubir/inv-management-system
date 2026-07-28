<script setup>
import { ChevronDown, Search, X } from 'lucide-vue-next'

defineProps({
  search: {
    type: String,
    default: '',
  },
  type: {
    type: String,
    default: '',
  },
  productId: {
    type: [String, Number],
    default: '',
  },
  products: {
    type: Array,
    required: true,
  },
})

const emit = defineEmits([
  'update:search',
  'update:type',
  'update:productId',
  'clear',
])
</script>

<template>
  <section
    class="flex flex-col gap-3 rounded-2xl border border-stone-200 bg-white p-4 shadow-sm lg:flex-row"
    aria-label="Transaction filters"
  >
    <label class="relative flex-1">
      <span class="sr-only">Search transactions</span>

      <Search
        :size="18"
        class="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400"
      />

      <input
        type="search"
        :value="search"
        placeholder="Search reference, product, SKU, or note..."
        class="w-full rounded-xl border border-stone-200 bg-stone-50 py-2.5 pl-11 pr-4 text-sm outline-none transition focus:border-amber-400 focus:bg-white focus:ring-4 focus:ring-amber-100"
        @input="emit('update:search', $event.target.value)"
      />
    </label>

    <label class="relative">
      <span class="sr-only">Filter by transaction type</span>

      <select
        :value="type"
        class="min-w-40 appearance-none rounded-xl border border-stone-200 bg-stone-50 py-2.5 pl-4 pr-11 text-sm text-stone-700 outline-none focus:border-amber-400 focus:ring-4 focus:ring-amber-100"
        @change="emit('update:type', $event.target.value)"
      >
        <option value="">All movements</option>
        <option value="stock-in">Stock in</option>
        <option value="stock-out">Stock out</option>
      </select>

      <ChevronDown
        :size="17"
        class="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-stone-400"
      />
    </label>

    <label class="relative">
      <span class="sr-only">Filter by product</span>

      <select
        :value="productId"
        class="min-w-52 appearance-none rounded-xl border border-stone-200 bg-stone-50 py-2.5 pl-4 pr-11 text-sm text-stone-700 outline-none focus:border-amber-400 focus:ring-4 focus:ring-amber-100"
        @change="emit('update:productId', $event.target.value)"
      >
        <option value="">All products</option>

        <option
          v-for="product in products"
          :key="product.id"
          :value="product.id"
        >
          {{ product.name }}
        </option>
      </select>

      <ChevronDown
        :size="17"
        class="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-stone-400"
      />
    </label>

    <button
      v-if="search || type || productId"
      type="button"
      class="inline-flex items-center justify-center gap-2 rounded-xl border border-stone-200 px-4 py-2.5 text-sm font-semibold text-stone-600 hover:bg-stone-50"
      @click="emit('clear')"
    >
      <X :size="17" />
      Clear
    </button>
  </section>
</template>