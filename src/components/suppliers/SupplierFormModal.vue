<script setup>
import { computed, reactive, watch } from 'vue'
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

const emit = defineEmits(['close', 'save'])

const emptyForm = {
  companyName: '',
  contactName: '',
  email: '',
  phone: '',
  address: '',
  status: 'active',
}

const form = reactive({ ...emptyForm })
const errors = reactive({})

const isEditing = computed(() => Boolean(props.supplier))

const modalTitle = computed(() => {
  return isEditing.value ? 'Edit supplier' : 'Add supplier'
})

function resetForm() {
  Object.assign(form, emptyForm)
  Object.keys(errors).forEach((key) => delete errors[key])
}

watch(
  [() => props.open, () => props.supplier],
  ([isOpen]) => {
    if (!isOpen) return

    resetForm()

    if (props.supplier) {
      Object.assign(form, {
        companyName: props.supplier.companyName,
        contactName: props.supplier.contactName,
        email: props.supplier.email,
        phone: props.supplier.phone,
        address: props.supplier.address,
        status: props.supplier.status,
      })
    }
  },
)

function validateForm() {
  Object.keys(errors).forEach((key) => delete errors[key])

  if (!form.companyName.trim()) {
    errors.companyName = 'Company name is required.'
  }

  if (!form.contactName.trim()) {
    errors.contactName = 'Contact name is required.'
  }

  if (!form.email.trim()) {
    errors.email = 'Email address is required.'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = 'Enter a valid email address.'
  }

  if (!form.phone.trim()) {
    errors.phone = 'Phone number is required.'
  }

  if (!form.address.trim()) {
    errors.address = 'Address is required.'
  }

  return Object.keys(errors).length === 0
}

function submitForm() {
  if (!validateForm()) return

  emit('save', {
    id: props.supplier?.id,
    companyName: form.companyName.trim(),
    contactName: form.contactName.trim(),
    email: form.email.trim().toLowerCase(),
    phone: form.phone.trim(),
    address: form.address.trim(),
    status: form.status,
  })
}
</script>

<template>
  <AppModal
    :open="open"
    :title="modalTitle"
    description="Enter the supplier company and contact information."
    @close="$emit('close')"
  >
    <form
      id="supplier-form"
      class="grid gap-5 sm:grid-cols-2"
      @submit.prevent="submitForm"
    >
      <label class="sm:col-span-2">
        <span class="text-sm font-semibold text-stone-700">Company name</span>

        <input
          v-model="form.companyName"
          type="text"
          placeholder="Example: TechSource Distribution"
          class="mt-2 w-full rounded-xl border border-stone-300 px-4 py-3 text-sm outline-none focus:border-amber-500 focus:ring-4 focus:ring-amber-100"
        />

        <span
          v-if="errors.companyName"
          class="mt-1 block text-xs text-red-600"
        >
          {{ errors.companyName }}
        </span>
      </label>

      <label>
        <span class="text-sm font-semibold text-stone-700">
          Contact person
        </span>

        <input
          v-model="form.contactName"
          type="text"
          placeholder="Full name"
          class="mt-2 w-full rounded-xl border border-stone-300 px-4 py-3 text-sm outline-none focus:border-amber-500 focus:ring-4 focus:ring-amber-100"
        />

        <span
          v-if="errors.contactName"
          class="mt-1 block text-xs text-red-600"
        >
          {{ errors.contactName }}
        </span>
      </label>

      <label>
        <span class="text-sm font-semibold text-stone-700">Status</span>

        <select
          v-model="form.status"
          class="mt-2 w-full rounded-xl border border-stone-300 bg-white px-4 py-3 text-sm outline-none focus:border-amber-500 focus:ring-4 focus:ring-amber-100"
        >
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </label>

      <label>
        <span class="text-sm font-semibold text-stone-700">Email</span>

        <input
          v-model="form.email"
          type="email"
          placeholder="contact@company.com"
          class="mt-2 w-full rounded-xl border border-stone-300 px-4 py-3 text-sm outline-none focus:border-amber-500 focus:ring-4 focus:ring-amber-100"
        />

        <span v-if="errors.email" class="mt-1 block text-xs text-red-600">
          {{ errors.email }}
        </span>
      </label>

      <label>
        <span class="text-sm font-semibold text-stone-700">Phone</span>

        <input
          v-model="form.phone"
          type="tel"
          placeholder="+60 12-345 6789"
          class="mt-2 w-full rounded-xl border border-stone-300 px-4 py-3 text-sm outline-none focus:border-amber-500 focus:ring-4 focus:ring-amber-100"
        />

        <span v-if="errors.phone" class="mt-1 block text-xs text-red-600">
          {{ errors.phone }}
        </span>
      </label>

      <label class="sm:col-span-2">
        <span class="text-sm font-semibold text-stone-700">Address</span>

        <textarea
          v-model="form.address"
          rows="3"
          placeholder="City, state, or full business address"
          class="mt-2 w-full resize-none rounded-xl border border-stone-300 px-4 py-3 text-sm outline-none focus:border-amber-500 focus:ring-4 focus:ring-amber-100"
        ></textarea>

        <span v-if="errors.address" class="mt-1 block text-xs text-red-600">
          {{ errors.address }}
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
          form="supplier-form"
          class="rounded-xl bg-stone-950 px-4 py-2.5 text-sm font-semibold text-white hover:bg-stone-800"
        >
          {{ isEditing ? 'Save changes' : 'Create supplier' }}
        </button>
      </div>
    </template>
  </AppModal>
</template>