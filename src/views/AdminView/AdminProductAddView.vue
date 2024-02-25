<template>
    <div class="add-product">
        <div class="header">
            <el-icon @click="goBack"><ArrowLeft /></el-icon>
            <h1>Add A Product</h1>
        </div>
        <div class="product-content">
            <form @submit.prevent="addProduct">
                <label for="name">Name</label>
                <input v-model="productForm.name" name="name">

                <label for="brand">Brand</label>
                <input v-model="productForm.brand" name="brand">

                <label for="price">Price</label>
                <input v-model="productForm.price" name="price">

                <label for="color">Color</label>
                <input v-model="productForm.color" name="color">

                <label for="image">Image Url</label>
                <input v-model="productForm.image" name="image">

                <label for="categories">Categories</label>
                <input v-model="productForm.categories" name="categories" list="categories">
                <datalist id="categories">
                    <option value="top">top</option>
                    <option value="bottom">bottom</option>
                </datalist>

                <label for="details">Details</label>
                <textarea 
                    v-model="productForm.details" 
                    name="details"
                    cols="40" rows="20"
                    ></textarea>

                <button>{{ $t('add') }}</button>
            </form>
        </div>
    </div>  
</template>

<script setup lang="ts">
    import { useProductStore } from '@/stores/product'
    import { reactive, onMounted } from 'vue';
    import { useRouter } from 'vue-router';
    import { ArrowLeft } from '@element-plus/icons-vue'

    const router = useRouter()

    const productStore = useProductStore()
    const productForm = reactive({
        name: '', 
        brand: '', 
        price: null, 
        color: '', 
        image: '', 
        details: '', 
        categories: ''

    })

    const addProduct = () => {
        productStore.addProduct(productForm)
        router.push({ path: '/en/admin-main' })
    }
    const goBack = () => {
        router.go(-1)
    }
        
    onMounted(() => {
        
    })

</script>

<style scoped lang="scss">
.add-product {
    text-align: center;
    .header {
        .el-icon {
            font-size: 1.5rem;
            cursor: pointer;
        }
        .el-icon:hover {
            font-size: 3rem;
        }
    }
    .product-content {
        text-align: left;
        width: 40%;
        margin: 0 auto;
        > form {
            > label {
                display: block;
                font-size: 1.2rem;
                color: var(--font);
            }
            > input {
                margin: 1rem auto 2rem auto;
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
    .add-product {
        .header {
            > h1 {
                font-size: 1.5rem;
            }
        }
        .product-content {
            width: 80%;
            > form {
                > label {
                    font-size: 1rem;
                }
                > input {
                    margin: 1rem auto;
                }
                > textarea {
                    width: 90%;
                }
                > input:focus, > textarea:focus {
                    outline: none;
                    caret-color: var(--dark);
                }
            }
        }
    }

}
</style>
