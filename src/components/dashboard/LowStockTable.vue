<script setup>
import { MoreHorizontal } from 'lucide-vue-next'

const products = [
  {
    id: 1,
    name: 'Wireless Mouse',
    sku: 'WM-1042',
    stock: 5,
    reorderLevel: 10,
  },
  {
    id: 2,
    name: 'Mechanical Keyboard',
    sku: 'MK-2081',
    stock: 3,
    reorderLevel: 8,
  },
  {
    id: 3,
    name: 'USB-C Docking Station',
    sku: 'DS-3104',
    stock: 2,
    reorderLevel: 6,
  },
  {
    id: 4,
    name: '27-inch Monitor',
    sku: 'MN-4027',
    stock: 0,
    reorderLevel: 5,
  },
  {
    id: 5,
    name: 'Ergonomic Office Chair',
    sku: 'OC-5018',
    stock: 4,
    reorderLevel: 10,
  },
]

function stockStatus(stock) {
  return stock === 0 ? 'Out of stock' : 'Low stock'
}
</script>

<template>
  <article
    class="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm"
  >
    <header class="flex items-center justify-between border-b border-stone-100 p-5">
      <div>
        <h3 class="text-lg font-bold text-stone-900">Stock Alerts</h3>
        <p class="mt-1 text-sm text-stone-500">
          Products at or below their reorder level.
        </p>
      </div>

      <button
        type="button"
        class="text-sm font-semibold text-amber-700 hover:text-amber-800"
      >
        View products
      </button>
    </header>

    <div class="overflow-x-auto">
      <table class="w-full min-w-[680px] text-left">
        <thead class="bg-stone-50 text-xs uppercase tracking-wider text-stone-500">
          <tr>
            <th class="px-5 py-3 font-semibold">Product</th>
            <th class="px-5 py-3 font-semibold">SKU</th>
            <th class="px-5 py-3 font-semibold">Stock</th>
            <th class="px-5 py-3 font-semibold">Reorder level</th>
            <th class="px-5 py-3 font-semibold">Status</th>
            <th class="px-5 py-3 text-right font-semibold">
              <span class="sr-only">Actions</span>
            </th>
          </tr>
        </thead>

        <tbody class="divide-y divide-stone-100">
          <tr
            v-for="product in products"
            :key="product.id"
            class="transition hover:bg-stone-50"
          >
            <td class="px-5 py-4">
              <p class="text-sm font-semibold text-stone-800">
                {{ product.name }}
              </p>
            </td>

            <td class="px-5 py-4 text-sm text-stone-500">
              {{ product.sku }}
            </td>

            <td class="px-5 py-4 text-sm font-bold text-stone-800">
              {{ product.stock }}
            </td>

            <td class="px-5 py-4 text-sm text-stone-500">
              {{ product.reorderLevel }}
            </td>

            <td class="px-5 py-4">
              <span
                class="inline-flex rounded-full px-2.5 py-1 text-xs font-semibold"
                :class="
                  product.stock === 0
                    ? 'bg-red-100 text-red-700'
                    : 'bg-orange-100 text-orange-700'
                "
              >
                {{ stockStatus(product.stock) }}
              </span>
            </td>

            <td class="px-5 py-4 text-right">
              <button
                type="button"
                class="rounded-lg p-2 text-stone-400 hover:bg-stone-100 hover:text-stone-700"
                :aria-label="`Actions for ${product.name}`"
              >
                <MoreHorizontal :size="18" />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </article>
</template>