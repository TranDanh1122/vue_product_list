<script setup lang="ts">
import { useCart } from '../../../stores/Cart';
import { computed } from 'vue'
const props = defineProps<{product: Product}>()
const cartStore = useCart()
const isOnCart = computed(() => {
    return cartStore.items.some(el => el.id == props.product.id)
})
</script>
<template>
    <div v-if="!isOnCart" @click="cartStore.addToCart(product)" class="w-1/2 relative border-rose-900 border -translate-y-1/3 mx-auto bg-white flex justify-center gap-2 py-3 rounded-full cursor-pointer">
        <img src="/assets/images/icon-add-to-cart.svg" alt="addcarticon" class="object-cover size-5 ">
        <span class="text-rose-900 text-4-bold">Add To Cart</span>
    </div>
</template>