<script setup lang="ts">
import { useProductList } from '../../stores/Product';
import ProductItem from './components/ProductItem.vue';
import Filter from './components/Filter.vue';
import Paginate from './components/Paginate.vue';
const productStore = useProductList()
</script>
<template>
    <div class="w-full">
        <Filter />
        <div class="w-full flex items-stretch justify-start gap-6 flex-wrap">
            <ProductItem v-for="(product, key) in productStore.filteredProduct" :key :product />
        </div>
        <Paginate />
    </div>

</template>
<style scoped></style>