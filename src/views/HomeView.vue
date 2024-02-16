<template>
  <h1>Welcome!</h1>
  <router-link :to="{ path: `/${route.params.locale}/about` }">About</router-link>
  <router-link :to="{ path: `/${route.params.locale}/productList` }">Product List</router-link>
  <router-link :to="{ path: `/${route.params.locale}/login` }">login</router-link>
</template>

<script setup lang="ts">
  import { useRoute, useRouter } from 'vue-router';

  const route = useRoute()
  const router = useRouter()

</script>

<style lang="scss" scoped>
a {
  margin: 0 1rem;
}
</style>