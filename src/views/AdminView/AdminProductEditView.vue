<template>
    <div class="product-detail">
        <div class="item-img">
            <img :src="productStore.product.image" alt="product image">
        </div>
        <div class="item-content">
            <form @submit.prevent="updateProduct">
                <label for="name">Name</label>
                <input v-model="productStore.product.name" name="name">

                <label for="brand">Brand</label>
                <input v-model="productStore.product.brand" name="brand">

                <label for="price">Price</label>
                <input v-model="productStore.product.price" name="price">

                <label for="color">Color</label>
                <input v-model="productStore.product.color" name="color">

                <label for="image">Image Url</label>
                <input v-model="productStore.product.image" name="image">

                <label for="details">Details</label>
                <textarea 
                    v-model="productStore.product.details" 
                    name="details"
                    cols="40" rows="20"
                    ></textarea>

                <button>{{ $t('update') }}</button>
            </form>
        </div>
    </div>  
</template>

<script setup lang="ts">
    import router from '@/router';
    import { useProductStore } from '@/stores/product'
    import { ref, onMounted } from 'vue';
    import { useRoute } from 'vue-router';

    const route = useRoute()

    const productStore = useProductStore()
    const productId = route.params.id

    const updateProduct = () => {
        productStore.updateProduct(productId as string)
        router.push({ path: '/en/admin-main' })
    }
        
    onMounted(() => {
        productStore.fetchProduct(productId)
    })

</script>

<style scoped lang="scss">
.product-detail {
    display: flex;
    width: 90%;
    margin: 1rem auto;
    .item-img {
        width: 55%;
        > img {
            width: 95%;
            border-radius: 5px;
        }        
    }
    .item-content {
        width: 40%;
        > form {
            > label {
                display: block;
                font-size: 1.2rem;
                color: var(--font);
            }
            > input {
                margin: 0.1rem auto 2rem auto;
                border: none;
                border-bottom: 3px dotted var(--dark);
                width: 100%;
                background: var(--light);
                font-size: 1rem;
                color: var(--font);
            }
            > textarea {
                margin: 1rem auto;
                padding: 1rem;
                border: 3px dotted var(--dark);
                width: 100%;
                background: var(--light);
                font-size: 1.2rem;
                color: var(--font);
            }
            > input:focus, > textarea:focus {
                outline: none;
                caret-color: var(--dark);
            }
            > button {
                margin: 1rem 0;
                padding: 0.5rem;
                width: 100%;
                color: var(--dark);
                background: var(--light);
                border: 1px solid var(--dark);
                border-radius: 5px;
                font-size: 1rem;
                cursor: pointer;
            }
        }
    }
}

@media (max-width: 767px) {
    .product-detail {
        display: block;
        width: 100%;
        margin: 0 0.5rem;
        .item-img {
            width: 100%;
            > img {
                width: 100%;
                border-radius: 5px;
            }        
        }
        .item-content {
            margin-top: 1rem;
            width: 90%;
            > form {
                > input {
                    margin: 0.5rem auto 1rem auto;
                }
                > textarea {
                    width: 90%;
                    background: var(--light);
                    font-size: 1.2rem;
                    color: var(--font);
                }
            }
        }
    }
}
</style>
