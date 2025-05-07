<script setup lang="ts">
import { useCart } from '../../stores/Cart';
import CartContent from './components/CartContent.vue';
import ConfirmOrder from './components/ConfirmOrder.vue';
const cartStore = useCart()

</script>
<template>
    <div class="p-6 flex flex-col gap-6 bg-white w-1/3 rounded-md max-h-fit">
        <h2 class="text-2 text-red">Your Cart ({{ cartStore.getCart.qty }})</h2>
        <div v-if="cartStore.getCart.qty == 0">
            <img src="/assets/images/illustration-empty-cart.svg" alt="empty-cart"
                class="size-32 object-cover mx-auto" />
            <p class="text-4-bold text-rose-500 text-center">Your added items will appear here</p>
        </div>
        <CartContent :isConfirm="false" />
        <div v-if="cartStore.getCart.qty > 0"
            class="px-6 py-4 bg-rose-50 rounded-md flex items-center justify-center gap-2">
            <img src="/assets/images/icon-carbon-neutral.svg" alt="carbon neutal" class="size-5 object-cover">
            <span class="text-4 text-rose-900">
                This is a
                <span class="text-4-bold text-rose-900">carbon-neutral</span>
                delivery
            </span>
        </div>
        <ConfirmOrder v-if="cartStore.getCart.qty > 0" />
    </div>
</template>
