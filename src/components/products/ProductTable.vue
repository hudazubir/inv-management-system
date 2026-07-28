<script setup>
import { Eye, Pencil, Trash2 } from 'lucide-vue-next'
import ProductStatusBadge from './ProductStatusBadge.vue'

defineProps({
  products: {
    type: Array,
    required: true,
  },
})

defineEmits(['view', 'edit', 'delete'])

const currencyFormatter = new Intl.NumberFormat('en-MY', {
  style: 'currency',
  currency: 'MYR',
})

function formatCurrency(value) {
  return currencyFormatter.format(value)
}
</script>

<template>
  <div class="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm">
    <div class="overflow-x-auto">
      <table class="w-full min-w-[950px] text-left">
        <thead class="bg-stone-50 text-xs uppercase tracking-wider text-stone-500">
          <tr>
            <th class="px-5 py-3.5 font-semibold">Product</th>
            <th class="px-5 py-3.5 font-semibold">SKU</th>
            <th class="px-5 py-3.5 font-semibold">Category</th>
            <th class="px-5 py-3.5 font-semibold">Price</th>
            <th class="px-5 py-3.5 font-semibold">Stock</th>
            <th class="px-5 py-3.5 font-semibold">Status</th>
            <th class="px-5 py-3.5 text-right font-semibold">Actions</th>
          </tr>
        </thead>

        <tbody class="divide-y divide-stone-100">
          <tr
            v-for="product in products"
            :key="product.id"
            class="transition hover:bg-stone-50"
          >
            <td class="px-5 py-4">
              <div class="flex items-center gap-3">
                <div
                  class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-100 font-bold text-amber-700"
                >
                  {{ product.name.charAt(0) }}
                </div>

                <div>
                  <p class="text-sm font-semibold text-stone-800">
                    {{ product.name }}
                  </p>

                  <p class="mt-0.5 max-w-48 truncate text-xs text-stone-400">
                    {{ product.supplier }}
                  </p>
                </div>
              </div>
            </td>

            <td class="px-5 py-4 text-sm font-medium text-stone-500">
              {{ product.sku }}
            </td>

            <td class="px-5 py-4 text-sm text-stone-500">
              {{ product.category }}
            </td>

            <td class="px-5 py-4 text-sm font-semibold text-stone-800">
              {{ formatCurrency(product.price) }}
            </td>

            <td class="px-5 py-4">
              <p class="text-sm font-bold text-stone-800">
                {{ product.stock }}
              </p>

              <p class="text-xs text-stone-400">
                Reorder at {{ product.reorderLevel }}
              </p>
            </td>

            <td class="px-5 py-4">
              <ProductStatusBadge
                :stock="product.stock"
                :reorder-level="product.reorderLevel"
              />
            </td>

            <td class="px-5 py-4">
              <div class="flex justify-end gap-1">
                <button
                  type="button"
                  class="rounded-lg p-2 text-stone-400 transition hover:bg-blue-50 hover:text-blue-700"
                  :aria-label="`View ${product.name}`"
                  @click="$emit('view', product)"
                >
                  <Eye :size="17" />
                </button>

                <button
                  type="button"
                  class="rounded-lg p-2 text-stone-400 transition hover:bg-amber-50 hover:text-amber-700"
                  :aria-label="`Edit ${product.name}`"
                  @click="$emit('edit', product)"
                >
                  <Pencil :size="17" />
                </button>

                <button
                  type="button"
                  class="rounded-lg p-2 text-stone-400 transition hover:bg-red-50 hover:text-red-700"
                  :aria-label="`Delete ${product.name}`"
                  @click="$emit('delete', product)"
                >
                  <Trash2 :size="17" />
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>