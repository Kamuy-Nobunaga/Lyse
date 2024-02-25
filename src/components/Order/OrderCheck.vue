<template>
    <div class="order-check">
        <p>Order received!</p>
        <p>Items will be delivered in 5 working days.</p>
        <button @click="keepShopping">Keep shopping!</button>
    </div>
</template>
<script setup lang="ts">
    import { onMounted } from 'vue';
    import { useProductStore } from '@/stores/product';
    import { useRoute, useRouter } from 'vue-router';
    import { useI18n } from 'vue-i18n';



    const productStore = useProductStore()
    const route = useRoute()
    const router = useRouter()
    const { locale } = useI18n()


    onMounted(() => {
        productStore.fetchProducts()
        productStore.checkoutProgress = 3
        locale.value = route.params.locale
    })

    const keepShopping = () => {
        productStore.checkoutProgress = 1
        router.push({ path: `/${locale.value}`})
    }


</script>
<style scoped lang="scss">
.order-check {
    text-align: center;
    height: 80dvh;
    > p {
        font-size: 2rem;
        color: var(--font);
    }
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
</style>