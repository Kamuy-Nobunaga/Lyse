import { defineStore } from 'pinia'
import type { TProduct } from '@/types/ProductType'

export const useProductStore = defineStore('product', {
  state:() => {
    return {
      products: <TProduct[]> [], 
      loading: <boolean> false, 
      isLogin: <boolean> false, 
      item: <TProduct[]> [], 
      userInfo: '' as string
    } 
  },
  getters: {
    getProductDetail(state) {
      return (id: number): TProduct => state.products.find((item: TProduct) => item.id === id)!
    }
  }, 
  actions: {
    async fetchProductList() {
      //api fetch data
      console.log('fetch data');
      
      this.loading = true;
      const res = await fetch('https://api.escuelajs.co/api/v1/products')
        .then(res => res.json())
      console.log(res);
      
      this.products = res;
      this.loading = false;
    }, 
  }
})

