<script setup lang="ts">
import { ref } from 'vue';
import CartContent from './CartContent.vue';
import { useCart } from '../../../stores/Cart';
const popupRef = ref(false)
const cartStore = useCart()
</script>
<template>
    <button @click="() => popupRef = !popupRef" aria-label="confirm order"
        class="text-3 text-white bg-red w-full rounded-full py-4 cursor-pointer">
        Confirm Order
    </button>
    <div v-if="popupRef" @click="() => popupRef = !popupRef"
        class="fixed w-screen h-screen bg-[#000000]/50  top-0 left-0"></div>
    <div v-if="popupRef" class="bg-white space-y-6 fixed p-10 rounded-2xl top-1/2 left-1/2 -translate-1/2 w-1/3">
        <div class="mb-8">
            <img src="/assets/images/icon-order-confirmed.svg" alt="confirm " class="object-cover size-12">
            <h2 class="text-1 text-rose-900"> Order Confirmed </h2>
            <p class="text-4 text-rose-500">We hope you enjoy your food!</p>
        </div>
        <CartContent isConfirm />
        <button @click="cartStore.$reset" aria-label="confirm order" class="text-3 text-white bg-red w-full rounded-full py-4 cursor-pointer">
            Start New Order
        </button>
    </div>
</template>