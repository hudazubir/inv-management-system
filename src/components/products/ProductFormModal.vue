<script setup>
import { computed, reactive, watch } from 'vue'
import { ChevronLeft, ChevronRight } from 'lucide-vue-next'
import AppModal from '@/components/common/AppModal.vue'

const props = defineProps({
  open: {
    type: Boolean,
    default: false,
  },
  product: {
    type: Object,
    default: null,
  },
  categories: {
    type: Array,
    default: () => [],
  },
  suppliers: {
    type: Array,
    default: () => [],
  },
})

const emit = defineEmits(['close', 'save'])

const emptyForm = {
  name: '',
  sku: '',
  category: '',
  supplier: '',
  price: 0,
  stock: 0,
  reorderLevel: 0,
}

const form = reactive({ ...emptyForm })
const errors = reactive({})

const isEditing = computed(() => Boolean(props.product))

const modalTitle = computed(() => {
  return isEditing.value ? 'Edit product' : 'Add product'
})

function resetForm() {
  Object.assign(form, emptyForm)
  Object.keys(errors).forEach((key) => delete errors[key])
}

watch(
  [() => props.open, () => props.product],
  ([isOpen]) => {
    if (!isOpen) return

    resetForm()

    if (props.product) {
      Object.assign(form, {
        name: props.product.name,
        sku: props.product.sku,
        category: props.product.category,
        supplier: props.product.supplier,
        price: props.product.price,
        stock: props.product.stock,
        reorderLevel: props.product.reorderLevel,
      })
    }
  },
)

function validateForm() {
  Object.keys(errors).forEach((key) => delete errors[key])

  if (!form.name.trim()) errors.name = 'Product name is required.'
  if (!form.sku.trim()) errors.sku = 'SKU is required.'
  if (!form.category) errors.category = 'Category is required.'
  if (!form.supplier) errors.supplier = 'Supplier is required.'
  if (form.price < 0) errors.price = 'Price cannot be negative.'
  if (form.stock < 0) errors.stock = 'Stock cannot be negative.'
  if (form.reorderLevel < 0) {
    errors.reorderLevel = 'Reorder level cannot be negative.'
  }

  return Object.keys(errors).length === 0
}

function submitForm() {
  if (!validateForm()) return

  emit('save', {
    id: props.product?.id,
    name: form.name.trim(),
    sku: form.sku.trim().toUpperCase(),
    category: form.category,
    supplier: form.supplier,
    price: Number(form.price),
    stock: Number(form.stock),
    reorderLevel: Number(form.reorderLevel),
  })
}
</script>

<template>
  <AppModal
    :open="open"
    :title="modalTitle"
    description="Enter the product information below."
    @close="$emit('close')"
  >
    <form id="product-form" class="grid gap-5 sm:grid-cols-2" @submit.prevent="submitForm">
      <label class="sm:col-span-2">
        <span class="text-sm font-semibold text-stone-700">Product name</span>

        <input
          v-model="form.name"
          type="text"
          placeholder="Example: Wireless Mouse"
          class="mt-2 w-full rounded-xl border border-stone-300 px-4 py-3 text-sm outline-none focus:border-amber-500 focus:ring-4 focus:ring-amber-100"
        />

        <span v-if="errors.name" class="mt-1 block text-xs text-red-600">
          {{ errors.name }}
        </span>
      </label>

      <label>
        <span class="text-sm font-semibold text-stone-700">SKU</span>

        <input
          v-model="form.sku"
          type="text"
          placeholder="Example: WM-1042"
          class="mt-2 w-full rounded-xl border border-stone-300 px-4 py-3 text-sm uppercase outline-none focus:border-amber-500 focus:ring-4 focus:ring-amber-100"
        />

        <span v-if="errors.sku" class="mt-1 block text-xs text-red-600">
          {{ errors.sku }}
        </span>
      </label>

      <label>
        <span class="text-sm font-semibold text-stone-700">Category</span>

        <div class="relative mt-2">
          <select
            v-model="form.category"
            class="w-full appearance-none rounded-xl border border-stone-300 bg-white px-4 py-3 pr-10 text-sm outline-none focus:border-amber-500 focus:ring-4 focus:ring-amber-100"
          >
            <option value="" disabled>Select a category</option>
            <option v-for="item in categories" :key="item" :value="item">
              {{ item }}
            </option>
          </select>

          <ChevronDown class="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
        </div>

        <span v-if="errors.category" class="mt-1 block text-xs text-red-600">
          {{ errors.category }}
        </span>
      </label>

      <label class="sm:col-span-2">
        <span class="text-sm font-semibold text-stone-700">Supplier</span>

        <select
          v-model="form.supplier"
          class="mt-2 w-full rounded-xl border border-stone-300 bg-white px-4 py-3 text-sm outline-none focus:border-amber-500 focus:ring-4 focus:ring-amber-100"
        >
          <option value="" disabled>Select a supplier</option>
          <option v-for="item in suppliers" :key="item" :value="item">
            {{ item }}
          </option>
        </select>

        <span v-if="errors.supplier" class="mt-1 block text-xs text-red-600">
          {{ errors.supplier }}
        </span>
      </label>

      <label>
        <span class="text-sm font-semibold text-stone-700">Unit price (RM)</span>

        <input
          v-model.number="form.price"
          type="number"
          min="0"
          step="0.01"
          class="mt-2 w-full rounded-xl border border-stone-300 px-4 py-3 text-sm outline-none focus:border-amber-500 focus:ring-4 focus:ring-amber-100"
        />

        <span v-if="errors.price" class="mt-1 block text-xs text-red-600">
          {{ errors.price }}
        </span>
      </label>

      <label>
        <span class="text-sm font-semibold text-stone-700">Current stock</span>

        <input
          v-model.number="form.stock"
          type="number"
          min="0"
          class="mt-2 w-full rounded-xl border border-stone-300 px-4 py-3 text-sm outline-none focus:border-amber-500 focus:ring-4 focus:ring-amber-100"
        />

        <span v-if="errors.stock" class="mt-1 block text-xs text-red-600">
          {{ errors.stock }}
        </span>
      </label>

      <label>
        <span class="text-sm font-semibold text-stone-700">Reorder level</span>

        <input
          v-model.number="form.reorderLevel"
          type="number"
          min="0"
          class="mt-2 w-full rounded-xl border border-stone-300 px-4 py-3 text-sm outline-none focus:border-amber-500 focus:ring-4 focus:ring-amber-100"
        />

        <span
          v-if="errors.reorderLevel"
          class="mt-1 block text-xs text-red-600"
        >
          {{ errors.reorderLevel }}
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
          form="product-form"
          class="rounded-xl bg-stone-950 px-4 py-2.5 text-sm font-semibold text-white hover:bg-stone-800"
        >
          {{ isEditing ? 'Save changes' : 'Create product' }}
        </button>
      </div>
    </template>
  </AppModal>
</template>