<script setup lang="ts">
import { computed } from 'vue';
import type { Product } from '../../../type';
import AddCartBtn from './AddCartBtn.vue';
const props = defineProps<{ product: Product }>()
const formatedPrice = computed(() => {
    return new Intl.NumberFormat('en-US', {
        style: "currency",
        currency: "USD"
    }).format(props.product.price)
}) 
</script>
<template>
    <div class="relative w-[calc(33.33%-16px)]">
        <img :src="product.image.desktop" :alt="product.name" class="object-cover rounded-xl overflow-hidden">
        <AddCartBtn :product />
        <span aria-label="product-category" class="text-4 text-rose-500" v-text="product.category"></span>
        <h3 aria-label="product-name" class="text-3 text-rose-900">{{ product.name }}</h3>
        <h4 class="text-red text-3" aria-label="product-price">{{ formatedPrice }}</h4>
    </div>
</template>
<style scoped></style>