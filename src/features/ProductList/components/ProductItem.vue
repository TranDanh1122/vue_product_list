<script setup lang="ts">
import { computed } from 'vue';
import type { Product } from '../../../type';
import AddCartBtn from './AddCartBtn.vue';
import { useCart } from '../../../stores/Cart';
import useLayout from '../../../composables/useLayout';
const props = defineProps<{ product: Product }>()
const formatedPrice = computed(() => {
    return new Intl.NumberFormat('en-US', {
        style: "currency",
        currency: "USD"
    }).format(props.product.price)
})
const cartStore = useCart()
const cartItem = computed(() => {
    return cartStore.getCartItem(props.product.id)
})
const layout = useLayout()
const image = computed(() => {
    if (layout.value == "mobile")
        return props.product.image.mobile
    if (layout.value == "desktop")
        return props.product.image.desktop
    if (layout.value == "tablet")
        return props.product.image.tablet
})
</script>
<template>
    <div :class="`relative ${layout == 'mobile' ? 'w-full' : 'w-[calc(33.33%-16px)]'}`">
        <img v-memo="[cartItem, image]" :src="image" :alt="product.name"
            :class="`object-cover rounded-xl  overflow-hidden ${cartItem ? 'border-2 border-red' : ''} `">
        <AddCartBtn :product :cartItem />
        <span v-once aria-label="product-category" class="text-4 text-rose-500" v-text="product.category"></span>
        <h3 v-once aria-label="product-name" class="text-3 text-rose-900">{{ product.name }}</h3>
        <h4 v-once class="text-red text-3" aria-label="product-price">{{ formatedPrice }}</h4>
    </div>
</template>
<style scoped></style>