<script setup>
import { ArrowDownToLine, ArrowUpFromLine } from 'lucide-vue-next'

const props = defineProps({
  transactions: {
    type: Array,
    required: true,
  },
  products: {
    type: Array,
    required: true,
  },
})

const dateFormatter = new Intl.DateTimeFormat('en-MY', {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
  hour: 'numeric',
  minute: '2-digit',
})

function getProduct(productId) {
  return props.products.find((product) => product.id === productId)
}

function formatDate(date) {
  return dateFormatter.format(new Date(date))
}
</script>

<template>
  <div
    class="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm"
  >
    <div class="overflow-x-auto">
      <table class="w-full min-w-[1050px] text-left">
        <thead class="bg-stone-50 text-xs uppercase tracking-wider text-stone-500">
          <tr>
            <th class="px-5 py-3.5 font-semibold">Reference</th>
            <th class="px-5 py-3.5 font-semibold">Product</th>
            <th class="px-5 py-3.5 font-semibold">Type</th>
            <th class="px-5 py-3.5 font-semibold">Quantity</th>
            <th class="px-5 py-3.5 font-semibold">Date</th>
            <th class="px-5 py-3.5 font-semibold">Recorded by</th>
            <th class="px-5 py-3.5 font-semibold">Note</th>
          </tr>
        </thead>

        <tbody class="divide-y divide-stone-100">
          <tr
            v-for="transaction in transactions"
            :key="transaction.id"
            class="transition hover:bg-stone-50"
          >
            <td class="px-5 py-4 text-sm font-semibold text-stone-700">
              {{ transaction.reference }}
            </td>

            <td class="px-5 py-4">
              <template v-if="getProduct(transaction.productId)">
                <p class="text-sm font-semibold text-stone-800">
                  {{ getProduct(transaction.productId).name }}
                </p>

                <p class="mt-0.5 text-xs text-stone-400">
                  {{ getProduct(transaction.productId).sku }}
                </p>
              </template>

              <span v-else class="text-sm italic text-stone-400">
                Product unavailable
              </span>
            </td>

            <td class="px-5 py-4">
              <span
                class="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold"
                :class="
                  transaction.type === 'stock-in'
                    ? 'bg-emerald-100 text-emerald-700'
                    : 'bg-orange-100 text-orange-700'
                "
              >
                <ArrowDownToLine
                  v-if="transaction.type === 'stock-in'"
                  :size="14"
                />

                <ArrowUpFromLine v-else :size="14" />

                {{ transaction.type === 'stock-in' ? 'Stock in' : 'Stock out' }}
              </span>
            </td>

            <td class="px-5 py-4">
              <span
                class="text-sm font-bold"
                :class="
                  transaction.type === 'stock-in'
                    ? 'text-emerald-700'
                    : 'text-orange-700'
                "
              >
                {{ transaction.type === 'stock-in' ? '+' : '-' }}
                {{ transaction.quantity }}
              </span>
            </td>

            <td class="px-5 py-4 text-sm text-stone-500">
              {{ formatDate(transaction.createdAt) }}
            </td>

            <td class="px-5 py-4 text-sm text-stone-500">
              {{ transaction.performedBy }}
            </td>

            <td class="max-w-64 px-5 py-4 text-sm text-stone-500">
              <p class="truncate" :title="transaction.note">
                {{ transaction.note || '—' }}
              </p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>