import type { PiniaPluginContext } from "pinia";
export function piniaLocalStorage({ store, options }: PiniaPluginContext) {
    const key = `productListPrj-${store.$id}`
    if ((options as any).persist) {
        const dataLocal = localStorage.getItem(key)
        if (dataLocal)
            store.$patch(JSON.parse(dataLocal))
        store.$subscribe((_mutation, state) => {
            localStorage.setItem(key, JSON.stringify(state))
        })
    }
}