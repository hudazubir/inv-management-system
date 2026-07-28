<script setup>
import { computed } from 'vue'

const props = defineProps({
  stock: {
    type: Number,
    required: true,
  },
  reorderLevel: {
    type: Number,
    required: true,
  },
})

const status = computed(() => {
  if (props.stock === 0) {
    return {
      label: 'Out of stock',
      classes: 'bg-red-100 text-red-700',
    }
  }

  if (props.stock <= props.reorderLevel) {
    return {
      label: 'Low stock',
      classes: 'bg-orange-100 text-orange-700',
    }
  }

  return {
    label: 'In stock',
    classes: 'bg-emerald-100 text-emerald-700',
  }
})
</script>

<template>
  <span
    class="inline-flex rounded-full px-2.5 py-1 text-xs font-semibold"
    :class="status.classes"
  >
    {{ status.label }}
  </span>
</template>