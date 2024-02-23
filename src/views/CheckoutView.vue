<template>
    <div>
        <CheckoutProgress />
        <Shopcart v-if="productStore.checkoutProgress === 1" />
        <OrderInfo v-if="productStore.checkoutProgress === 2" />
        <OrderCheck v-if="productStore.checkoutProgress === 3" />
    </div>
</template>
<script setup lang="ts">
    import CheckoutProgress from '../components/CheckoutProgress.vue'
    import Shopcart from '../components/Shopcart.vue'
    import OrderInfo from '../components/OrderInfo.vue'
    import OrderCheck from '../components/OrderCheck.vue'
    
    import { useProductStore } from '../stores/product';

    const productStore = useProductStore()

</script>
<style scoped lang="scss">
    
</style>