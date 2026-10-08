import { ref } from 'vue'
import { defineStore } from 'pinia'

import {
  createCategory as createCategoryRecord,
  deleteCategory as deleteCategoryRecord,
  fetchCategories,
  updateCategory as updateCategoryRecord,
} from '@/services/categoryService'

import {
  createSupplier as createSupplierRecord,
  deleteSupplier as deleteSupplierRecord,
  fetchSuppliers,
  updateSupplier as updateSupplierRecord,
} from '@/services/supplierService'


import {
  createProduct as createProductRecord,
  deleteProduct as deleteProductRecord,
  fetchProducts,
  updateProduct as updateProductRecord,
} from '@/services/productService'

import {
  createTransaction,
  fetchTransactions,
} from '@/services/transactionService'

export const useInventoryStore = defineStore('inventory', () => {
  const products = ref([])
  const categories = ref([])
  const suppliers = ref([])
  const transactions = ref([])

  //categories
  async function loadCategories() {
    categories.value = await fetchCategories()
  }
  
  async function addCategory(categoryData) {
    const category = await createCategoryRecord(categoryData)
  
    categories.value.push(category)
    categories.value.sort((a, b) => a.name.localeCompare(b.name))
  
    return category
  }
  
  async function editCategory(categoryData) {
    const updatedCategory = await updateCategoryRecord(categoryData)
  
    const categoryIndex = categories.value.findIndex(
      (category) => category.id === updatedCategory.id,
    )
  
    if (categoryIndex !== -1) {
      categories.value[categoryIndex] = updatedCategory
    }
  
    categories.value.sort((a, b) => a.name.localeCompare(b.name))
  
    return updatedCategory
  }
  
  async function removeCategory(categoryId) {
    await deleteCategoryRecord(categoryId)
  
    categories.value = categories.value.filter(
      (category) => category.id !== categoryId,
    )
  }


  //suppliers
  async function loadSuppliers() {
    suppliers.value = await fetchSuppliers()
  }
  
  async function addSupplier(supplierData) {
    const supplier = await createSupplierRecord(supplierData)
  
    suppliers.value.push(supplier)
    suppliers.value.sort((a, b) =>
      a.companyName.localeCompare(b.companyName),
    )
  
    return supplier
  }
  
  async function editSupplier(supplierData) {
    const updatedSupplier = await updateSupplierRecord(supplierData)
  
    const supplierIndex = suppliers.value.findIndex(
      (supplier) => supplier.id === updatedSupplier.id,
    )
  
    if (supplierIndex !== -1) {
      suppliers.value[supplierIndex] = updatedSupplier
    }
  
    suppliers.value.sort((a, b) =>
      a.companyName.localeCompare(b.companyName),
    )
  
    return updatedSupplier
  }
  
  async function removeSupplier(supplierId) {
    await deleteSupplierRecord(supplierId)
  
    suppliers.value = suppliers.value.filter(
      (supplier) => supplier.id !== supplierId,
    )
  }

  //product
  async function loadProducts() {
    products.value = await fetchProducts()
  }
  
  function resolveProductRelationships(productData) {
    const category = categories.value.find(
      (item) => item.name === productData.category,
    )
  
    const supplier = suppliers.value.find(
      (item) => item.companyName === productData.supplier,
    )
  
    if (!category) {
      throw new Error('The selected category could not be found.')
    }
  
    if (!supplier) {
      throw new Error('The selected supplier could not be found.')
    }
  
    return {
      categoryId: category.id,
      supplierId: supplier.id,
    }
  }
  
  async function addProduct(productData) {
    const relationships = resolveProductRelationships(productData)
  
    const product = await createProductRecord({
      ...productData,
      ...relationships,
    })
  
    products.value.push(product)
    products.value.sort((a, b) => a.name.localeCompare(b.name))
  
    return product
  }
  
  async function editProduct(productData) {
    const relationships = resolveProductRelationships(productData)
  
    const existingProduct = products.value.find(
      (product) => product.id === productData.id,
    )
  
    const updatedProduct = await updateProductRecord({
      ...productData,
      ...relationships,
      imagePath:
        productData.imagePath ?? existingProduct?.imagePath ?? null,
    })
  
    const productIndex = products.value.findIndex(
      (product) => product.id === updatedProduct.id,
    )
  
    if (productIndex !== -1) {
      products.value[productIndex] = updatedProduct
    }
  
    products.value.sort((a, b) => a.name.localeCompare(b.name))
  
    return updatedProduct
  }
  
  async function removeProduct(productId) {
    await deleteProductRecord(productId)
  
    products.value = products.value.filter(
      (product) => product.id !== productId,
    )
  }


  //transactions
  async function loadTransactions() {
    transactions.value = await fetchTransactions()
  }

  async function recordTransaction(transactionData) {
    const { transaction, product } = await createTransaction(transactionData)

    const productIndex = products.value.findIndex(
      (item) => item.id === product.id,
    )

    if (productIndex !== -1) {
      products.value[productIndex] = product
    }

    transactions.value.unshift(transaction)

    return transaction
  }

  return {
    products,
    categories,
    suppliers,
    transactions,
    loadCategories,
    addCategory,
    editCategory,
    removeCategory,
    loadSuppliers,
    addSupplier,
    editSupplier,
    removeSupplier,
    loadProducts,
    addProduct,
    editProduct,
    removeProduct,
    loadTransactions,
    recordTransaction,
  }
})