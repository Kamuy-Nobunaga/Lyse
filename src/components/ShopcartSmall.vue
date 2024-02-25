<template>
    <div class="shopcart-items">
        <slot name="header">
        </slot>
        
        <table>
            <slot name="table-header"></slot>
            <tbody class="shopcart-item" v-for="(item, key) in productStore.cartItems" :key="key">
                <tr>
                    <th scope="row" v-if="item.imgUrl"><img :src="item.imgUrl" alt=""></th>
                    <td class="item-name" v-if="item.brand">{{ item.brand }} - {{ item.name }} - {{ item.color }}</td>
                    <td class="item-price-size-amounts" v-if="item.price && item.size && item.amounts">
                        <span class="item-price">NT$ {{ item.price }}</span><br>
                        <span class="item-size">{{ item.size }}</span><br>
                        <span class="item-amounts"><el-icon @click="minusNum(key, item, item.size)"><Minus /></el-icon>{{ item.amounts }}<el-icon @click="addNum(key, item, item.size)"><Plus /></el-icon></span>
                    </td>
                    <td class="item-delete" v-if="item.amounts"><el-icon @click="deleteItem(key)"><Delete /></el-icon></td>
                </tr>
            </tbody>
        </table>
        <div class="total-price">
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
    const user = localStorage.getItem('user') 

    const totalPriceAfterFetch = computed(() => {
        return productStore.getTotalPriceAfterFetch;
    });


    const deleteItem = (key: string | null) => {
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
        width: 90%;
        margin: 0 auto;
        text-align: center;
        > table {
            width: 100%;
            .shopcart-item {
                > tr {
                    > th {
                        width: 30%;
                        > img {
                            width: 80%;
                            border-radius: 10px;
                        }
                    }
                    > td {
                        font-size: 1.2rem; 
                        .el-icon {
                            cursor: pointer;
                        }
                    }
                    .item-name {
                        width: 30%;
                        font-size: 0.8rem;
                        line-height: 1.2rem; 
                    }
                    .item-price-size-amounts {
                        width: 30%;
                        font-size: 0.8rem;
                        padding-left: 1rem;
                        .item-price {

                        }
                        .item-size {
                            font-size: 0.6rem;
                        }
                        .item-amounts {
                            .el-icon {
                                font-size: 0.6rem;
                                padding: 0 5px;
                            }
                        }
                    }
                }
                // > h2 {
                //     width: 100%;
                //     text-align: center;
                // }

            }
        }
        .total-price {
            > p {
                > span {
                    font-weight: bolder;
                }
            }
        }
    }

@media (max-width: 767px) {
    .shopcart-items {
        width: 95%;
        margin: 0 auto;
        > table {
            .shopcart-item {
                > tr {
                    > th {
                        > img {
                            width: 80%;
                            border-radius: 3px;
                        }
                    }
                    > td {
                        font-size: 0.5rem; 
                        .el-icon {
                            cursor: pointer;
                            margin: 0;
                        }
                    }
                    .item-name {
                        width: 10%;
                        font-size: 0.6rem;
                        line-height: 1rem; 
                    }
                    .item-price-size-amounts {
                        font-size: 0.6rem;
                    }

                }
            }
        }
    }
}
</style>