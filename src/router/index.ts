import { createRouter, createWebHistory, RouterView } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { useI18n } from 'vue-i18n'
import { useProductStore } from '@/stores/product'


// /:lang(zh|en)?
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/:locale?',
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
          component: () => import('../views/AboutView.vue')
        },
        {
          path: 'productList',
          name: 'productList',
          component: () => import('../views/ProductList.vue'), 
          beforeEnter:( to, from, next ) => {
            const productStore = useProductStore()
            if (productStore.userInfo === 'admin') {
              next()
            } else {
              return next({ name: 'login'})
            }
          }
        },  
        {
          path: 'productList/:id',
          name: 'productDetail',
          component: () => import('../views/ProductDetail.vue')
        }, 
        {
          path: 'login',
          name: 'login',
          component: () => import('../views/LoginView.vue'), 
          beforeEnter:( to, from, next ) => {
            const productStore = useProductStore()
            if (productStore.userInfo === 'admin') {
              next({ name: 'productList'})
            } else {
              return next()
            }
          }

        },
        {
          path: 'admin-login',
          name: 'adminLogin',
          component: () => import('../views/AdminLoginView.vue')
        },
        {
          path: 'admin-main',
          name: 'adminMain',
          component: () => import('../views/AdminMainView.vue')
        },

      ]
    }
  ]
})

// router.beforeEach( to => {
//   const productStore = useProductStore()
//   if(to.fullPath === '/login') return;
//   if(productStore.isLogin === false) {
//     return '/login'
//   }
// })
// router.beforeEach((to) => {
  // let language = to.params.locale
  
  // if(!language) {
  //   language = 'zh'
  // } 
  // const { locale } = useI18n();
  // console.log(language, locale);

  // locale.value = language; 
// })

export default router
