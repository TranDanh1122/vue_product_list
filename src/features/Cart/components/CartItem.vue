<script setup lang="ts">
import { computed } from 'vue';
import { useCart, type CartItem } from '../../../stores/Cart';
import { CircleX } from 'lucide-vue-next'
const props = defineProps<{ item: CartItem, isConfirm?: boolean }>()
const formatedPrice = computed(() => {
    return new Intl.NumberFormat('en-US', {
        style: "currency",
        currency: "USD"
    }).format(props.item.product.price)
})

const formatedSubTotal = computed(() => {
    return new Intl.NumberFormat('en-US', {
        style: "currency",
        currency: "USD"
    }).format(props.item.product.price * props.item.qty)
})
const cartStore = useCart()
</script>
<template>
    <div class="flex items-center justify-between py-4 border-b border-b-rose-100">
        <div class="flex items-center gap-2">
            <img v-if="isConfirm" :src="item.product.image.thumbnail" :alt="item.product.name"
                class="size-12 object-cover">
            <div>
                <h2 class="text-4-bold text-rose-900 mb-2" v-once>{{ item.product.name }}</h2>
                <div class="flex items-center gap-2">
                    <span class="text-4-bold text-red">{{ item.qty }}X</span>
                    <span class="text-rose-500 text-4 ">@ {{ formatedPrice }}</span>
                    <span v-if="!isConfirm" class="text-4-bold text-rose-500">{{ formatedSubTotal }}</span>
                </div>
            </div>
        </div>

        <CircleX v-if="!isConfirm" class="text-rose-400 cursor-pointer"
            @click="cartStore.removeCart(item.product.id)" />
        <span v-if="isConfirm" class="text-3 text-rose-900">{{ formatedSubTotal }}</span>
    </div>

</template>