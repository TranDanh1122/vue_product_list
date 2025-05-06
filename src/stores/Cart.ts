import { defineStore } from "pinia"
import type { Product } from "../type"
interface CartItem {
    product: Product,
    qty: number,
}
export const useCart = defineStore("cart", {
    state: () => ({
        items: [] as CartItem[]
    }),
    actions: {
        addToCart(item: Product, qty: number) {
            const existItem = this.items.find(el => item.name.toLocaleLowerCase() == el.product.name.toLocaleLowerCase())
            if (existItem) {
                existItem.qty = qty
            } else {
                this.items.push({ product: item, qty: qty })
            }
        },
        removeCart() {

        }
    },

})