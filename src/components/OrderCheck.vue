<template>
    <div class="order-check">
        <p>Order received!</p>
        <p>Items will be delivered in 5 working days.</p>
    </div>
</template>
<script setup lang="ts">
    import { onMounted } from 'vue';
    import { useProductStore } from '../stores/product';

    const productStore = useProductStore()

    onMounted(() => {
        productStore.fetchProducts()
        productStore.checkoutProgress = 3
    })


</script>
<style scoped lang="scss">
.order-check {
    text-align: center;
    height: 80dvh;
    > p {
        font-size: 2rem;
        color: var(--font);
    }
}
</style>