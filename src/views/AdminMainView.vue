<template>
    <h1>Welcome back, let's get started!</h1>
    <SideBar />
    <AllProducts v-if="productStore.adminAll" />
    <TopProducts v-if="productStore.adminTop" />
    <BottomProducts v-if="productStore.adminBottom" />


</template>
<script setup lang="ts">
    import { ref } from 'vue';
    import { useI18n } from 'vue-i18n'
    import { useProductStore } from '@/stores/product'
    import { useRoute, useRouter } from 'vue-router';
    import SideBar from '../components/AdminSideBar.vue'
    import AllProducts from '../components/AdminAllProducts.vue'
    import TopProducts from '../components/AdminTopProducts.vue'
    import BottomProducts from '../components/AdminBottomProducts.vue'
    import { onMounted } from 'vue';

    const route = useRoute()
    const router = useRouter()

    const { locale } = useI18n()
    const productStore = useProductStore()

    onMounted(() => {
        locale.value = route.params.locale
        productStore.adminAll = true
    })

</script>

<style lang="scss" scoped>
 h1 {
    text-align: center;
 }
</style>