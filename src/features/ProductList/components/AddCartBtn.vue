<script setup lang="ts">
import { computed } from 'vue';
import { useCart, type CartItem } from '../../../stores/Cart';
import type { Product } from '../../../type';
import { REGEX_NUM } from "../../../ults/const"
const props = defineProps<{ product: Product, cartItem: CartItem | undefined }>()
const cartStore = useCart()
const qty = computed({
    get: () => props.cartItem?.qty,
    set: (newVal: number) => {
        if (REGEX_NUM.test(newVal as unknown as string)) {
            cartStore.changeQty(props.product.id, newVal)
        }
    }
})

</script>
<template>
    <div class="relative">
        <div v-if="!cartItem" @click="cartStore.addToCart(product)"
            class="w-1/2 relative border-rose-900 border -translate-y-1/3 mx-auto bg-white flex justify-center gap-2 py-3 rounded-full cursor-pointer">
            <img src="/assets/images/icon-add-to-cart.svg" alt="addcarticon" class="object-cover size-5 ">
            <span class="text-rose-900 text-4-bold">Add To Cart</span>
        </div>
        <div v-if="cartItem"
            class="w-1/2 relative -translate-y-1/3 mx-auto bg-red flex justify-between items-center py-3 rounded-full cursor-pointer px-4">
            <button @click="cartStore.changeQty(cartItem.product.id, Number(cartItem.qty) - 1)" aria-label="decrement cart item"
                class="size-4.5 border border-white flex justify-center items-center rounded-full">
                <img src="/assets/images/icon-decrement-quantity.svg" alt="decrement cart item" class="object-cover">
            </button>
            <input v-model="qty"
                class="text-white px-2 focus-visible:outline-0 w-1/2 focus-visible:border rounded-2xl text-center">
            <button @click="cartStore.changeQty(cartItem.product.id,  Number(cartItem.qty) + 1)" aria-label="increment cart item"
                class="size-4.5 border border-white flex justify-center items-center rounded-full">
                <img src="/assets/images/icon-increment-quantity.svg" alt="increment cart item" class="object-cover">
            </button>
        </div>
    </div>
</template>
