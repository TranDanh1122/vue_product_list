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
        addToCart(item: Product) {
            this.items.push({ product: item, qty: 1 })
        },
        removeCart(itemId : number) {
            this.items = this.items.filter(el => el.product.id != itemId)
        },
        changeQty(itemId : number , qty : number) {
            const updateItem = this.items.find(el => el.product.id == itemId)
            if(updateItem) updateItem.qty = qty
        }
    },

})