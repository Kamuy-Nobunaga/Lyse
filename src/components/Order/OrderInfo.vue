<template>
    <div class="order-info">
        <div class="checkout-price">
            <p>Total price: NT$ <span>{{ totalPriceAfterFetch }}</span></p>
        </div>
        <div class="user-info">
            <h3>Customer Information</h3>
            <form>
                <label for="name">Name</label>
                <input type="text" name="name" v-model="customerInfo.nameCustomer" required>
                <label for="email">Email</label>
                <input type="email" name="email" v-model="customerInfo.email" required>
                <p v-if="customerInfo.email && 
                    !customerInfo.email.match(regexEmail)">please type in a valid email address</p>
                <label for="phone">Phone (e.g. 0912345678)</label>
                <input type="text" name="phone" v-model="customerInfo.phoneCustomer" required>
                <p v-if="customerInfo.phoneCustomer && !customerInfo.phoneCustomer.match(regexPhone)">please type in a valid Taiwan phone number</p>
            </form>
        </div>
        <div class="delivery-info">
            <h3>Delivery Information</h3>
            <form>
                <label for="name">Name</label>
                <input type="text" name="name" v-model="deliveryInfo.nameDelivery" required>
                <label for="phone">Phone(e.g. 0912345678)</label>
                <input type="text" name="phone" v-model="deliveryInfo.phoneDelivery" required>
                <p v-if="deliveryInfo.phoneDelivery && !deliveryInfo.phoneDelivery.match(regexPhone)">please type in a valid Taiwan phone number</p>

                <label for="address">Address</label>
                <input type="text" name="address" v-model="deliveryInfo.address" required>    
            </form>
        </div>
        <div class="notice">
            <p v-if="!customerInfo.nameCustomer || !customerInfo.email ||
 !customerInfo.phoneCustomer || !deliveryInfo.nameDelivery || !deliveryInfo.address || !deliveryInfo.phoneDelivery">Please check if all information is filled and correct before processing to next step.</p>
        </div>
        <div class="foward-and-next">
            <button @click="processToShopCart">Foward</button>
            <button @click="processToOrderCheck" :disabled="!(customerInfo.nameCustomer && customerInfo.email &&
 customerInfo.phoneCustomer && deliveryInfo.nameDelivery && deliveryInfo.address && deliveryInfo.phoneDelivery)">Pay</button>
        </div>
    </div>
</template>
<script setup lang="ts">
    import { onMounted, reactive, computed } from 'vue';
    import { useProductStore } from '@/stores/product'; 
    

    const productStore = useProductStore()
    const user = localStorage.getItem('user')?.split('.')[0]

    onMounted(() => {
        productStore.fetchCartItems(user)
        productStore.checkoutProgress = 2
    })

    const customerInfo = reactive({
        nameCustomer: '', 
        email: '', 
        phoneCustomer: ''
    })
    const deliveryInfo = reactive({
        nameDelivery: '', 
        phoneDelivery: '', 
        address: ''
    })
    

    const regexEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    const regexPhone = /((?=(09))[0-9]{10})$/g
    const totalPriceAfterFetch = computed(() => {
        return productStore.getTotalPriceAfterFetch;
    });


    const processToShopCart = () => {
        productStore.checkoutProgress = 1
    }
    const processToOrderCheck = () => {
        productStore.addAnOrder(user, customerInfo, deliveryInfo)
        productStore.clearCart(user)
        productStore.checkoutProgress = 3
        customerInfo.nameCustomer = '' 
        customerInfo.email = '' 
        customerInfo.phoneCustomer = ''
        deliveryInfo.nameDelivery = '' 
        deliveryInfo.phoneDelivery = '' 
        deliveryInfo.address = ''
    }

</script>
<style scoped lang="scss">
.order-info {
    margin: 1rem 0;
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
            > span {
                font-weight: bolder;
                text-decoration: underline;
                color: var(--font);
            }
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
            > p {
                font-size: 0.8rem;
            }
        }
    }
    .notice {
        margin: 0 auto 1rem auto;
        padding: 0.1rem;
        width: 30%;
        border-radius: 10px;
        > p {
            color: var(--error);
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

@media (max-width: 767px) {
    .order-info {
        .checkout-price {
            width: 80%;
            > p {
                font-size: 1.2rem;
            }
        }
        .user-info, .delivery-info {
            margin: 1rem auto;
            width: 95%;
            > h3 {
                font-size: 1.2rem;
            }
            > form {
                > input {
                    width: 90%;
                    margin: 0 auto 0.5rem auto;
                }
                > p {
                    margin-top: 0;
                    margin-bottom: 1rem;
                    color: var(--error);
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
                > p {

                }
            }
        }
        .notice {
            width: 90%;
            > p {
                color: var(--error);
                font-size: 0.8rem;
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
}
</style>
