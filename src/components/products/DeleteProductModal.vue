<script setup>
import { TriangleAlert } from 'lucide-vue-next'
import AppModal from '@/components/common/AppModal.vue'

defineProps({
  open: {
    type: Boolean,
    default: false,
  },
  product: {
    type: Object,
    default: null,
  },
})

defineEmits(['close', 'confirm'])
</script>

<template>
  <AppModal
    :open="open"
    title="Delete product"
    description="This action cannot be undone."
    size="sm"
    @close="$emit('close')"
  >
    <div v-if="product" class="flex gap-4">
      <div
        class="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-red-100 text-red-700"
      >
        <TriangleAlert :size="22" />
      </div>

      <div>
        <p class="text-sm leading-6 text-stone-600">
          Are you sure you want to delete
          <strong class="font-semibold text-stone-900">
            {{ product.name }}
          </strong>?
        </p>

        <p class="mt-2 text-sm text-stone-500">
          SKU: {{ product.sku }}
        </p>
      </div>
    </div>

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
          type="button"
          class="rounded-xl bg-red-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-red-700"
          @click="$emit('confirm')"
        >
          Delete product
        </button>
      </div>
    </template>
  </AppModal>
</template>