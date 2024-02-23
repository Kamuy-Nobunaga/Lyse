<script setup lang="ts">
    import { type TProduct2 } from '../types/ProductType'
    import { useProductStore } from '../stores/product';
    import { onMounted } from 'vue';
    import { useI18n } from 'vue-i18n';
    import { useRoute, useRouter } from 'vue-router';

    const route = useRoute()
    const router = useRouter()


    const productStore = useProductStore()
    const { locale } = useI18n()
    
    // const selectedLanguage = localStorage.getItem('selectedLanguage') || navigator.language

    onMounted(() => {
        productStore.fetchProducts()
        locale.value = route.params.locale
    })
    
    
    const handleClick: Function = (product: TProduct2) => {
        console.log(product);
        const { id } = product
        router.push({ path: `/productList/${id}` })
    }

</script>

<template>
<div class="header">
    <h2>Top</h2>
    <p>Shop the best in shirts, t-shirts, sweatshirts, jumpers, cardigans and tops with Glasgow based quality independent mens store Lyse.</p>
</div>
<div class="products">
    <div class="product" v-for="product in productStore.getTop()" :key="product.id" @click="handleClick(product)">
        <img :src="product.image ? product.image : 'https://fakeimg.pl/350x200/?text=Hello'">
        <div class="product-details">
            <div class="product-brand">
                {{ product.brand }}
            </div>
            <div class="product-name">{{ product.brand }} - {{ product.name }} - {{ product.color }}</div>
            <div class="product-price">{{ $t('price', { price: product.price }) }}</div>
        </div>
    </div>
    
</div>
</template>
<style scoped lang="scss">
.header {
    margin: 0 auto;
    text-align: center;
    width: 40%;
    h2 {
        display: block;
        color: var(--font);
        font-size: 2rem;
        margin-bottom: 0;
    }
    p {
        margin-bottom: 3rem;
    }
}
.products {
    width: 90%;
    margin: 1rem auto;
    padding: 10px;
    box-sizing: border-box;
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 10px;
    cursor: pointer;
    .product {
        margin-bottom: 1rem;
        width: 90%;
        box-shadow: 5px 2px 5px grey;
        border-radius: 5px;
        > img {
        overflow: hidden;
        width: 100%;
        }
        .product-details {
            text-align: center;            
            padding: 5px;
            font-size: 10px;
            line-height: 1.5rem;
            .product-brand {
                margin: 0.3rem;
                font-size: 0.8rem;
            }
            .product-name {
                width: 90%;
                margin: 0 auto;
                font-size: 1rem;
            }
            .product-price {
                font-size: 0.8rem;
            }
        }
    }
}
    
</style>
