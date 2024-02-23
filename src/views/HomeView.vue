<template>
  <div class="banner">
    <img src="../assets/banner.jpg" alt="">
  </div>
  <h2>Style Redefined, Daily.</h2>
    <div class="random-products" >  
      <div class="random-top" @click="handleClick(randomTop)">
        <img :src="randomTop.image" alt="">
        <div class="product-details">
          <p>{{ randomTop.brand }} - {{ randomTop.name }} - {{ randomTop.color }}</p>
        </div>
      </div>  
      <div class="random-bottom" @click="handleClick(randomBottom)">
        <img :src="randomBottom.image" alt="">
        <div class="product-details">
          <p>{{ randomBottom.brand }} - {{ randomBottom.name }} - {{ randomBottom.color }}</p>
        </div>
      </div>  

    </div> 

    <ShopcartSmall />
</template>

<script setup lang="ts">
  import { useRoute, useRouter } from 'vue-router';
  import { ref, onMounted } from 'vue';
  import { useProductStore } from '@/stores/product';
  import { type TProduct2 } from '../types/ProductType'
  import { useI18n } from 'vue-i18n';
  import ShopcartSmall from '../components/ShopcartSmall.vue'






  const route = useRoute()
  const router = useRouter()
  const productStore = useProductStore()
  const { locale } = useI18n()
  const randomTop = ref({})
  const randomBottom = ref({})

  
  const user = localStorage.getItem('user')
  productStore.fetchCartItems(user)

  onMounted(async () => {
    await productStore.fetchProducts()
    const tops = productStore.getTop()
    const bottoms = productStore.getBottom()
    const randomIndex = Math.floor(Math.random()* tops.length)
    randomTop.value = tops[randomIndex]
    randomBottom.value = bottoms[randomIndex]     
  })

  const handleClick: Function = (product: TProduct2) => {
        console.log(product);
        const { id } = product        
        router.push({ path: `/${locale.value}/productList/${id}` })
    }



  

</script>

<style lang="scss" scoped>
.banner {
  margin-top: 1rem;
  > img {
    width: 100%;
  }
}
h2 {
  text-align: center;
  color: var(--font);
  font-size: 3rem;
}
.random-products {
  display: flex;
  
  .random-top {
    margin-left: 1rem;
    width: 50%;
    > img {
      width: 90%
    } 
    .product-details {
      > p {
        font-size: 1rem;
      }
    } 
  }
  .random-bottom {
      margin-left: 1rem;
      width: 50%;
    > img {
      width: 90%
    } 
    .product-details {
      > p {
        font-size: 1rem;
      }
    } 
  }

}

</style>