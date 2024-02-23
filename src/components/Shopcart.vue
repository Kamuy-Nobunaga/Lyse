<template>
    <div class="shopcart-items">
        <table>
            <thead>
                <tr>
                    <th scope="col">Image</th>
                    <th scope="col">Name</th>
                    <th scope="col">Price/Item</th>
                    <th scope="col">Amounts</th>
                    <th scope="col">Price</th>
                    <th scope="col">Remove</th>
                </tr>
            </thead>
            <tbody v-for="product in productStore.products2" :key="product.id">
                <td><img :src="product.image"></td>
                <td>{{ product.name }}</td>
                <td>{{ product.image }}</td>
                <td>{{ product.id }}</td>
                <td>{{ product.name }}</td>
                <td>{{ product.name }}</td>
            </tbody>
        </table>
        <div class="total-and-next">
            <div class="total-price">
                <p>Total price:</p>
                <p>NT$ 12800</p>
            </div>
            <button @click="processToOrderInfo">Next</button>
        </div>
    </div>
</template>
<script setup lang="ts">
    import { onMounted } from 'vue';
    import { useProductStore } from '../stores/product';

    const productStore = useProductStore()

    onMounted(() => {
        productStore.fetchProducts()
        productStore.checkoutProgress = 1
    })

    const processToOrderInfo = () => {
        productStore.checkoutProgress = 2
    }

</script>
<style scoped lang="scss">
    .shopcart-items {
        width: 90%;
        margin: 0 auto;
        > table {
            border-collapse: collapse;
            color: var(--font);
            // border: 1px solid #000000;
            > thead {
                > tr {
                    > th {
                        padding: 1.5rem;
                        // border: 1px solid var(--dark);
                    }
                }
            }
            > tbody {
                > td {
                    width: 100%;
                    > img {
                        width: 95%;
                        padding-top: 5px;
                    }
                }
            }
        }
        .total-and-next {
            margin: 1rem auto;
            text-align: center;
            .total-price {
                > p {
                    display: inline-block;
                    margin-right: 1rem;
                    color: var(--font);
                    font-size: 1.5rem;
                    font-weight: bold;
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
    }
</style>