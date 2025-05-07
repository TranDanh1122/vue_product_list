import { defineStore } from "pinia"
import type { Product } from "../type"
import { fetchProductApi } from "../api/product"
interface State {
    products: Product[],
    filter: {
        sort: "asc" | "desc",
        sortBy: keyof Product,
        search: string
    },
    paginate: {
        limit: number,
        offset: number
    },
    loading: boolean,
    errorMessages: string
}
interface Getters extends Record<string, any> {
    total(): number,
    isFirstPage(): boolean,
    isLastPage(): boolean,
    numberOfPage(): number,
    currentPage(): number,
    filteredAllProduct(): Product[],
    filteredProduct(): Product[],
}
interface Actions {
    fetchProduct(): Promise<void>,
    goToPage(type: string): void,
    changeSortBy(sortBy: keyof Product): void,
    changeOrder(order: "asc" | "desc"): void,
    search(val: string): void,
}
export const useProductList = defineStore<'products', State, Getters, Actions>('products', {
    state: () => ({
        products: [] as Product[],
        filter: {
            sort: "asc",
            sortBy: "name",
            search: "",
        },
        paginate: {
            limit: 9,
            offset: 0,
        },
        loading: true,
        errorMessages: ""
    }),
    actions: {
        async fetchProduct() {
            try {
                const products = await fetchProductApi()
                this.products = products
                this.loading = false
            } catch (error) {
                this.errorMessages = error as string
                this.loading = false
                console.error("Lỗi", error)
            }
        },
        goToPage(type: string) {
            if (type == "next") {
                this.paginate.offset = this.paginate.offset + this.paginate.limit
            } else {
                if (this.paginate.offset > 0)
                    this.paginate.offset = this.paginate.offset - this.paginate.limit
            }
        },
        changeSortBy(sortBy: keyof Product) {
            this.filter.sortBy = sortBy
        },
        changeOrder(order: "asc" | "desc") {
            if (order != this.filter.sort)
                this.filter.sort = order
        },
        search(val: string) {
            this.filter.search = val
            this.paginate.offset = 0
        }
    },
    getters: {
        total(): number {
            return this.filteredAllProduct.length ?? 0
        },
        isFirstPage(): boolean {
            return this.paginate.offset == 0
        },
        isLastPage(): boolean {
            return this.paginate.offset + this.paginate.limit >= (this.filteredAllProduct.length ?? 0)
        },
        numberOfPage() {
            return Math.ceil((this.filteredAllProduct.length ?? this.products.length) / this.paginate.limit)
        },
        currentPage(): number {
            if (this.paginate.offset == 0) return 1
            return Math.ceil(this.paginate.offset / this.paginate.limit) + 1
        },

        filteredAllProduct(): Product[] {
            let result = [...this.products]
            if (this.filter.search) {
                const searchStr = this.filter.search.toLocaleLowerCase().trim()
                result = result.filter(prod => prod.name.toLocaleLowerCase().includes(searchStr.toLocaleLowerCase()))
            }
            if (this.filter.sort) {
                const sortBy = this.filter.sortBy
                result = result.sort((a: Product, b: Product) => {
                    const firstVal = a[sortBy]
                    const secondVal = b[sortBy]
                    if (typeof firstVal == "number" && typeof secondVal == "number")
                        return this.filter.sort == "asc" ? firstVal - secondVal : secondVal - firstVal
                    if (typeof firstVal == "string" && typeof secondVal == "string")
                        return this.filter.sort == "asc" ? firstVal.localeCompare(secondVal) : secondVal.localeCompare(firstVal)
                    return 0
                })
            }
            return result
        },
        filteredProduct(): Product[] {
            const result = this.filteredAllProduct ?? []
            return result.slice(this.paginate.offset, this.paginate.offset + this.paginate.limit)
        },
    }
})