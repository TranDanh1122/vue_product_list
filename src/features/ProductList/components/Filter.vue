<script setup lang="ts">
import { ArrowDownNarrowWide, ArrowUpWideNarrow } from 'lucide-vue-next';
import { useProductList } from '../../../stores/Product';
import type { Product } from '../../../type';
import debounce from 'lodash.debounce';
import { ref, watch } from "vue"
import useLayout from '../../../composables/useLayout';
const productStore = useProductList()
const handleChangeSortBy = (e: Event) => {
  const value = (e.target as HTMLSelectElement).value as keyof Product
  productStore.changeSortBy(value)
}
const handleChangeSort = (type: "asc" | "desc") => {
  productStore.changeOrder(type)
}
const inputRef = ref("")
const debounceSearch = debounce((val: string) => {
  productStore.search(val)
}, 300)
watch(inputRef, () => {
  debounceSearch(inputRef.value)
})
const layout = useLayout()
</script>
<template>
  <div
    :class="` flex ${layout == 'mobile' ? 'flex-col gap-2' : 'items-center'}  mb-6 border border-rose-300 rounded-md px-4 py-2 `">
    <div :class="`flex flex-col gap-2 ${layout == 'mobile' ? 'w-full' : ''}` ">
      <label for="search" class="text-4-bold text-rose-900">Search</label>
      <input v-model="inputRef" type="text" id="search"
        class="bg-white border border-rose-900 rounded-md focus-visible:outline-0 px-1 py-0.5" />
    </div>
    <div :class="`ml-auto flex items-end gap-2 ${layout == 'mobile' ? 'w-full' : ''}` ">
      <div class="flex flex-col  gap-2">
        <label class="text-4-bold text-rose-900" for="sort-by">Sort By</label>
        <select @change="handleChangeSortBy"
          class="text-4-bold text-rose-900 bg-white hover:outline-0 min-w-[150px] border rounded-md py-1" id="sort-by">
          <option value="name">Name</option>
          <option value="category">Category</option>
          <option value="price">Price</option>
        </select>
      </div>
      <ArrowDownNarrowWide @click="handleChangeSort('desc')" v-if="productStore.filter.sort == 'asc'"
        class="cursor-pointer size-6 " />
      <ArrowUpWideNarrow @click="handleChangeSort('asc')" v-if="productStore.filter.sort == 'desc'"
        class="cursor-pointer size-6 " />
    </div>

  </div>
</template>
