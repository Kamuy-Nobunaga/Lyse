<script setup lang="ts">
    import { type IProduct } from '../types/ProductType'
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
        productStore.fetchProductList()
        locale.value = route.params.locale
    })

    const handleClick: Function = (product: IProduct) => {
        console.log(product);
        
        const { id } = product
        router.push({ path: `/productList/${id}` })
    }

</script>

<template>
<div class="products">
    <div class="product" v-for="product in productStore.products" :key="product.id" @click="handleClick(product)">
        <img :src="product.images ? product.images : 'https://fakeimg.pl/350x200/?text=Hello'">
        <div class="product-details">
            <div class="product-name">{{ product.title }}</div>
            <div class="product-price">{{ $t('price', { price: product.price }) }}</div>
        </div>
        <h1>{{ $t('price') }}</h1>
    </div>
    
</div>
</template>
<style scoped lang="scss">
.products {
width: 100%;
padding: 10px;
box-sizing: border-box;
display: grid;
grid-template-columns: repeat(3, minmax(0, 1fr));
gap: 10px;
.product {
    box-shadow: 5px 2px 5px grey;
    > img {
    overflow: hidden;
    width: 100%;
    }
    .product-details {
    display: flex;
    padding: 5px;
    font-size: 10px;
    justify-content: space-between;
    .product-name {
        width: 50%;
    }
    }
}
}
    
</style>
