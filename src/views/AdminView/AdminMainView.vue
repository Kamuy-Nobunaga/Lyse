<template>
    <h1>{{ $t('adminTitle') }}</h1>
    <SideBar />
    <AllProducts v-if="productStore.adminAll" />
    <TopProducts v-if="productStore.adminTop" />
    <BottomProducts v-if="productStore.adminBottom" />
    <Orders v-if="productStore.adminOrders" />
    <Reviews v-if="productStore.adminReviews" />
    <ShopSetting v-if="productStore.adminShopSetting" />
</template>
<script setup lang="ts">
    import { useI18n } from 'vue-i18n'
    import { useProductStore } from '@/stores/product'
    import { useRoute, useRouter } from 'vue-router';
    import { onMounted } from 'vue';
    import SideBar from '@/components/Admin/AdminSideBar.vue'
    import AllProducts from '@/components/Admin/AdminAllProducts.vue'
    import TopProducts from '@/components/Admin/AdminTopProducts.vue'
    import BottomProducts from '@/components/Admin/AdminBottomProducts.vue'
    import Orders from '@/components/Admin/AdminOrders.vue'
    import Reviews from '@/components/Admin/AdminReviews.vue'
    import ShopSetting from '@/components/Admin/AdminShopSetting.vue'
    

    const route = useRoute()
    const router = useRouter()

    const { locale } = useI18n()
    const productStore = useProductStore()

    onMounted(() => {
        productStore.adminOrders = true
    })

</script>

<style lang="scss" scoped>
 h1 {
    text-align: center;
 }
</style>