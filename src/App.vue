<script setup lang="ts">
  import Banner from './components/Banner.vue'
  import Footer from './components/Footer.vue'
</script>

<template>
  <div class="products-page">
    <Banner />
    <RouterView />  
    <Footer />
  </div>  
</template>

<style scoped lang="scss">
//seems that online pics are not adjustable

.products-page {
  margin: 0 auto;
  background: #d9c0a3;
  width: 80%;
}
</style>
