<template>
    <div class="product-detail">
        <div class="item-img">
            <img :src="productStore.product.image" alt="product image">
        </div>
        <div class="item-content">
            <div class="item-name">{{ productStore.product.brand }} - {{ productStore.product.name }} - {{ productStore.product.color }}</div>
            <div class="item-brand">{{ productStore.product.brand }}</div>
            <div class="item-price">{{ $t('price', { price: productStore.product.price }) }}</div>
            <div class="item-size">
                <p>Size</p>
                <label for="sizeS">
                    <input type="radio" id="sizeS" value="S" name="size" v-model="size">
                </label>
                <label for="sizeM"><input type="radio" id="sizeM" value="M" name="size" v-model="size"></label>
                
                <label for="sizeL"><input type="radio" id="sizeL" value="L" name="size" v-model="size"></label>
                
                <label for="sizeXl"><input type="radio" id="sizeXl" value="XL" name="size" v-model="size"></label>
                
            </div>

            <button @click="addToCart(productStore.product)">{{ $t('addToShopCart') }}</button>

            <div class="item-details">
                <p>{{ productStore.product.details }}</p>
            </div>
        </div>
    </div>  
    <Dialogue>
        <template v-slot:cart-body>
            <ShopcartSmall />
        </template>
    </Dialogue>  
</template>

<script setup lang="ts">
    import { useProductStore } from '@/stores/product'
    import { ref, onMounted } from 'vue';
    import { useRoute } from 'vue-router';
    import Dialogue from '../components/Dialogue.vue'
    import type { TProduct2 } from '@/types/ProductType'
    import ShopcartSmall from '@/components/ShopcartSmall.vue';


    const route = useRoute()

    const productStore = useProductStore()
    const productId = route.params.id
    const size = ref('') 
    const user = localStorage.getItem('user')
        
    onMounted(() => {
        productStore.fetchProduct(productId as string)
    })

    const addToCart = (product: TProduct2) => {
        productStore.addCartItem(user, product, size.value)
        productStore.fetchCartItems(user)
    }

</script>

<style scoped lang="scss">
.product-detail {
    display: flex;
    width: 90%;
    margin: 1rem auto;
    .item-img {
        width: 55%;
        > img {
            width: 95%;
            border-radius: 5px;
        }        
    }
    .item-content {
        width: 40%;
        .item-name {
            font-size: 1.5rem;
        }
        .item-brand {
            margin-top: 0.5rem;
        }
        .item-price {
            margin: 1.5rem 0;
            font-size: 1.2rem;
            font-weight: bolder;
        }
        .item-size {
            margin: 2rem 0;
            > p {
                margin: 1rem auto 0 auto;
            }
            > label { 
                > input {
                    margin-right: 1rem;
                    appearance: none;
                    padding: 1.2rem;
                    color: var(--dark);
                    background: var(--light);
                    border: 1px solid var(--dark);
                    border-radius: 5px;
                }
                > input:checked {
                    color: var(--light);
                    background-color: var(--dark);
                }
            }
            > label:nth-child(2) {
                > input::before {
                    content: 'S';
                    font-size: 1rem;
                }
            }
            > label:nth-child(3) {
                > input::before {
                    content: 'M';
                    font-size: 1rem;
                }
            }
            > label:nth-child(4) {
                > input::before {
                    content: 'L';
                    font-size: 1rem;
                }
            }
            > label:nth-child(5) {
                > input::before {
                    content: 'XL';
                    font-size: 1rem;
                }
            }
        }
        > button {
            margin: 1rem 0;
            padding: 0.5rem;
            width: 100%;
            color: var(--dark);
            background: var(--light);
            border: 1px solid var(--dark);
            border-radius: 5px;
            font-size: 1rem;
        }
        .item-details {
            color: var(--font);
            line-height: 2rem;
        }
    }
}
.cart-body {
    > img {
        width: 30%;
    }
    > p {
        font-size: 1rem;
    }
}
</style>
