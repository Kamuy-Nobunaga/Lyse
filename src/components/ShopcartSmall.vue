<template>
    <div class="shopcart-items">
        <h3>Your Cart</h3>
        <table>
            <tbody class="shopcart-item" v-for="(item, key) in productStore.cartItems" :key="key">
                <tr>
                    <th scope="row"><img :src="item.imgUrl" alt=""></th>
                    <td class="item-name">{{ item.brand }} - {{ item.name }} - {{ item.color }}</td>
                    <td class="item-price">NT$ {{ item.price }}</td>
                    <td class="item-size">{{ item.size }}</td>
                    <td class="item-amounts"><el-icon @click="minusNum(key, item, item.size)"><Minus /></el-icon>{{ item.amounts }}<el-icon @click="addNum(key, item, item.size)"><Plus /></el-icon></td>
                    <td class="item-delete"><el-icon @click="deleteItem(key)"><Delete /></el-icon></td>
                </tr>
            </tbody>
        </table>
        <div class="total-price">
            <p>Total price:</p>
            <p>NT$ {{ price }}</p>
        </div>
    </div>
</template>
<script setup lang="ts">
    import { onMounted, ref } from 'vue';
    import { useProductStore } from '../stores/product'; 
    import { Minus, Plus, Delete } from '@element-plus/icons-vue';
    import type { TCart } from '@/types/ProductType';

    // import { computed } from 'vue';

    const productStore = useProductStore()
    const user = localStorage.getItem('user') 
    const price = ref(0)


    // const getTotalPrice = computed(async () => { 
    //    }
    //    return totalPrice.value
    // })

    // console.log(totalPrice.value, 'asdf');
    const deleteItem = (key: string | null) => {
        productStore.deleteCartItem(user, key)
        productStore.fetchCartItems(user)
    }
    
    const addNum = (key: string, item: TCart, size: string) => {
        productStore.addProductAmount(user, key, item, size)
        productStore.fetchCartItems(user)
    }
    const minusNum = (key: string, item: TCart, size: string) => {
        productStore.minusProductAmount(user, key, item, size)
        productStore.fetchCartItems(user)
    }


    onMounted(() => {
        productStore.fetchProducts()
        productStore.fetchCartItems(user)
        // price.value = productStore.getTotalPrice
        console.log(productStore.cartItems, '2ss');
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
            // display: flex;
            // gap: 10px;
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
            }
        }
    }
</style>