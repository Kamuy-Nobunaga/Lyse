<script setup lang="ts">
    import { type TProduct2 } from '../../types/ProductType';
    import { useProductStore } from '../../stores/product';
    import { onMounted } from 'vue';
    import { useI18n } from 'vue-i18n';
    import { useRoute, useRouter } from 'vue-router';
    import { Delete } from '@element-plus/icons-vue';


    const route = useRoute()
    const router = useRouter()


    const productStore = useProductStore()
    const { locale } = useI18n()
    
    onMounted(() => {
        productStore.fetchProducts()
        productStore.adminBottom = true
    })

    const handleClick: Function = (product: TProduct2) => {
        console.log(product);
        
        const { id } = product
        router.push({ path: `/${locale.value}/admin-product-edit/${id}` })
    } 

    const deleteProduct = (id: string) => {
        productStore.deleteProduct(id)
        productStore.fetchProducts()
    }

</script>

<template>
<div class="header">
    <h2>Bottom</h2>
</div>
<div class="products">
    <div class="product" v-for="product in productStore.getBottom()" :key="product.id" >
        <img :src="product.image ? product.image : 'https://fakeimg.pl/350x200/?text=Hello'" @click="handleClick(product)">
        <div class="product-details">
            <div class="product-brand">
                {{ product.brand }}
            </div>
            <div class="product-name">{{ product.brand }} - {{ product.name }} - {{ product.color }}</div>
            <div class="product-price">{{ $t('price', { price: product.price }) }}</div>
            <div class="product-delete" @click="deleteProduct(product.id as string)"><el-icon><Delete /></el-icon></div>
        </div>
    </div>
    
</div>
</template>
<style scoped lang="scss">
.header {
    margin: 0 auto;
    text-align: center;
    width: 50%;
    h2 {
        display: block;
        color: var(--font);
        font-size: 2rem;
        margin-bottom: 0;
    }
}
.products {
    width: 95%;
    margin: 1rem auto;
    box-sizing: border-box;
    display: grid;
    grid-template-columns: repeat(5, minmax(0, 1fr));
    gap: 5px;
    .product {
        margin-bottom: 1rem;
        width: 90%;
        box-shadow: 5px 2px 5px grey;
        border-radius: 10px;
        > img {
        overflow: hidden;
        width: 100%;
        }
        .product-details {
            text-align: center;            
            padding: 5px;
            font-size: 10px;
            line-height: 1.5rem;
            position: relative;
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
            .product-delete {
                margin: 0.5rem auto;
                position: relative;
                top: 1rem;
                font-size: 1rem;
                color: var(--dark);
            }
            .product-delete:hover {
                font-size: 1.5rem;
            }
        }
    }
}
    
</style>
