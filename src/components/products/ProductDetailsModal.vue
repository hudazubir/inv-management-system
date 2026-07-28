<script setup>
import { computed } from 'vue'

import AppModal from '@/components/common/AppModal.vue'
import ProductStatusBadge from './ProductStatusBadge.vue'

const props = defineProps({
  open: {
    type: Boolean,
    default: false,
  },
  product: {
    type: Object,
    default: null,
  },
})

defineEmits(['close', 'edit'])

const currencyFormatter = new Intl.NumberFormat('en-MY', {
  style: 'currency',
  currency: 'MYR',
})

const inventoryValue = computed(() => {
  if (!props.product) return 0
  return props.product.price * props.product.stock
})

function formatCurrency(value) {
  return currencyFormatter.format(value)
}
</script>

<template>
  <AppModal
    :open="open"
    title="Product details"
    description="Product information and current inventory status."
    @close="$emit('close')"
  >
    <div v-if="product" class="space-y-6">
      <section class="flex items-start gap-4">
        <div
          class="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-amber-100 text-2xl font-bold text-amber-700"
        >
          {{ product.name.charAt(0) }}
        </div>

        <div class="min-w-0">
          <h3 class="text-xl font-bold text-stone-900">
            {{ product.name }}
          </h3>

          <p class="mt-1 text-sm font-medium text-stone-500">
            {{ product.sku }}
          </p>

          <div class="mt-3">
            <ProductStatusBadge
              :stock="product.stock"
              :reorder-level="product.reorderLevel"
            />
          </div>
        </div>
      </section>

      <section class="grid gap-3 sm:grid-cols-3">
        <div class="rounded-xl bg-stone-50 p-4">
          <Package :size="19" class="text-amber-700" />
          <p class="mt-3 text-xs font-medium text-stone-500">Current stock</p>
          <p class="mt-1 text-lg font-bold text-stone-900">
            {{ product.stock }} units
          </p>
        </div>

        <div class="rounded-xl bg-stone-50 p-4">
          <RotateCcw :size="19" class="text-amber-700" />
          <p class="mt-3 text-xs font-medium text-stone-500">Reorder level</p>
          <p class="mt-1 text-lg font-bold text-stone-900">
            {{ product.reorderLevel }} units
          </p>
        </div>

        <div class="rounded-xl bg-stone-50 p-4">
          <CircleDollarSign :size="19" class="text-amber-700" />
          <p class="mt-3 text-xs font-medium text-stone-500">Stock value</p>
          <p class="mt-1 text-lg font-bold text-stone-900">
            {{ formatCurrency(inventoryValue) }}
          </p>
        </div>
      </section>

      <dl class="grid gap-x-6 gap-y-5 border-t border-stone-200 pt-6 sm:grid-cols-2">
        <div>
          <dt class="text-xs font-semibold uppercase tracking-wider text-stone-400">
            Category
          </dt>
          <dd class="mt-1 text-sm font-semibold text-stone-800">
            {{ product.category }}
          </dd>
        </div>

        <div>
          <dt class="text-xs font-semibold uppercase tracking-wider text-stone-400">
            Supplier
          </dt>
          <dd class="mt-1 text-sm font-semibold text-stone-800">
            {{ product.supplier }}
          </dd>
        </div>

        <div>
          <dt class="text-xs font-semibold uppercase tracking-wider text-stone-400">
            Unit price
          </dt>
          <dd class="mt-1 text-sm font-semibold text-stone-800">
            {{ formatCurrency(product.price) }}
          </dd>
        </div>

        <div>
          <dt class="text-xs font-semibold uppercase tracking-wider text-stone-400">
            Product ID
          </dt>
          <dd class="mt-1 text-sm font-semibold text-stone-800">
            #{{ product.id }}
          </dd>
        </div>
      </dl>
    </div>

    <template #footer>
      <div class="flex justify-end gap-3">
        <button
          type="button"
          class="rounded-xl border border-stone-300 px-4 py-2.5 text-sm font-semibold text-stone-600 hover:bg-stone-100"
          @click="$emit('close')"
        >
          Close
        </button>

        <button
          v-if="product"
          type="button"
          class="rounded-xl bg-stone-950 px-4 py-2.5 text-sm font-semibold text-white hover:bg-stone-800"
          @click="$emit('edit', product)"
        >
          Edit product
        </button>
      </div>
    </template>
  </AppModal>
</template>