<script setup lang="ts">
import { computed } from 'vue';
import { useCart } from '../../stores/Cart';
import CartItem from './components/CartItem.vue';
const cartStore = useCart()
const formatedPrice = computed(() => new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD"
}).format(cartStore.getCart.total))
</script>
<template>
    <div class="p-6 flex flex-col gap-6 bg-white w-1/3 rounded-md max-h-fit">
        <h2 class="text-2 text-red">Your Cart ({{ cartStore.getCart.qty }})</h2>
        <div v-if="cartStore.getCart.qty == 0">
            <img src="/assets/images/illustration-empty-cart.svg" alt="empty-cart"
                class="size-32 object-cover mx-auto" />
            <p class="text-4-bold text-rose-500 text-center">Your added items will appear here</p>
        </div>
        <div v-if="cartStore.getCart.qty > 0">
            <CartItem v-for="(item) in cartStore.getCart.items" :item :key="item.product.id" />
        </div>
        <div class="flex items-center justify-between py-1.5">
            <span class="text-4 text-rose-900">Order Total</span>
            <span class="text-2 text-rose-900">{{ formatedPrice }}</span>
        </div>
        <div class="px-6 py-4 bg-rose-50 rounded-md flex items-center justify-center gap-2">
            <img src="/assets/images/icon-carbon-neutral.svg" alt="carbon neutal" class="size-5 object-cover">
            <span class="text-4 text-rose-900">
                This is a
                <span class="text-4-bold text-rose-900">carbon-neutral</span>
                delivery
            </span>
        </div>
        <button aria-label="confirm order" class="text-3 text-white bg-red w-full rounded-full py-4 cursor-pointer">Confirm
            Order</button>
    </div>
</template>
