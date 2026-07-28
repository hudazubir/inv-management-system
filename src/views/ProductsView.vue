<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { Plus } from 'lucide-vue-next'

import ProductFilters from '@/components/products/ProductFilters.vue'
import ProductPagination from '@/components/products/ProductPagination.vue'
import ProductTable from '@/components/products/ProductTable.vue'
import ProductFormModal from '@/components/products/ProductFormModal.vue'
import ProductDetailsModal from '@/components/products/ProductDetailsModal.vue'
import DeleteProductModal from '@/components/products/DeleteProductModal.vue'
import { storeToRefs } from 'pinia'
import { useInventoryStore } from '@/stores/useInventoryStore'

const inventoryStore = useInventoryStore()
const {
  products,
  categories: categoryRecords,
  suppliers: supplierRecords,
} = storeToRefs(inventoryStore)

const searchQuery = ref('')
const selectedCategory = ref('')
const selectedStatus = ref('')
const viewedProduct = ref(null)
const productToDelete = ref(null)

const currentPage = ref(1)
const pageSize = 5

const isProductFormOpen = ref(false)
const selectedProduct = ref(null)

const categories = computed(() => {
  return categoryRecords.value
    .map((category) => category.name)
    .sort()
})

const suppliers = computed(() => {
  return supplierRecords.value
    .filter((supplier) => supplier.status === 'active')
    .map((supplier) => supplier.companyName)
    .sort()
})

const filteredProducts = computed(() => {
  const query = searchQuery.value.trim().toLowerCase()

  return products.value.filter((product) => {
    const matchesSearch =
      !query ||
      product.name.toLowerCase().includes(query) ||
      product.sku.toLowerCase().includes(query) ||
      product.supplier.toLowerCase().includes(query)

    const matchesCategory =
      !selectedCategory.value ||
      product.category === selectedCategory.value

    const matchesStatus =
      !selectedStatus.value ||
      (selectedStatus.value === 'in-stock' &&
        product.stock > product.reorderLevel) ||
      (selectedStatus.value === 'low-stock' &&
        product.stock > 0 &&
        product.stock <= product.reorderLevel) ||
      (selectedStatus.value === 'out-of-stock' && product.stock === 0)

    return matchesSearch && matchesCategory && matchesStatus
  })
})

const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  const end = start + pageSize

  return filteredProducts.value.slice(start, end)
})

watch(
  [searchQuery, selectedCategory, selectedStatus],
  () => {
    currentPage.value = 1
  },
)

onMounted(async () => {
  try {
    await Promise.all([
      inventoryStore.loadCategories(),
      inventoryStore.loadSuppliers(),
      inventoryStore.loadProducts(),
    ])
  } catch (error) {
    window.alert(error.message)
  }
})

function openCreateForm() {
  selectedProduct.value = null
  isProductFormOpen.value = true
}

function openEditForm(product) {
  selectedProduct.value = product
  isProductFormOpen.value = true
}

function closeProductForm() {
  isProductFormOpen.value = false
  selectedProduct.value = null
}

async function saveProduct(productData) {
  try {
    if (productData.id) {
      await inventoryStore.editProduct(productData)
    } else {
      await inventoryStore.addProduct(productData)

      clearFilters()
      currentPage.value = 1
    }

    closeProductForm()
  } catch (error) {
    window.alert(error.message)
  }
}

function openProductDetails(product) {
  viewedProduct.value = product
}

function closeProductDetails() {
  viewedProduct.value = null
}

function editFromDetails(product) {
  closeProductDetails()
  openEditForm(product)
}

// delete product 
function requestProductDelete(product) {
  productToDelete.value = product
}

function closeDeleteModal() {
  productToDelete.value = null
}

async function confirmProductDelete() {
  if (!productToDelete.value) return

  try {
    await inventoryStore.removeProduct(productToDelete.value.id)

    closeDeleteModal()

    const remainingPages = Math.max(
      1,
      Math.ceil(filteredProducts.value.length / pageSize),
    )

    currentPage.value = Math.min(
      currentPage.value,
      remainingPages,
    )
  } catch (error) {
    window.alert(error.message)
  }
}

function clearFilters() {
  searchQuery.value = ''
  selectedCategory.value = ''
  selectedStatus.value = ''
}
</script>

<template>
  <div class="space-y-6">
    <section
      class="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
    >
      <div>
        <h2 class="text-2xl font-bold tracking-tight text-stone-900">
          Products
        </h2>

        <p class="mt-1 text-sm text-stone-500">
          Manage product information, pricing, and stock levels.
        </p>
      </div>

      <button
        type="button"
        class="inline-flex w-fit items-center gap-2 rounded-xl bg-stone-950 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-stone-800"
        @click="openCreateForm"
      >
        <Plus :size="18" />
        Add product
      </button>
    </section>

    <ProductFilters
      v-model:search="searchQuery"
      v-model:category="selectedCategory"
      v-model:status="selectedStatus"
      :categories="categories"
      @clear="clearFilters"
    />

    <ProductTable
      :products="paginatedProducts"
      @view="openProductDetails"
      @edit="openEditForm"
      @delete="requestProductDelete"
    />

    <ProductPagination
      v-model:current-page="currentPage"
      :total-items="filteredProducts.length"
      :page-size="pageSize"
    />

    <ProductFormModal
      :open="isProductFormOpen"
      :product="selectedProduct"
      :categories="categories"
      :suppliers="suppliers"
      @close="closeProductForm"
      @save="saveProduct"
    />

    <ProductDetailsModal
      :open="Boolean(viewedProduct)"
      :product="viewedProduct"
      @close="closeProductDetails"
      @edit="editFromDetails"
    />

    <DeleteProductModal
      :open="Boolean(productToDelete)"
      :product="productToDelete"
      @close="closeDeleteModal"
      @confirm="confirmProductDelete"
    />
  </div>
</template>