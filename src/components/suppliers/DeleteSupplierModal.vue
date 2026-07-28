<script setup>
import { computed } from 'vue'
import { CircleAlert, TriangleAlert } from 'lucide-vue-next'

import AppModal from '@/components/common/AppModal.vue'

const props = defineProps({
  open: {
    type: Boolean,
    default: false,
  },
  supplier: {
    type: Object,
    default: null,
  },
})

const emit = defineEmits(['close', 'confirm'])

const canDelete = computed(() => {
  return props.supplier?.productCount === 0
})

function confirmDelete() {
  if (canDelete.value) {
    emit('confirm')
  }
}
</script>

<template>
  <AppModal
    :open="open"
    title="Delete supplier"
    :description="
      canDelete
        ? 'This action cannot be undone.'
        : 'This supplier cannot be deleted yet.'
    "
    size="sm"
    @close="$emit('close')"
  >
    <div v-if="supplier" class="flex gap-4">
      <div
        class="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl"
        :class="
          canDelete
            ? 'bg-red-100 text-red-700'
            : 'bg-amber-100 text-amber-700'
        "
      >
        <TriangleAlert v-if="canDelete" :size="22" />
        <CircleAlert v-else :size="22" />
      </div>

      <div>
        <p v-if="canDelete" class="text-sm leading-6 text-stone-600">
          Are you sure you want to delete
          <strong class="font-semibold text-stone-900">
            {{ supplier.companyName }}
          </strong>?
        </p>

        <p v-else class="text-sm leading-6 text-stone-600">
          <strong class="font-semibold text-stone-900">
            {{ supplier.companyName }}
          </strong>
          supplies {{ supplier.productCount }} products. Reassign those products
          before deleting this supplier.
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
          {{ canDelete ? 'Cancel' : 'Close' }}
        </button>

        <button
          v-if="canDelete"
          type="button"
          class="rounded-xl bg-red-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-red-700"
          @click="confirmDelete"
        >
          Delete supplier
        </button>
      </div>
    </template>
  </AppModal>
</template>