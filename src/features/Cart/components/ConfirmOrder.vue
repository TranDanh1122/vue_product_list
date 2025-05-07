<script setup lang="ts">
import { ref } from 'vue';
import CartContent from './CartContent.vue';
import { useCart } from '../../../stores/Cart';
import useLayout from '../../../composables/useLayout';
const popupRef = ref(false)
const cartStore = useCart()
const layout = useLayout()
</script>
<template>
    <button @click="() => popupRef = !popupRef" aria-label="confirm order"
        class="text-3 text-white bg-red w-full rounded-full py-4 cursor-pointer">
        Confirm Order
    </button>
    <div v-if="popupRef" @click="() => popupRef = !popupRef"
        class="fixed w-screen h-screen bg-[#000000]/50  top-0 left-0"></div>
    <div v-if="popupRef"
        :class="`bg-white space-y-6 fixed  ${layout == 'mobile' ? 'w-full bottom-0 left-0 p-2  rounded-t-xl ' : 'w-1/3 top-1/2 left-1/2 -translate-1/2 p-10  rounded-2xl '}  `">
        <div class="mb-8">
            <img src="/assets/images/icon-order-confirmed.svg" alt="confirm " :class="`object-cover  ${layout == 'mobile' ? 'size-8' : 'size-12'} `">
            <h2 :class="` ${layout == 'mobile' ? 'text-2' : 'text-1'} text-rose-900`"> Order Confirmed </h2>
            <p class="text-4 text-rose-500">We hope you enjoy your food!</p>
        </div>
        <CartContent isConfirm />
        <button @click="cartStore.$reset" aria-label="confirm order"
            class="text-3 text-white bg-red w-full rounded-full py-4 cursor-pointer">
            Start New Order
        </button>
    </div>
</template>