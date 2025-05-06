<script setup lang="ts">
import { SquareArrowRight, SquareArrowLeft } from "lucide-vue-next"
import { useProductList } from '../../../stores/Product';
const productStore = useProductList()
</script>
<template>
    <div class="flex items-center gap-2 w-full mt-6 border border-rose-300 py-2 px-4 rounded-md">
        <span class="text-rose-900 text-3">Total: {{ productStore.total }} </span>
        <span class="text-rose-900 ml-auto text-3">Page: {{ productStore.currentPage }} / {{ productStore.numberOfPage }}</span>
        <SquareArrowLeft @click="() => { if (!productStore.isFirstPage) productStore.goToPage('prev') }"
            :class="`size-10  ${productStore.isFirstPage ? 'text-rose-300' : 'text-rose-500'}`" />
        <SquareArrowRight @click="() => { if (!productStore.isLastPage) productStore.goToPage('next') }"
            :class="`size-10 ${productStore.isLastPage ? 'text-rose-300' : 'text-rose-500'}`" />
    </div>
</template>