<script setup>
import { computed, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { ArrowDownToLine, ArrowUpFromLine } from 'lucide-vue-next'

import TransactionTable from '@/components/transactions/TransactionTable.vue'
import TransactionFormModal from '@/components/transactions/TransactionFormModal.vue'
import TransactionFilters from '@/components/transactions/TransactionFilters.vue'
import { useInventoryStore } from '@/stores/useInventoryStore'


const inventoryStore = useInventoryStore()
const isTransactionFormOpen = ref(false)
const transactionType = ref('stock-in')
const searchQuery = ref('')
const selectedType = ref('')
const selectedProductId = ref('')

const { products, transactions } = storeToRefs(inventoryStore)

function openTransactionForm(type) {
  transactionType.value = type
  isTransactionFormOpen.value = true
}

function closeTransactionForm() {
  isTransactionFormOpen.value = false
}

function saveTransaction(transactionData) {
  try {
    inventoryStore.recordTransaction(transactionData)
    closeTransactionForm()
  } catch (error) {
    window.alert(error.message)
  }
}

const filteredTransactions = computed(() => {
  const query = searchQuery.value.trim().toLowerCase()

  return transactions.value.filter((transaction) => {
    const product = products.value.find(
      (item) => item.id === transaction.productId,
    )

    const matchesSearch =
      !query ||
      transaction.reference.toLowerCase().includes(query) ||
      transaction.note.toLowerCase().includes(query) ||
      transaction.performedBy.toLowerCase().includes(query) ||
      product?.name.toLowerCase().includes(query) ||
      product?.sku.toLowerCase().includes(query)

    const matchesType =
      !selectedType.value || transaction.type === selectedType.value

    const matchesProduct =
      !selectedProductId.value ||
      transaction.productId === Number(selectedProductId.value)

    return matchesSearch && matchesType && matchesProduct
  })
})

function clearFilters() {
  searchQuery.value = ''
  selectedType.value = ''
  selectedProductId.value = ''
}

</script>

<template>
  <div class="space-y-6">
    <section
      class="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between"
    >
      <div>
        <h2 class="text-2xl font-bold tracking-tight text-stone-900">
          Stock Movement
        </h2>

        <p class="mt-1 text-sm text-stone-500">
          Record stock changes and review transaction history.
        </p>
      </div>

      <div class="flex flex-col gap-2 sm:flex-row">
        <button
          type="button"
          class="inline-flex items-center justify-center gap-2 rounded-xl border border-stone-300 bg-white px-4 py-2.5 text-sm font-semibold text-stone-700 transition hover:bg-stone-50"
          @click="openTransactionForm('stock-out')"
        >
          <ArrowUpFromLine :size="18" />
          Stock out
        </button>

        <button
          type="button"
          class="inline-flex items-center justify-center gap-2 rounded-xl bg-stone-950 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-stone-800"
          @click="openTransactionForm('stock-in')"
        >
          <ArrowDownToLine :size="18" />
          Stock in
        </button>
      </div>
    </section>

    <TransactionFilters
      v-model:search="searchQuery"
      v-model:type="selectedType"
      v-model:product-id="selectedProductId"
      :products="products"
      @clear="clearFilters"
    />

    <TransactionTable
      :transactions="filteredTransactions"
      :products="products"
    />

    <TransactionFormModal
      :open="isTransactionFormOpen"
      :type="transactionType"
      :products="products"
      @close="closeTransactionForm"
      @save="saveTransaction"
    />
  </div>
</template>