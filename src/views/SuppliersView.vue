<script setup>
import { computed, onMounted, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { Plus } from 'lucide-vue-next'

import DeleteSupplierModal from '@/components/suppliers/DeleteSupplierModal.vue'
import SupplierFormModal from '@/components/suppliers/SupplierFormModal.vue'
import SupplierTable from '@/components/suppliers/SupplierTable.vue'
// import { initialSuppliers } from '@/data/suppliers'
import { useInventoryStore } from '@/stores/useInventoryStore'

const inventoryStore = useInventoryStore()
const { products, suppliers } = storeToRefs(inventoryStore)

// const suppliers = ref([...initialSuppliers])
const isSupplierFormOpen = ref(false)
const selectedSupplier = ref(null)
const supplierToDelete = ref(null)

const suppliersWithProductCounts = computed(() => {
  return suppliers.value.map((supplier) => {
    const productCount = products.value.filter(
      (product) => product.supplier === supplier.companyName,
    ).length

    return {
      ...supplier,
      productCount,
    }
  })
})

onMounted(async () => {
  try {
    await inventoryStore.loadSuppliers()
  } catch (error) {
    window.alert(error.message)
  }
})


// Form modal
function openCreateForm() {
  selectedSupplier.value = null
  isSupplierFormOpen.value = true
}

function openEditForm(supplier) {
  selectedSupplier.value = supplier
  isSupplierFormOpen.value = true
}

function closeSupplierForm() {
  isSupplierFormOpen.value = false
  selectedSupplier.value = null
}

async function saveSupplier(supplierData) {
  try {
    if (supplierData.id) {
      await inventoryStore.editSupplier(supplierData)
    } else {
      await inventoryStore.addSupplier(supplierData)
    }

    closeSupplierForm()
  } catch (error) {
    window.alert(error.message)
  }
}

async function confirmSupplierDelete() {
  if (!supplierToDelete.value) return
  if (supplierToDelete.value.productCount > 0) return

  try {
    await inventoryStore.removeSupplier(supplierToDelete.value.id)
    closeDeleteModal()
  } catch (error) {
    window.alert(error.message)
  }
}

// Delete modal
// function requestSupplierDelete(supplier) {
//   supplierToDelete.value = supplier
// }

// function closeDeleteModal() {
//   supplierToDelete.value = null
// }

// function confirmSupplierDelete() {
//   if (!supplierToDelete.value) return
//   if (supplierToDelete.value.productCount > 0) return

//   suppliers.value = suppliers.value.filter(
//     (supplier) => supplier.id !== supplierToDelete.value.id,
//   )

//   closeDeleteModal()
// }
</script>

<template>
  <div class="space-y-6">
    <section
      class="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
    >
      <div>
        <h2 class="text-2xl font-bold tracking-tight text-stone-900">
          Suppliers
        </h2>

        <p class="mt-1 text-sm text-stone-500">
          Manage supplier contacts and product relationships.
        </p>
      </div>

      <button
        type="button"
        class="inline-flex w-fit items-center gap-2 rounded-xl bg-stone-950 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-stone-800"
        @click="openCreateForm"
      >
        <Plus :size="18" />
        Add supplier
      </button>
    </section>

    <SupplierTable
      :suppliers="suppliersWithProductCounts"
      @edit="openEditForm"
      @delete="requestSupplierDelete"
    />

    <SupplierFormModal
      :open="isSupplierFormOpen"
      :supplier="selectedSupplier"
      @close="closeSupplierForm"
      @save="saveSupplier"
    />

    <DeleteSupplierModal
      :open="Boolean(supplierToDelete)"
      :supplier="supplierToDelete"
      @close="closeDeleteModal"
      @confirm="confirmSupplierDelete"
    />
  </div>
</template>