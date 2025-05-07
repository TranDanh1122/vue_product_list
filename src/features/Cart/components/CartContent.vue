<script setup lang="ts">
import { computed } from 'vue';
import { useCart } from '../../../stores/Cart';
import CartItem from './CartItem.vue';
const cartStore = useCart()
const formatedPrice = computed(() => new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD"
}).format(cartStore.getCart.total))
defineProps<{ isConfirm: boolean }>()
</script>
<template>
    <div v-if="cartStore.getCart.qty > 0" :class="`${isConfirm ? 'bg-rose-50 p-6' : ''}`">
        <CartItem v-for="(item) in cartStore.getCart.items" :item :key="item.product.id" :isConfirm />
    </div>
    <div v-if="cartStore.getCart.qty > 0" class="flex items-center justify-between py-1.5">
        <span class="text-4 text-rose-900">Order Total</span>
        <span class="text-2 text-rose-900">{{ formatedPrice }}</span>
    </div>
</template>