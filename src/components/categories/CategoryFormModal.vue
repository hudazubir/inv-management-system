<script setup>
import { computed, reactive, watch } from 'vue'
import AppModal from '@/components/common/AppModal.vue'

const props = defineProps({
  open: {
    type: Boolean,
    default: false,
  },
  category: {
    type: Object,
    default: null,
  },
})

const emit = defineEmits(['close', 'save'])

const form = reactive({
  name: '',
  description: '',
})

const errors = reactive({})

const isEditing = computed(() => Boolean(props.category))

const modalTitle = computed(() => {
  return isEditing.value ? 'Edit category' : 'Add category'
})

function resetForm() {
  form.name = ''
  form.description = ''

  Object.keys(errors).forEach((key) => delete errors[key])
}

watch(
  [() => props.open, () => props.category],
  ([isOpen]) => {
    if (!isOpen) return

    resetForm()

    if (props.category) {
      form.name = props.category.name
      form.description = props.category.description
    }
  },
)

function validateForm() {
  Object.keys(errors).forEach((key) => delete errors[key])

  if (!form.name.trim()) {
    errors.name = 'Category name is required.'
  }

  if (form.description.length > 180) {
    errors.description = 'Description cannot exceed 180 characters.'
  }

  return Object.keys(errors).length === 0
}

function submitForm() {
  if (!validateForm()) return

  emit('save', {
    id: props.category?.id,
    name: form.name.trim(),
    description: form.description.trim(),
  })
}
</script>

<template>
  <AppModal
    :open="open"
    :title="modalTitle"
    description="Use a clear name that describes the product group."
    size="sm"
    @close="$emit('close')"
  >
    <form
      id="category-form"
      class="space-y-5"
      @submit.prevent="submitForm"
    >
      <label class="block">
        <span class="text-sm font-semibold text-stone-700">
          Category name
        </span>

        <input
          v-model="form.name"
          type="text"
          placeholder="Example: Electronics"
          class="mt-2 w-full rounded-xl border border-stone-300 px-4 py-3 text-sm outline-none focus:border-amber-500 focus:ring-4 focus:ring-amber-100"
        />

        <span v-if="errors.name" class="mt-1 block text-xs text-red-600">
          {{ errors.name }}
        </span>
      </label>

      <label class="block">
        <div class="flex items-center justify-between gap-4">
          <span class="text-sm font-semibold text-stone-700">
            Description
          </span>

          <span class="text-xs text-stone-400">
            {{ form.description.length }}/180
          </span>
        </div>

        <textarea
          v-model="form.description"
          rows="4"
          maxlength="180"
          placeholder="Describe the types of products in this category."
          class="mt-2 w-full resize-none rounded-xl border border-stone-300 px-4 py-3 text-sm outline-none focus:border-amber-500 focus:ring-4 focus:ring-amber-100"
        ></textarea>

        <span
          v-if="errors.description"
          class="mt-1 block text-xs text-red-600"
        >
          {{ errors.description }}
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
          form="category-form"
          class="rounded-xl bg-stone-950 px-4 py-2.5 text-sm font-semibold text-white hover:bg-stone-800"
        >
          {{ isEditing ? 'Save changes' : 'Create category' }}
        </button>
      </div>
    </template>
  </AppModal>
</template>