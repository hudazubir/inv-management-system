<script setup>
import { computed, reactive, watch } from 'vue'

import AppModal from '@/components/common/AppModal.vue'

const props = defineProps({
  open: {
    type: Boolean,
    default: false,
  },
  type: {
    type: String,
    required: true,
  },
  products: {
    type: Array,
    required: true,
  },
})

const emit = defineEmits(['close', 'save'])

const form = reactive({
  productId: '',
  quantity: 1,
  note: '',
})

const errors = reactive({})

const isStockIn = computed(() => props.type === 'stock-in')

const modalTitle = computed(() => {
  return isStockIn.value ? 'Record stock in' : 'Record stock out'
})

const selectedProduct = computed(() => {
  return props.products.find(
    (product) => product.id === Number(form.productId),
  )
})

function resetForm() {
  form.productId = ''
  form.quantity = 1
  form.note = ''

  Object.keys(errors).forEach((key) => delete errors[key])
}

watch(
  [() => props.open, () => props.type],
  ([isOpen]) => {
    if (isOpen) resetForm()
  },
)

function validateForm() {
  Object.keys(errors).forEach((key) => delete errors[key])

  if (!form.productId) {
    errors.productId = 'Select a product.'
  }

  if (!Number.isInteger(Number(form.quantity)) || Number(form.quantity) <= 0) {
    errors.quantity = 'Quantity must be a positive whole number.'
  }

  if (
    !isStockIn.value &&
    selectedProduct.value &&
    Number(form.quantity) > selectedProduct.value.stock
  ) {
    errors.quantity = `Only ${selectedProduct.value.stock} units are available.`
  }

  if (form.note.length > 200) {
    errors.note = 'Note cannot exceed 200 characters.'
  }

  return Object.keys(errors).length === 0
}

function submitForm() {
  if (!validateForm()) return

  emit('save', {
    productId: Number(form.productId),
    type: props.type,
    quantity: Number(form.quantity),
    note: form.note.trim(),
  })
}
</script>

<template>
  <AppModal
    :open="open"
    :title="modalTitle"
    :description="
      isStockIn
        ? 'Add received units to the selected product.'
        : 'Remove issued units from the selected product.'
    "
    size="sm"
    @close="$emit('close')"
  >
    <form
      id="transaction-form"
      class="space-y-5"
      @submit.prevent="submitForm"
    >
      <label class="block">
        <span class="text-sm font-semibold text-stone-700">Product</span>

        <select
          v-model="form.productId"
          class="mt-2 w-full rounded-xl border border-stone-300 bg-white px-4 py-3 text-sm outline-none focus:border-amber-500 focus:ring-4 focus:ring-amber-100"
        >
          <option value="" disabled>Select a product</option>

          <option
            v-for="product in products"
            :key="product.id"
            :value="product.id"
          >
            {{ product.name }} — {{ product.sku }}
          </option>
        </select>

        <span
          v-if="errors.productId"
          class="mt-1 block text-xs text-red-600"
        >
          {{ errors.productId }}
        </span>
      </label>

      <div
        v-if="selectedProduct"
        class="flex items-center justify-between rounded-xl bg-stone-100 px-4 py-3"
      >
        <span class="text-sm text-stone-500">Current stock</span>

        <strong class="text-sm text-stone-900">
          {{ selectedProduct.stock }} units
        </strong>
      </div>

      <label class="block">
        <span class="text-sm font-semibold text-stone-700">Quantity</span>

        <input
          v-model.number="form.quantity"
          type="number"
          min="1"
          step="1"
          class="mt-2 w-full rounded-xl border border-stone-300 px-4 py-3 text-sm outline-none focus:border-amber-500 focus:ring-4 focus:ring-amber-100"
        />

        <span
          v-if="errors.quantity"
          class="mt-1 block text-xs text-red-600"
        >
          {{ errors.quantity }}
        </span>
      </label>

      <label class="block">
        <div class="flex items-center justify-between">
          <span class="text-sm font-semibold text-stone-700">
            Note
          </span>

          <span class="text-xs text-stone-400">
            {{ form.note.length }}/200
          </span>
        </div>

        <textarea
          v-model="form.note"
          rows="3"
          maxlength="200"
          placeholder="Reason or supporting information"
          class="mt-2 w-full resize-none rounded-xl border border-stone-300 px-4 py-3 text-sm outline-none focus:border-amber-500 focus:ring-4 focus:ring-amber-100"
        ></textarea>

        <span v-if="errors.note" class="mt-1 block text-xs text-red-600">
          {{ errors.note }}
        </span>
      </label>
    </form>

    <template #footer>
      <div class="flex justify-end gap-3">
        <button
          type="button"
          class="rounded-xl border border-stone-300 px-4 py-2.5 text-sm font-semibold text-stone-600 hover:bg-stone-100"
          @click="$emit('close')"
        >
          Cancel
        </button>

        <button
          type="submit"
          form="transaction-form"
          class="rounded-xl px-4 py-2.5 text-sm font-semibold text-white transition"
          :class="
            isStockIn
              ? 'bg-emerald-600 hover:bg-emerald-700'
              : 'bg-orange-600 hover:bg-orange-700'
          "
        >
          {{ isStockIn ? 'Confirm stock in' : 'Confirm stock out' }}
        </button>
      </div>
    </template>
  </AppModal>
</template>