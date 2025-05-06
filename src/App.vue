<script setup lang="ts">
import { onMounted } from 'vue';
import { useProductList } from './stores/Product';
import { ProductList, Cart } from './features';
const userStore = useProductList()
onMounted(() => {
  userStore.fetchProduct()
})
</script>

<template>
  <div class="w-full min-w-screen h-full min-h-screen bg-rose-50">
    <div class="container mx-auto py-22 flex gap-8">
      <div class="w-2/3">
        <h1 class="text-rose-900 text-1 mb-8">Desserts</h1>
        <ProductList />
      </div>
      <Cart />
    </div>
  </div>
</template>

<style scoped></style>
