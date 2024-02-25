<template>
    <div class="items-in-order">
        <table>
            <thead>
                <tr>                    
                    <th>Image</th>
                    <th>Name</th>
                    <th>Size</th>
                    <th>Number</th>
                    <th>Price</th>
                    <th class="complete">complete</th>
                </tr>
            </thead>
            <tbody class="item" v-for="(item, keyOrder) in productStore.anOrder" :key="keyOrder">
                <tr class="item-details">
                    <td v-if="item.imgUrl"><img :src="item.imgUrl" alt="item image"><span v-if="!item.imgUrl">info missing</span></td>
                    <td v-if="item.brand || item.brand || item.brand">{{ item.brand }} - {{ item.name }} - {{ item.color }}<span v-if="!item.brand || !item.brand || !item.brand">info missing</span></td>
                    <td v-if="item.size">{{ item.size }}<span v-if="!item.size">info missing</span></td>
                    <td v-if="item.amounts">{{ item.amounts }}<span v-if="!item.amounts">info missing</span></td>
                    <td v-if="item.price">{{ item.price }}<span v-if="!item.price">info missing</span></td>
                    <td v-if="item.name" class="complete">
                        <input type="checkbox">
                        <span class="custom-checkbox custom-checkbox-checked"></span>
                    </td>
                    
                </tr>
            </tbody>
        </table>
        <button @click="updateOrderToCompleted">Order completes</button>
    </div>
</template>

<script lang="ts" setup>
    import { useRoute, useRouter } from 'vue-router';
    import { useProductStore } from '@/stores/product'
    import { onMounted, computed } from 'vue';
    // import { Document } from '@element-plus/icons-vue';
    import { useI18n } from 'vue-i18n'



    const productStore = useProductStore()
    const route = useRoute()

    console.log(route.params);

    const router = useRouter()
    const { locale } = useI18n()

    const user = localStorage.getItem('user')

    const keyUser = computed(() => {
        return route.params.user
    }) 
    const keyOrder = computed(() => {
        return route.params.order
    }) 

    onMounted( () => {
        productStore.fetchOrders()
        productStore.fetchOrder(keyUser.value, keyOrder.value)
        console.log(productStore.anOrder);
        
    })

    const updateOrderToCompleted = () => {
        productStore.updateOrderToCompleted(keyUser.value, keyOrder.value)

        router.push({ path: `/${locale.value}/admin-main`})
    }
//clear order of user after order completed //show completed rather than clear order
//clear cart items after submitting the order



    

</script>

<style lang="scss" scoped>
    .items-in-order {
        width: 90%;
        margin: 0 auto;
        text-align: center;
        height: 80dvh;
        > table {
            > thead {
                > tr {
                    > th {
                        width: (95% / 5);
                    }
                    .complete {
                        width: 5%;
                    }
                }
            }
            > tbody {
                > tr {
                    > td {
                        position: relative;
                        font-size: 1.2rem;
                        > img {
                            width: 50%;
                        }
                    }
                    .complete {
                        > input {
                            position: absolute;
                            top: 40%;
                            left: 50%;
                            transform: scale(3);
                            opacity: 0;
                            cursor: pointer;
                            z-index: 100;
                        }
                        .custom-checkbox {
                            position: absolute;
                            top: 35%;
                            left: 40%;
                            width: 40%;
                            height: 20%;
                            background: var(--dark);
                            border: 1px solid var(--dark);
                            border-radius: 5px;
                        }
                        > input:checked ~ .custom-checkbox::after, > input:hover ~ .custom-checkbox::after {
                            content: 'V';
                            background: var(--light);
                            color: var(--dark);
                            position: absolute;
                            width: 120%;
                            height: 120%;
                            top: -10%;
                            left: -10%;
                            font-size: 2rem;
                        }
                    }
                }
            }
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

@media (max-width: 767px) {
    .items-in-order {
        width: 100%;
        > table {
            > thead {
                > tr {
                    > th {
                        width: (95% / 5);
                        font-size: 0.8rem;
                    }
                    .complete {
                        width: 5%;
                    }
                }
            }
            > tbody {
                > tr {
                    > td {
                        position: relative;
                        font-size: 0.6rem;
                        > img {
                            width: 80%;
                        }
                    }
                }
            }
        }
        > button {
            width: 50%;
        }
    }
}
</style>