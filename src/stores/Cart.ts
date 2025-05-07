import { defineStore } from "pinia"
import type { Product } from "../type"
export interface CartItem {
    product: Product,
    qty: number,
}
interface Cart {
    items: CartItem[],
    total: number,
    qty: number,
}
interface State {
    items: CartItem[]
}
interface Getters extends Record<string, any> {
    getCart(): Cart,
    getCartItem(): (productID: number) => CartItem | undefined
}
interface Actions {
    addToCart(item: Product): void,
    removeCart(itemId: number): void,
    changeQty(itemId: number, qty: number): void
}
export const useCart = defineStore<"cart", State, Getters, Actions>("cart", {
    state: () => ({
        items: [] as CartItem[]
    }),
    actions: {
        addToCart(item: Product) {
            this.items.push({ product: item, qty: 1 })
        },
        removeCart(itemId: number) {
            this.items = this.items.filter(el => el.product.id != itemId)
        },
        changeQty(itemId: number, qty: number) {
            const updateItem = this.items.find(el => el.product.id == itemId)
            if (updateItem) {
                updateItem.qty = qty
                if (updateItem?.qty <= 0)
                    this.removeCart(itemId)
            }
        }
    },
    getters: {
        getCart(): Cart {
            const { price, qty } = this.items.reduce((sum, item) => {
                const itemPrice = item.qty * item.product.price
                return sum = { price: sum.price + itemPrice, qty: item.qty }
            }, { price: 0, qty: 0 })
            return {
                total: price,
                items: this.items,
                qty: qty
            }
        },
        getCartItem() {
            return (productID: number) => {
                const item = this.items.find(el => el.product.id == productID)
                return item
            }
        }
    }
})
