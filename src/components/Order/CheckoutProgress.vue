<template>
    <div class="checkout-progess">
        <div class="cart" :class="(productStore.checkoutProgress === 1) ? 'progress' : ''">
            <span>Shopping Cart</span>
        </div>
        <span>-----------</span>
        <div class="info" :class="(productStore.checkoutProgress === 2) ? 'progress' : ''">
            <span>Information</span>
        </div>
        <span>-----------</span>
        <div class="final-check" :class="(productStore.checkoutProgress === 3) ? 'progress' : ''">
            <span>Order check</span>
        </div>
    </div>
</template>
<script setup lang="ts">
    import { onMounted } from 'vue';
    import { useProductStore } from '@/stores/product';

    const productStore = useProductStore()

    onMounted(() => {
        productStore.fetchProducts( )
    })

</script>
<style scoped lang="scss">
.checkout-progess {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    > span {
        color: var(--dark);

    }
    .cart {
        margin-bottom: 1.5rem;
        > span {
            padding: 1rem;
            width: 100%;
            border-radius: 10%;
            text-align: center;
            background: var(--light);
            color: var(--dark);
            font-weight: bolder;

        }
    }
    .info {
        > span {
            padding: 1rem;
            width: 100%;
            border-radius: 10%;
            text-align: center;
            background: var(--light);
            color: var(--dark);
            font-weight: bolder;

        }
    }
    .final-check {
        > span {
            padding: 1rem;
            width: 100%;
            border-radius: 10%;
            text-align: center;
            background: var(--light);
            color: var(--dark);
            font-weight: bolder;

        }
    }
    .progress {
        > span {
            background: var(--dark);
            color: var(--light);
            font-size: 1.5rem;
        }
    }
}

@media (max-width: 767px) {
    .checkout-progess {
        justify-content: space-around;
        .cart {
            > span {
                padding: 0.3rem;
                border-radius: 3%;
                font-weight: normal;
                font-size: 0.5rem;
            }
        }
        .info {
            > span {
                padding: 0.3rem;
                border-radius: 3%;
                font-weight: normal;
                font-size: 0.5rem;
            }
        }
        .final-check {
            > span {
                padding: 0.3rem;
                border-radius: 3%;
                font-weight: normal;
                font-size: 0.5rem;
            }
        }
        .progress {
            > span {
                background: var(--dark);
                color: var(--light);
                font-size: 0.8rem;
            }
        }
    }

}
</style>