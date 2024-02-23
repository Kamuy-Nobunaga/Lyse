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

<style lang="scss">
:root {
  --dark: #bf754b;
  --light: #d9c0a3;
  --lightest: #eaeaea;
  --font: #260101;
  --font-family: 'Roboto', sans-serif;
}
.products-page {
  margin: 0 auto;
  background: var(--light);
  width: 100%;
}
</style>
