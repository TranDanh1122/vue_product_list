import { defineStore } from "pinia"
import type { Product } from "../type"
import { fetchProductApi } from "../api/product"
interface Filter {
    sort: string,
    sortBy: keyof Product,
    search: string
}
interface Paginate {
    limit: number,
    offset: number
}
interface ProductGetters  {
    filteredAllProduct: Product[]
    filteredProduct: Product[]
    isLastPage: boolean
    numberOfPage: number
    currentPage: number
}
interface ProductStoreState extends Partial<ProductGetters> {
    products: Product[],
    filter: Filter,
    paginate: Paginate,
    loading: boolean,
    errorMessages: string,
}

export const useProductList = defineStore('products', {
    state: (): ProductStoreState => ({
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
           if(order != this.filter.sort)
            this.filter.sort = order
        },
        search(val: string) {
            this.filter.search = val
            this.paginate.offset = 0 
        }
    },
    getters: {
        total() : number {
            return this.filteredAllProduct?.length ?? 0
        },
        isFirstPage(state) {
            return state.paginate.offset == 0
        },
        isLastPage(state) {
            return state.paginate.offset + state.paginate.limit >= (this.filteredAllProduct?.length  ?? 0)
        },
        numberOfPage(state) {
            return Math.ceil((this.filteredAllProduct?.length ?? 1) / state.paginate.limit)
        },
        currentPage(state) {
            if(state.paginate.offset == 0) return 1
            return Math.ceil(state.paginate.offset / state.paginate.limit ) + 1
        },

        filteredAllProduct (state) {
            let result = [...state.products]
            if (state.filter.search) {
                const searchStr = state.filter.search.toLocaleLowerCase().trim()
                result = result.filter(prod => prod.name.toLocaleLowerCase().includes(searchStr.toLocaleLowerCase()))
            }
            if (state.filter.sort) {
                const sortBy = state.filter.sortBy
                result = result.sort((a, b) => {
                    const firstVal = a[sortBy]
                    const secondVal = b[sortBy]
                    if (typeof firstVal == "number" && typeof secondVal == "number")
                        return state.filter.sort == "asc" ? firstVal - secondVal : secondVal - firstVal
                    if (typeof firstVal == "string" && typeof secondVal == "string")
                        return state.filter.sort == "asc" ? firstVal.localeCompare(secondVal) : secondVal.localeCompare(firstVal)
                    return 0
                })
            }
            return result
        },
        filteredProduct(state) {
            const result = this.filteredAllProduct ?? []
            return result.slice(state.paginate.offset, state.paginate.offset + state.paginate.limit)
        },
    }
})