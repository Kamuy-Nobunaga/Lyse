<template>
    <div class="admin-orders">
        <h2>Orders</h2>
        <table>
            <thead>
                <tr>                    
                    <th>Customer Name</th>
                    <th>Email</th>
                    <th>Customer Phone Number</th>
                    <th>Delivery Name</th>
                    <th>Delivery Phone Number</th>
                    <th>Address</th>
                    <th>Order Status</th>
                    <th class="order-details">Order Details</th>
                </tr>
            </thead>
            <tbody class="orders" v-for="(users, keyUser) in productStore.allOrders" :key="keyUser">
                <tr class="order" v-for="(order, keyOrder) in users" :key="keyOrder">
                    <td>{{ order.nameCustomer }}<span v-if="!order.nameCustomer">info missing</span></td>
                    <td>{{ order.email }}<span v-if="!order.email">info missing</span></td>
                    <td>{{ order.phoneCustomer }}<span v-if="!order.phoneCustomer">info missing</span></td>
                    <td>{{ order.nameDelivery }}<span v-if="!order.nameDelivery">info missing</span></td>
                    <td>{{ order.phoneDelivery }}<span v-if="!order.phoneDelivery">info missing</span></td>
                    <td>{{ order.address }}<span v-if="!order.address">info missing</span></td>
                    <td>
                        <span v-if="order.status === undefined">info missing</span>
                        <span v-if="order.status" class="order-completed">completed</span>
                        <span v-if="order.status === false" class="order-progressing">progressing</span>
                    </td>
                    <td><el-icon @click="goToOrder(keyUser, keyOrder)"><Document /></el-icon></td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script lang="ts" setup>
    import { useProductStore } from '@/stores/product'
    import { onMounted } from 'vue';
    import { Document } from '@element-plus/icons-vue';
    import { useRouter } from 'vue-router';
    import { useI18n } from 'vue-i18n'



    const productStore = useProductStore()
    const router = useRouter()
    const { locale } = useI18n()

    const user = localStorage.getItem('user')
    
    const goToOrder = (user: string, order: string) => {
        router.push({ path: `/${locale.value}/admin-order-products/${user}/${order}`})
    }

    onMounted(() => {
        productStore.adminOrders = true
        productStore.fetchCartItems(user)
        productStore.fetchOrders()
        console.log(productStore.allOrders, 123);
    })
//clear order of user after order completed //show completed rather than clear order
//clear cart items after submitting the order
</script>

<style lang="scss" scoped>
    .admin-orders {
        text-align: center;
        color: var(--font);
        height: 200dvh;
        > h2 {
            font-size: 2rem;
        }
        > table {
            width: 90%;
            margin: 0 auto;
            margin-bottom: 1rem;
            font-size: 1.2rem;
            > thead {
                > tr {
                    > th {
                        padding: 20px;
                    }
                    .order-details {

                    }
                }
            }
            > tbody {
                > tr {
                    > td {
                        padding: 1rem;
                        .el-icon {
                            font-size: 1.5rem;
                        }
                        > span {
                            font-size: 1rem;
                            color: var(--error);
                        }
                        .order-completed {
                            color: var(--font);
                        }
                        .order-progressing {
                            color: var(--font);
                        }
                    }
                }
            }
        }
    }
</style>