<script setup lang="ts">
  import Navbar from './components/Navbar.vue'
  import Footer from './components/Footer.vue'
</script>

<template>
  <div class="ecommerce-page">
    <Navbar />
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
  --error: rgb(211, 47, 47);
  --font-family: 'Roboto', sans-serif;
}
.ecommerce-page {
  margin: 0 auto;
  background: var(--light);
  width: 100%;
}
</style>
