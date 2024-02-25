<template>
    <div>
        <CheckoutProgress />
        <ShopcartSmall v-if="productStore.checkoutProgress === 1">
            <template v-slot:table-header >
                <thead>
                    <tr>
                        <th scope="col">Image</th>
                        <th scope="col">Name</th>
                        <th scope="col">Price per Item/Size/Number</th>
                        <th scope="col">Remove</th>
                    </tr>
                </thead>
            </template>
            <template v-slot:next-button >
                <button @click="processToOrderInfo">Next</button>
            </template>

        </ShopcartSmall>
        <OrderInfo v-if="productStore.checkoutProgress === 2" />
        <OrderCheck v-if="productStore.checkoutProgress === 3" />
    </div>
</template>
<script setup lang="ts">
    import CheckoutProgress from '@/components/Order/CheckoutProgress.vue'
    import ShopcartSmall from '@/components/ShopcartSmall.vue'
    import OrderInfo from '@/components/Order/OrderInfo.vue'
    import OrderCheck from '@/components/Order/OrderCheck.vue'
    
    import { useProductStore } from '@/stores/product';

    const productStore = useProductStore() 

    const processToOrderInfo = () => {
        productStore.checkoutProgress = 2
    }


</script>
<style scoped lang="scss">
div {
    .shopcart-items {
        > table {
            > thead {
                font-size: 0.5rem;
                > tr {
                    > th {
                        padding: 1rem;
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
    .shopcart-items {
        > table {
            > thead {
                font-size: 0.5rem;
                > tr {
                    > th {
                        padding: 0.5rem;
                        width: 10%;

                    }
                }
            }
        }
    }
    > button {
        margin: 1rem 0;
        padding: 0.5rem;
        font-size: 0.8rem;
    }

}    
</style>