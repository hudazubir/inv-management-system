<script setup>
import {
  Mail,
  MapPin,
  Pencil,
  Phone,
  Trash2,
} from 'lucide-vue-next'

defineProps({
  suppliers: {
    type: Array,
    required: true,
  },
})

defineEmits(['edit', 'delete'])
</script>

<template>
  <div
    class="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm"
  >
    <div class="overflow-x-auto">
      <table class="w-full min-w-[1000px] border-collapse text-left [&_td]:border [&_td]:border-stone-200 [&_th]:border [&_th]:border-stone-200">
        <thead class="bg-stone-50 text-xs uppercase tracking-wider text-stone-500">
          <tr>
            <th class="px-5 py-3.5 font-semibold">Supplier</th>
            <th class="px-5 py-3.5 font-semibold">Contact</th>
            <th class="px-5 py-3.5 font-semibold">Location</th>
            <th class="px-5 py-3.5 font-semibold">Products</th>
            <th class="px-5 py-3.5 font-semibold">Status</th>
            <th class="px-5 py-3.5 text-right font-semibold">Actions</th>
          </tr>
        </thead>

        <tbody> 
            <!-- class="divide-y divide-stone-100" -->
          <tr
            v-for="supplier in suppliers"
            :key="supplier.id"
            class="transition hover:bg-stone-50"
          >
            <td class="px-5 py-4">
              <div class="flex items-center gap-3">
                <div
                  class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-100 font-bold text-amber-700"
                >
                  {{ supplier.companyName.charAt(0) }}
                </div>

                <div>
                  <p class="text-sm font-semibold text-stone-800">
                    {{ supplier.companyName }}
                  </p>

                  <p class="mt-0.5 text-xs text-stone-400">
                    {{ supplier.contactName }}
                  </p>
                </div>
              </div>
            </td>

            <td class="px-5 py-4">
              <div class="space-y-1.5">
                <a
                  :href="`mailto:${supplier.email}`"
                  class="flex items-center gap-2 text-sm text-stone-600 hover:text-amber-700"
                >
                  <Mail :size="15" class="text-stone-400" />
                  {{ supplier.email }}
                </a>

                <a
                  :href="`tel:${supplier.phone}`"
                  class="flex items-center gap-2 text-sm text-stone-600 hover:text-amber-700"
                >
                  <Phone :size="15" class="text-stone-400" />
                  {{ supplier.phone }}
                </a>
              </div>
            </td>

            <td class="px-5 py-4">
              <div class="flex items-center gap-2 text-sm text-stone-500">
                <MapPin :size="16" class="shrink-0 text-stone-400" />
                {{ supplier.address }}
              </div>
            </td>

            <td class="px-5 py-4">
              <span class="text-sm font-bold text-stone-800">
                {{ supplier.productCount }}
              </span>
            </td>

            <td class="px-5 py-4">
              <span
                class="inline-flex rounded-full px-2.5 py-1 text-xs font-semibold capitalize"
                :class="
                  supplier.status === 'active'
                    ? 'bg-emerald-100 text-emerald-700'
                    : 'bg-stone-100 text-stone-600'
                "
              >
                {{ supplier.status }}
              </span>
            </td>

            <td class="px-5 py-4">
              <div class="flex justify-end gap-1">
                <button
                  type="button"
                  class="rounded-lg p-2 text-stone-400 transition hover:bg-amber-50 hover:text-amber-700"
                  :aria-label="`Edit ${supplier.companyName}`"
                  @click="$emit('edit', supplier)"
                >
                  <Pencil :size="17" />
                </button>

                <button
                  type="button"
                  class="rounded-lg p-2 text-stone-400 transition hover:bg-red-50 hover:text-red-700"
                  :aria-label="`Delete ${supplier.companyName}`"
                  @click="$emit('delete', supplier)"
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