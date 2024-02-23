<template>
    <div class="order-info">
        <div class="checkout-price">
            <p>Total price: NT$ 12800</p>
        </div>
        <div class="user-info">
            <h3>Customer Information</h3>
            <form>
                <label for="name">Name</label>
                <input type="text" name="name" v-model="customerInfo.name" required>
                <label for="email">Email</label>
                <input type="text" name="email" v-model="customerInfo.email" required>
                <label for="phone">Phone</label>
                <input type="text" name="phone" v-model="customerInfo.phone" required>
            </form>
        </div>
        <div class="delivery-info">
            <h3>Delivery Information</h3>
            <form>
                <label for="name">Name</label>
                <input type="text" name="name" v-model="deliveryInfo.name" required>
                <label for="phone">Phone</label>
                <input type="text" name="phone" v-model="deliveryInfo.phone" required>
                <label for="address">Address</label>
                <input type="text" name="address" v-model="deliveryInfo.address" required>    
            </form>
        </div>
        <div class="notice">
            <p>Please check if all information is correct before processing to next step.</p>
        </div>
        <div class="foward-and-next">
            <button @click="processToShopCart">Foward</button>
            <button @click="processToOrderCheck">Next</button>
        </div>
    </div>
</template>
<script setup lang="ts">
    import { onMounted, reactive } from 'vue';
    import { useProductStore } from '../stores/product';

    const productStore = useProductStore()

    onMounted(() => {
        productStore.fetchProducts()
        productStore.checkoutProgress = 2
    })

    const customerInfo = reactive({
        name: '', 
        email: '', 
        phone: ''
    })
    const deliveryInfo = reactive({
        name: '', 
        phone: '', 
        address: ''
    })


    const processToShopCart = () => {
        productStore.checkoutProgress = 1
    }
    const processToOrderCheck = () => {
        productStore.checkoutProgress = 3
    }

</script>
<style scoped lang="scss">
.order-info {
    margin-top: 1rem;
    text-align: center;
    .checkout-price {
        margin: 0 auto;
        padding: 0.1rem;
        background: var(--dark);
        width: 30%;
        border-radius: 10px;
        > p {
            color: var(--light);
            font-size: 1.5rem;
        }
    }
    .user-info, .delivery-info {
        margin: 1rem auto;
        width: 35%;
        border: 1px solid var(--dark);
        > h3 {
            font-size: 1.5rem;
        }
        > form {
            margin: 1rem;
            text-align: left;
            > label {
                display: block;
            }
            > input {
                width: 90%;
                margin: 0.5rem auto;
                padding: 0.5rem;
                border: none;
                border-bottom: 1px dotted var(--dark);
                background: var(--light);
                font-size: 1rem;
                
            }
            > input:focus {
                outline: none;
            }
        }
    }
    .delivery-info {
        > h3 {

        }
        > form {
            > label {

            }
            > input {
                
            }
        }
    }
    .notice {
        margin: 0 auto 1rem auto;
        padding: 0.1rem;
        width: 30%;
        border-radius: 10px;
        > p {
            color: var(--dark);
            font-size: 1.5rem;
        }
    }
    .foward-and-next {
        > button {
            margin-right: 1rem;
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