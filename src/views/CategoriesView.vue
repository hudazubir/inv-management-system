<script setup>
import { computed, onMounted, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { Plus } from 'lucide-vue-next'

import CategoryCard from '@/components/categories/CategoryCard.vue'
import CategoryFormModal from '@/components/categories/CategoryFormModal.vue'
import DeleteCategoryModal from '@/components/categories/DeleteCategoryModal.vue'
import { useInventoryStore } from '@/stores/useInventoryStore'

const inventoryStore = useInventoryStore()
const { categories, products } = storeToRefs(inventoryStore)

const isCategoryFormOpen = ref(false)
const selectedCategory = ref(null)
const categoryToDelete = ref(null)

const categoriesWithProductCounts = computed(() => {
  return categories.value.map((category) => {
    const productCount = products.value.filter(
      (product) => product.category === category.name,
    ).length

    return {
      ...category,
      productCount,
    }
  })
})

onMounted(async () => {
  try {
    await inventoryStore.loadCategories()
  } catch (error) {
    window.alert(error.message)
  }
})

function openCreateForm() {
  selectedCategory.value = null
  isCategoryFormOpen.value = true
}

function openEditForm(category) {
  selectedCategory.value = category
  isCategoryFormOpen.value = true
}

function closeCategoryForm() {
  isCategoryFormOpen.value = false
  selectedCategory.value = null
}

async function saveCategory(categoryData) {
  try {
    if (categoryData.id) {
      await inventoryStore.editCategory(categoryData)
    } else {
      await inventoryStore.addCategory(categoryData)
    }

    closeCategoryForm()
  } catch (error) {
    window.alert(error.message)
  }
}

function requestCategoryDelete(category) {
  categoryToDelete.value = category
}

function closeDeleteModal() {
  categoryToDelete.value = null
}

async function confirmCategoryDelete() {
  if (!categoryToDelete.value) return
  if (categoryToDelete.value.productCount > 0) return

  try {
    await inventoryStore.removeCategory(categoryToDelete.value.id)
    closeDeleteModal()
  } catch (error) {
    window.alert(error.message)
  }
}
</script>

<template>
  <div class="space-y-6">
    <section
      class="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
    >
      <div>
        <h2 class="text-2xl font-bold tracking-tight text-stone-900">
          Categories
        </h2>

        <p class="mt-1 text-sm text-stone-500">
          Organize products into clear inventory groups.
        </p>
      </div>

      <button
        type="button"
        class="inline-flex w-fit items-center gap-2 rounded-xl bg-stone-950 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-stone-800"
        @click="openCreateForm"
      >
        <Plus :size="18" />
        Add category
      </button>
    </section>

    <section class="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      <CategoryCard
        v-for="category in categoriesWithProductCounts"
        :key="category.id"
        :category="category"
        @edit="openEditForm"
        @delete="requestCategoryDelete"
      />
    </section>

    <CategoryFormModal
      :open="isCategoryFormOpen"
      :category="selectedCategory"
      @close="closeCategoryForm"
      @save="saveCategory"
    />

    <DeleteCategoryModal
      :open="Boolean(categoryToDelete)"
      :category="categoryToDelete"
      @close="closeDeleteModal"
      @confirm="confirmCategoryDelete"
    />
  </div>
</template>