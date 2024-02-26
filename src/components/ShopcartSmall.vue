<template>
    <div class="shopcart-items">
        <slot name="header">
        </slot>
        
        <table>
            <slot name="table-header"></slot>
            <tbody class="shopcart-item" v-for="(item, key) in productStore.cartItems" :key="key" >
                <tr>
                    <th scope="row" v-if="item.imgUrl"><img :src="item.imgUrl" alt="item image"></th>
                    <td class="item-price-amounts" :class="{cartWithLargePage: productStore.cartWithLargePage}" v-if="item.price && item.size && item.amounts">
                        <p class="item-price">NT$ {{ item.price }}</p>
                        <div class="item-amounts" :class="{amountsWithLargePage: productStore.cartWithLargePage}">
                            <el-icon @click="minusNum(key, item, item.size)"><Minus /></el-icon>
                            {{ item.amounts }}
                            <el-icon @click="addNum(key, item, item.size)" :class="{cartWithLargePage: productStore.cartWithLargePage}"><Plus /></el-icon>
                        </div>
                    </td>
                    <!-- <td class="item-name-size" :class="{cartWithLargePage: productStore.cartWithLargePage}" v-if="item.brand">
                        <div class="item-name">{{ item.brand }} - {{ item.name }}</div>
                        <div class="item-size">{{ item.size }}</div>
                    </td> -->
                    <!-- <td class="item-price-amounts" :class="{cartWithLargePage: productStore.cartWithLargePage}" v-if="item.price && item.size && item.amounts">
                        <p class="item-price">NT$ {{ item.price }}</p>
                        <div class="item-amounts" :class="{amountsWithLargePage: productStore.cartWithLargePage}">
                            <el-icon @click="minusNum(key, item, item.size)"><Minus /></el-icon>
                            {{ item.amounts }}
                            <el-icon @click="addNum(key, item, item.size)" :class="{cartWithLargePage: productStore.cartWithLargePage}"><Plus /></el-icon>
                        </div>
                    </td>
                    <td class="item-delete" :class="{cartWithLargePage: productStore.cartWithLargePage}" v-if="item.amounts"><el-icon @click="deleteItem(key)"><Delete /></el-icon></td> -->
                </tr>
                <tr>
                    <td class="item-name-size" :class="{cartWithLargePage: productStore.cartWithLargePage}" v-if="item.brand">
                        <div class="item-name">{{ item.brand }} - {{ item.name }}</div>
                        <div class="item-size">{{ item.size }}</div>
                    </td>
                    <td class="item-delete" :class="{cartWithLargePage: productStore.cartWithLargePage}" v-if="item.amounts"><el-icon @click="deleteItem(key)"><Delete /></el-icon></td>
                </tr>
            </tbody>
        </table>
        <div class="total-price" :class="{cartWithLargePage: productStore.cartWithLargePage}">
            <p>Total price: NT$ <span>{{ totalPriceAfterFetch }}</span></p>
        </div>
        <slot name="next-button"></slot>
    </div>
</template>
<script setup lang="ts">
    import { onMounted, ref, computed } from 'vue';
    import { useProductStore } from '../stores/product'; 
    import { Minus, Plus, Delete } from '@element-plus/icons-vue';
    import type { TCart } from '@/types/ProductType';

    const productStore = useProductStore()    
    const user = localStorage.getItem('user')?.split('.')[0]


    const totalPriceAfterFetch = computed(() => {
        return productStore.getTotalPriceAfterFetch;
    });


    const deleteItem = (key: string) => {
        productStore.deleteCartItem(user, key)
        productStore.fetchCartItems(user)
    }
    
    const addNum = (key: string, item: TCart, size: string) => {
        productStore.addProductNumber(user, key, item, size)
        productStore.fetchCartItems(user)
    }
    const minusNum = (key: string, item: TCart, size: string) => {
        productStore.minusProductNumber(user, key, item, size)
        productStore.fetchCartItems(user)
    }


    onMounted(() => {
        productStore.fetchProducts()
        productStore.fetchCartItems(user)
    })

</script>
<style scoped lang="scss">
    .shopcart-items {
        width: 60%;
        margin: 0 auto;
        text-align: center;
        > table {
            margin: 0 auto;
            .shopcart-item {
                > tr {
                    > th {
                        width: 40%;
                        > img {
                            width: 80%;
                            border-radius: 10px;
                        }
                    }
                    > td {
                        .el-icon {
                            cursor: pointer;
                        }
                    } 

                    .item-name-size {
                        font-size: 0.8rem;
                        .item-name {
                            line-height: 1.5rem; 
                        }
                        .item-size {
                            padding-top: 1rem;
                        }
                    }
                    .item-price-amounts {
                        padding: 20% 0;
                        font-size: 0.8rem;
                        display: flex;
                        flex-direction: column;
                        .item-price {

                        }
                        .item-amounts {
                            font-size: 0.8rem;
                            .el-icon {
                                font-size: 0.8rem;
                                padding: .5rem;
                            }
                        }

                    }
                    .cartWithLargePage {
                        font-size: 1.2rem;
                        .el-icon {
                            font-size: 1.5rem;
                        }
                        .amountsWithLargePage {
                            font-size: 1.5rem;
                        }
                    }
                }
            }
        }
        .total-price {
            > p {
                > span {
                    font-weight: bolder;
                }
            }
        }
        .cartWithLargePage {
            font-size: 2rem;
        }
    }

@media (max-width: 767px) {
    .shopcart-items {
        width: 80%;
        margin: 0 auto;
        text-align: center;
        > table {
            .shopcart-item {
                > tr {
                    > th {
                        width: 60%;
                        > img {
                            width: 80%;
                        }
                    }
                    .item-name-size {
                        .item-size {
                            padding-top: 0rem;
                            padding-bottom: 1rem;
                        }
                    }
                    .cartWithLargePage {
                        font-size: 1rem;
                        .el-icon {
                            font-size: 1.5rem;
                        }
                        .amountsWithLargePage {
                            font-size: 1rem;
                        }
                    }
                }
            }
        }
        .total-price {
            > p {
                > span {
                    font-weight: bolder;
                }
            }
        }
        .cartWithLargePage {
            font-size: 1.2rem;
        }
    }
}
</style>