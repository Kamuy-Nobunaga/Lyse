<template>
    <div>
        <CheckoutProgress />
        <ShopcartSmall v-if="productStore.checkoutProgress === 1">
            <template v-slot:next-button >
                <button @click="processToOrderInfo">Next</button>
            </template>

        </ShopcartSmall>
        <OrderInfo v-if="productStore.checkoutProgress === 2" />
        <OrderCheck v-if="productStore.checkoutProgress === 3" />
    </div>
</template>
<script setup lang="ts">
    import CheckoutProgress from '@/components/Order/CheckoutProgress.vue'
    import ShopcartSmall from '@/components/ShopcartSmall.vue'
    import OrderInfo from '@/components/Order/OrderInfo.vue'
    import OrderCheck from '@/components/Order/OrderCheck.vue'
    import { useProductStore } from '@/stores/product';
    import { onMounted } from 'vue';

    const productStore = useProductStore() 
    onMounted(() => {
        productStore.cartWithLargePage = true  
    })


    const processToOrderInfo = () => {
        productStore.checkoutProgress = 2
    }


</script>
<style scoped lang="scss">
div {
    > button {
        margin: 1rem 0;
        padding: 0.5rem;
        width: 30%;
        color: var(--dark);
        background: var(--light);
        border: 1px solid var(--dark);
        border-radius: 5px;
        font-size: 1rem;
    }
    > button:hover {
        color: var(--light);
        background: var(--dark);
    }
}

@media (max-width: 767px) {
    > button {
        margin: 1rem 0;
        padding: 0.5rem;
        font-size: 0.8rem;
    }
}    
</style>