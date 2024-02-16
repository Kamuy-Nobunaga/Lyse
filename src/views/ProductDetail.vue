<template>
    <div class="product-detail">
        <div class="item-img">
            <img :src="item.images" alt="product image">
        </div>
        <div class="item-content">
            <div class="item-name">{{ item.title }}</div>
            <div class="item-price">{{ $t('price', { price: item.price }) }}</div>
            <el-input-number v-model="num" :min="1" :max="10" />
            <el-button>{{ $t('addToShopCart') }}</el-button>
            
        </div>
    </div>    
</template>

<script setup lang="ts">
    import { useProductStore } from '@/stores/product'
    import { computed, ref } from 'vue';
    import { useRoute } from 'vue-router';

    const route = useRoute()
    const num = ref(1)

    const productStore = useProductStore()
    productStore.fetchProductList()
    
    const item = computed(() => {
        const productId = route.params.id
        return productStore.getProductDetail(parseInt(productId as string))
    })

</script>

<style scoped lang="scss">
.product-detail {
    display: flex;
    width: 90%;
    margin: 1rem auto;
    .item-img {
        width: 45%;
        > img {
            width: 90%;
            border-radius: 5px;
        }        
    }
    .item-content {
        width: 45%;
        .item-name {
            font-size: 1.5rem;
        }
        .item-price {
            margin-top: 1rem;
            font-size: 1rem;
            font-weight: bolder;
        }
        .el-input-number {
            margin: 1rem 1rem 0 0;
        }
    }
}
</style>
