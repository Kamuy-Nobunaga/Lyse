import { createRouter, createWebHistory, RouterView } from 'vue-router'
import HomeView from '../views/HomeView.vue'
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
          component: HomeView, 
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
        },  
        {
          path: 'productList/:id',
          name: 'productDetail',
          component: () => import('@/views/ProductDetail.vue'), 
        }, 
        {
          path: 'categories',
          name: 'categories',
          component: () => import('@/views/CategoriesView.vue'), 
        }, 
        {
          path: 'top',
          name: 'top',
          component: () => import('@/views/ProductTopView.vue'), 
        },
        {
          path: 'bottom',
          name: 'bottom',
          component: () => import('@/views/ProductBottomView.vue'), 
        }, 
        {
          path: 'checkout',
          name: 'checkout',
          component: () => import('@/views/CheckoutView.vue'), 
        }, 
        {
          path: 'login',
          name: 'login',
          component: () => import('@/views/LoginView.vue'), 
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
        }, 
        {
          path: 'admin-order-products/:user/:order',
          name: 'adminOrderProducts',
          component: () => import('@/views/AdminView/AdminOrderProductsView.vue'), 
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

router.beforeEach(( to ) => {
  const isLogin = localStorage.getItem('user')
  const isAdminLogin = localStorage.getItem('admin')
  const productStore = useProductStore()

  if(to.name === 'login' && isLogin) {
    return ({ name: 'home' })
  } else if ((to.name === 'adminMain' || to.name === 'adminProductAdd' || to.name === 'adminProductEdit' || to.name === 'adminOrderProducts') && (!isAdminLogin || isAdminLogin !== 'admin')) {
    return ({ path: `/en/admin-login`})
  } else if ( (to.name === 'productList' || to.name === 'productDetail' || to.name === 'categories' || to.name === 'top' || to.name === 'bottom' || to.name === 'checkout') && !isLogin ) {
    productStore.logInToContinue = true
    productStore.showAlert = true
    setTimeout(() => {
      productStore.showAlert = false
      productStore.logInToContinue = false
    }, 1000 * 1.5)
    return ({ name: 'login' })

  } else {
    return
  }
})

export default router