import { createRouter, createWebHistory, RouterView } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { useI18n } from 'vue-i18n'
import { useProductStore } from '@/stores/product'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/:locale',
      component: RouterView, 
      children: [
        {
          path: '',
          name: 'home',
          component: HomeView
        }, 
        {
          path: 'about',
          name: 'about',
          component: () => import('@/views/AboutView.vue')
        },
        {
          path: 'productList',
          name: 'productList',
          component: () => import('@/views/ProductList.vue'), 
          beforeEnter:( to, from, next ) => {
            const userCheck = localStorage.getItem('user')
            const productStore = useProductStore()

            if (userCheck) {
              next()
            } else {
              productStore.logInToContinue = true
              productStore.showAlert = true
              setTimeout(() => {
                productStore.showAlert = false
                productStore.logInToContinue = false
              }, 1500)

              return next({ name: 'login'})
            }
          }
        },  
        {
          path: 'productList/:id',
          name: 'productDetail',
          component: () => import('@/views/ProductDetail.vue'), 
          beforeEnter:( to, from, next ) => {
            const userCheck = localStorage.getItem('user')
            if (userCheck) {
              next()
            } else {
              return next({ name: 'login'})
            }
          }
        }, 
        {
          path: 'categories',
          name: 'categories',
          component: () => import('@/views/CategoriesView.vue'), 
          beforeEnter:( to, from, next ) => {
            const userCheck = localStorage.getItem('user')
            const productStore = useProductStore()

            if (userCheck) {
              next()
            } else {
              productStore.logInToContinue = true
              productStore.showAlert = true
              setTimeout(() => {
                productStore.showAlert = false
                productStore.logInToContinue = false
              }, 1500)

              return next({ name: 'login'})
            }
          }
        }, 
        {
          path: 'top',
          name: 'top',
          component: () => import('@/views/ProductTopView.vue'), 
          beforeEnter:( to, from, next ) => {
            const userCheck = localStorage.getItem('user')
            const productStore = useProductStore()

            if (userCheck) {
              next()
            } else {
              productStore.logInToContinue = true
              productStore.showAlert = true
              setTimeout(() => {
                productStore.showAlert = false
                productStore.logInToContinue = false
              }, 1500)
              return next({ name: 'login'})
            }
          }
        },
        {
          path: 'bottom',
          name: 'bottom',
          component: () => import('@/views/ProductBottomView.vue'), 
          beforeEnter:( to, from, next ) => {
            const userCheck = localStorage.getItem('user')
            const productStore = useProductStore()

            if (userCheck) {
              next()
            } else {
              productStore.logInToContinue = true
              productStore.showAlert = true
              setTimeout(() => {
                productStore.showAlert = false
                productStore.logInToContinue = false
              }, 1500)
              return next({ name: 'login'})
            }
          }
        }, 
        {
          path: 'checkout',
          name: 'checkout',
          component: () => import('@/views/CheckoutView.vue'), 
          beforeEnter:( to, from, next ) => {
            const userCheck = localStorage.getItem('user')
            const productStore = useProductStore()

            if (userCheck) {
              next()
            } else {
              productStore.logInToContinue = true
              productStore.showAlert = true
              setTimeout(() => {
                productStore.showAlert = false
                productStore.logInToContinue = false
              }, 1500)
              return next({ name: 'login'})
            }
          }
        }, 
        {
          path: 'login',
          name: 'login',
          component: () => import('@/views/LoginView.vue'), 
          beforeEnter:( to, from, next ) => {
            const userCheck = localStorage.getItem('user')

            if (userCheck) {
              next({ path: `/en` })
            } else {
              return next()
            }
          }

        },
        {
          path: 'signup',
          name: 'signup',
          component: () => import('@/views/SignupView.vue'), 
        },
        {
          path: 'admin-login',
          name: 'adminLogin',
          component: () => import('@/views/AdminView/AdminLoginView.vue')
        },
        {
          path: 'admin-main',
          name: 'adminMain',
          component: () => import('@/views/AdminView/AdminMainView.vue'), 
          beforeEnter:( to, from, next ) => {
            
            const adminCheck = localStorage.getItem('admin')
            if (adminCheck && adminCheck === 'admin') {
              next()
            } else {
              return next({ path: `/en/admin-login` })
            }
          }, 
        },
        {
          path: 'admin-product-add',
          name: 'adminProductAdd',
          component: () => import('@/views/AdminView/AdminProductAddView.vue'), 
          beforeEnter:( to, from, next ) => {
            
            const adminCheck = localStorage.getItem('admin')
            if (adminCheck && adminCheck === 'admin') {
              next()
            } else {
              return next({ path: `/en/admin-login` })
            }
          }
        },
        {
          path: 'admin-product-edit/:id',
          name: 'adminProductEdit',
          component: () => import('@/views/AdminView/AdminProductEditView.vue'), 
          beforeEnter:( to, from, next ) => {
            
            const adminCheck = localStorage.getItem('admin')
            if (adminCheck && adminCheck === 'admin') {
              next()
            } else {
              return next({ path: `/en/admin-login` })
            }
          }
        }, 
        {
          path: 'admin-order-products/:user/:order',
          name: 'adminOrderProducts',
          component: () => import('@/views/AdminView/AdminOrderProductsView.vue'), 
          beforeEnter:( to, from, next ) => {
            
            const adminCheck = localStorage.getItem('admin')
            if (adminCheck && adminCheck === 'admin') {
              next()
            } else {
              return next({ path: `/en/admin-login` })
            }
          }
        }, 
        {
          path: 'alert',
          name: 'alert',
          component: () => import('@/components/Alert.vue')
        }, 

        {
          path: '404',
          name: '404',
          component: () => import('../views/404View.vue')
        }, 
        {
          path: ':catchAll(.*)',
          redirect: '/en/404',
        }


      ]
    }, 
    {
      path: '/',
      redirect: '/en'
    }, 

  ]
})


export default router
