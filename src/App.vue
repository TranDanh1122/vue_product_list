<script setup lang="ts">
import { onMounted } from 'vue';
import { useProductList } from './stores/Product';
import { ProductList, Cart } from './features';
import useLayout from './composables/useLayout';
const userStore = useProductList()
onMounted(() => {
  userStore.fetchProduct()
})
const layout = useLayout()
</script>

<template>
  <div class="w-full max-w-screen h-full min-h-screen bg-rose-50">
    <div :class="`container mx-auto flex ${layout == 'desktop' ? 'py-22' : 'flex-col p-6'} gap-8`">
      <div :class="`${layout == 'desktop' ? 'w-2/3' : 'w-full'}`">
        <h1 class="text-rose-900 text-1 mb-8">Desserts</h1>
        <ProductList />
      </div>
      <Cart />
    </div>
  </div>
</template>

<style scoped></style>
