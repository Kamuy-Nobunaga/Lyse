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
                    <td class="item-price" v-if="item.price">NT$ {{ item.price }}</td>
                    <td class="item-size" v-if="item.size">{{ item.size }}</td>
                    <td class="item-amounts" v-if="item.amounts"><el-icon @click="minusNum(key, item, item.size)"><Minus /></el-icon>{{ item.amounts }}<el-icon @click="addNum(key, item, item.size)"><Plus /></el-icon></td>
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
        > h3 {
            
        }
        > table {
            width: 100%;
            .shopcart-item {
                > tr {
                    > th {
                        width: 20%;
                        > img {
                            width: 50%;
                            border-radius: 10px;
                        }
                    }
                    > td {
                        font-size: 1.2rem; 
                        .el-icon {
                            cursor: pointer;
                            margin: 10px;
                        }
                    }
                    .item-name {
                        width: 20%;
                        font-size: 1rem;
                        line-height: 1.5rem; 
                    }
                    .item-price {
                        width: 10%;
                        font-size: 1rem;
                        padding-left: 1rem;
                    }
                    .item-size, .item-amounts, .item-delete {
                        width: 10%;
                    }
                }
                > h2 {
                    width: 100%;
                    text-align: center;
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
    }
</style>