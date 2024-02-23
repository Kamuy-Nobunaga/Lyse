import { defineStore } from 'pinia'
import type { TProduct, TProduct2, TCart } from '@/types/ProductType'
import { db, productsRef, dbRealtime, cartRef } from '@/firebase';
import { deleteDoc, getDocs, getDoc, doc, updateDoc, addDoc } from 'firebase/firestore';
import { ref, set, get, child, push, update, remove } from 'firebase/database';
import { v4 as uuidv4 } from 'uuid';



export const useProductStore = defineStore('product', {
  state:() => {
    return {
      // products: <TProduct[]> [], 
      // loading: <boolean> false, 
      // isLogin: <boolean> false, 
      // item: <TProduct[]> [], 
      userInfo: '' as string, 
      products2: <TProduct2[]> [], 
      product: <TProduct2> {}, 
      itemAdded: <boolean> false, 
      checkoutProgress: <number> 1, 
      adminAll: <boolean> false, 
      adminTop: <boolean> false, 
      adminBottom: <boolean> false, 
      adminOrders: <boolean> false, 
      adminReviews: <boolean> false, 
      cartItems: <TCart[]> []
    } 
  },
  getters: {
    // getProductDetail(state) {
    //   return (id: number): TProduct2 => state.products2.find((item: TProduct2) => item.id === id)!
    // }, 
    getTop(state) {
      return () => state.products2.filter((item: TProduct2) => item.categories === 'top')
    },
    getBottom(state) {
      return () => state.products2.filter((item: TProduct2) => item.categories === 'bottom')
    }, 
    getTotalPrice(state) {

      const totalPriceArray: number[] = []
      let totalPrice = 0
  
       state.cartItems?.map((item) => {
        totalPriceArray.push(item.price)
      })

      for(let i = 0; i < totalPriceArray.length; i++ ) {
        console.log(totalPrice);
        totalPrice += totalPriceArray[i]
        console.log(totalPrice);
      } 
      return totalPrice
    },
  }, 
  actions: {
    // async fetchProductList() {
    //   //api fetch data
    //   console.log('fetch data');
      
    //   this.loading = true;
    //   const res = await fetch('https://api.escuelajs.co/api/v1/products')
    //     .then(res => res.json())
    //   console.log(res);
      
    //   this.products = res;
    //   this.loading = false;
    // }, 
    toggleItemAdded() {
      this.itemAdded = !this.itemAdded
    },

    async fetchProducts() {
      try {
        const snapshot = await getDocs(productsRef);
        this.products2 = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id  }));
      } catch (error: any) {
          console.log(error.message);
      }        
    }, 
    async fetchProduct(id: string) {
      const docRef = doc(db, 'products', id)
      const document = await getDoc(docRef)
      
      this.product = document.data()
    },
    async addProduct(productForm: TProduct2) {
      await addDoc(productsRef, {
        name: productForm.name, 
        brand: productForm.brand, 
        price: productForm.price, 
        color: productForm.color, 
        image: productForm.image, 
        details: productForm.details, 
        categories: productForm.categories
      })
    }, 
    async updateProduct(id: string) {
      const docRef = doc(db, 'products', id)
      await updateDoc(docRef, {
        name: this.product.name, 
        brand: this.product.brand, 
        price: this.product.price, 
        color: this.product.color, 
        image: this.product.image, 
        details: this.product.details
      })
    }, 
    async deleteProduct(id: string) {
      await deleteDoc(doc(db, 'products', id))
    }, 
    async fetchCartItems(user: string | null) {
      const userRef = ref(dbRealtime, `cart/${user}`)
      const snapshot = await get(userRef)
      this.cartItems = snapshot.val()
    }, 
    async addCartItem(user: string | null, product: TProduct2, size: string) {
      this.itemAdded = !this.itemAdded

      const newPostKey = push(child(ref(dbRealtime), `cart/${user}`)).key;
      const updates: {[key: string]: any} =  {}
      updates[`cart/${user}/${newPostKey}`] = {
        name: product.name, 
        brand: product.brand, 
        color: product.color, 
        size: size, 
        price: product.price, 
        imgUrl: product.image, 
        amounts: 1
      }
      await update(ref(dbRealtime), updates)
    }, 
    async addProductAmount(user: string | null, key: string, item: TCart, size: string) {
      const updates: {[key: string]: any} =  {}
      updates[`cart/${user}/${key}`] = {
        name: item.name, 
        brand: item.brand, 
        color: item.color, 
        size: size, 
        price: item.price, 
        imgUrl: item.imgUrl, 
        amounts: item.amounts+=1 
      }
      await update(ref(dbRealtime), updates)
    }, 
    async minusProductAmount(user: string | null, key: string, item: TCart, size: string) {
      const updates: {[key: string]: any} =  {}
      updates[`cart/${user}/${key}`] = {
        name: item.name, 
        brand: item.brand, 
        color: item.color, 
        size: size, 
        price: item.price, 
        imgUrl: item.imgUrl, 
        amounts: item.amounts-=1 
      }
      await update(ref(dbRealtime), updates)
    }, 
    async deleteCartItem(user: string | null, key: string | null) {
      const itemRef = ref(dbRealtime, `cart/${user}/${key}`) 
      await remove(itemRef)
    }
  }
})

// <input type="number" :value="item.amounts" min="1" max="10">