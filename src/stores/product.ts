import { defineStore } from 'pinia'
import type { TProduct, TProduct2, TCart, TCustomer, TDelivery, TOrders, TAccount } from '@/types/ProductType'
import { db, productsRef, dbRealtime, cartRef } from '@/firebase';
import { deleteDoc, getDocs, getDoc, doc, updateDoc, addDoc, or } from 'firebase/firestore';
import { ref, set, get, child, push, update, remove } from 'firebase/database';
import { v4 as uuidv4 } from 'uuid';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth'




export const useProductStore = defineStore('product', {
  state:() => {
    return {
      userInfo: '' as string, 
      products2: <TProduct2[]> [], 
      product: <TProduct2> {}, 
      itemAdded: <boolean> false, 
      showCarAtNav: <boolean> false,
      checkoutProgress: <number> 1, 
      adminAll: <boolean> false, 
      adminTop: <boolean> false, 
      adminBottom: <boolean> false, 
      adminOrders: <boolean> false, 
      adminReviews: <boolean> false, adminShopSetting: <boolean> false, 
      cartItems: <TCart[]> [], 
      allOrders: <TOrders[]>[], 
      anOrder: <TOrders[]>[], 
      allowAddToCart: <boolean> false, 
      cartWithLargePage: <boolean> false,
      showAlert: <boolean> false, 
      loggingIn: <boolean> false, 
      loginFailed: <boolean> false, 
      logInToContinue: <boolean> false, 

    } 
  },
  getters: {
    getTop(state) {
      return () => state.products2.filter((item: TProduct2) => item.categories === 'top')
    },
    getBottom(state) {
      return () => state.products2.filter((item: TProduct2) => item.categories === 'bottom')
    }, 
    getTotalPriceAfterFetch(state) {
      let totalPrice = 0;

      for (const key in state.cartItems) {
        if (state.cartItems.hasOwnProperty(key)) {
          const item = state.cartItems[key];
          console.log(item.price, typeof(item.price));
          const singleItemTotalPrice = Number(item.price) * Number(item.amounts)
          if(singleItemTotalPrice) {
            totalPrice += singleItemTotalPrice;
          }
          console.log(totalPrice);
        }
      }

      return totalPrice;
    }
  }, 
  actions: {
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
    async fetchCartItems(user: string | undefined | null) {
      const userRef = ref(dbRealtime, `cart/${user}`)
      const snapshot = await get(userRef)
      this.cartItems = snapshot.val()
    }, 
    async addCartItem(user: string | null | undefined, product: TProduct2, size: string) {
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
    async addProductNumber(user: string  | undefined, key: string, item: TCart, size: string) {
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
    async minusProductNumber(user: string | undefined, key: string, item: TCart, size: string) {
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
    async clearCart(user: string | null | undefined) {
      const updates: {[key: string]: any} =  {}
      updates[`cart/${user}`] = {}
      console.log(updates);
      
      await update(ref(dbRealtime), updates)
    }, 

    async deleteCartItem(user: string | undefined, key: string | null) {
      const itemRef = ref(dbRealtime, `cart/${user}/${key}`) 
      await remove(itemRef)
    }, 
    async fetchOrders() {
      const ordersRef = ref(dbRealtime, `orders`)
      const snapshot = await get(ordersRef)
      this.allOrders = snapshot.val()
    }, 
    async fetchOrder(keyUser: string, keyOrder: string) {
      const orderRef = ref(dbRealtime, `orders/${keyUser}/${keyOrder}`)
      const snapshot = await get(orderRef)
      this.anOrder = snapshot.val()
    }, 
    async addAnOrder(user: string | null | undefined, customerInfo: TCustomer, deliveryInfo: TDelivery) {
      const newPostKey = push(child(ref(dbRealtime), `orders/${user}`)).key;

      const updates: {[key: string]: any} = {}
      updates[`orders/${user}/${newPostKey}`] = {
        ...this.cartItems, 
        ...customerInfo, 
        ...deliveryInfo
      }
      console.log(updates);
      
      await update(ref(dbRealtime), updates)
    }, 
    async updateOrderToCompleted(keyUser: string, keyOrder: string) {
      const updates: {[key: string]: any} =  {}
      updates[`orders/${keyUser}/${keyOrder}`] = {
        ...this.anOrder, 
        status: true
      }
      
      await update(ref(dbRealtime), updates)
    }, 
    async userSignIn(account: TAccount) {
      const auth = getAuth()

      try {
        const cred = await signInWithEmailAndPassword(auth, account.email, account.password)
        localStorage.setItem('user', account.email)
        console.log('user logged in', cred.user);
      } catch (err) {
        console.log(err);
        
      }

    }, 
    async userLogout() {
      const auth = getAuth()
      await signOut(auth)
      localStorage.removeItem('user')

      console.log('logged out successfully');
    },
    async userSignup(account: TAccount) {
      const auth = getAuth()
      const cred = await createUserWithEmailAndPassword(auth, account.email, account.password)

      console.log('signed up successfully', cred.user);
    }, 
    toggleShowAlert () {
      this.showAlert = !this.showAlert
    }
  }
})
