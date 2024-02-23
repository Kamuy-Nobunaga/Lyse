<template>
    <div class="navbar">
        <div class="logo-and-login">
            <div></div>
            <img src="../assets/logo-no-background.svg" alt="logo image" @click="toHomePage">
            <div class="user-and-cart">
                <router-link :to="{ path: `/${route.params.locale}/login` }"><el-icon><UserFilled /></el-icon></router-link>
                <el-icon class="cart" @click="productStore.toggleItemAdded"><ShoppingCart /></el-icon>
            </div>
        </div>
        <div class="navbar-items">
            <ul>
                <li>
                    <router-link :to="{ path: `/${route.params.locale}/about` }">{{ $t('about') }}</router-link>
                </li>
                <li>
                    <router-link :to="{ path: `/${route.params.locale}/productList` }">{{ $t('products') }}</router-link>
                </li>
                <li @mouseenter="toggleShowCat" @mouseleave="toggleShowCat">
                    <router-link :to="{ path: `/${route.params.locale}/categories` }">{{ $t('categories') }}<el-icon><ArrowDown /></el-icon></router-link>
                    <div class="top-bottom">
                        <ul v-if="isShowCat">
                            <li>
                                <router-link :to="{ path: `/${route.params.locale}/top` }">{{ $t('top') }}</router-link>
                            </li>
                            <li>
                                <router-link :to="{ path: `/${route.params.locale}/bottom` }">{{ $t('bottom') }}</router-link>
                            </li>
                        </ul>
                    </div>
                </li>
            </ul>
        </div>
    </div> 
</template>

<script setup lang="ts">
    import { useRoute, useRouter } from 'vue-router';
    import { UserFilled, ShoppingCart, ArrowDown } from '@element-plus/icons-vue';
    import { ref } from 'vue';
    import { useProductStore } from '../stores/product'; 


    const route = useRoute()
    const router = useRouter()
    const productStore = useProductStore()

    const isShowCat = ref(false)
    const toggleShowCat = () => {
        isShowCat.value = !isShowCat.value
    }
    const toHomePage = () => {
        router.push({ path: `/${route.params.locale}` })
    }

</script>

<style scoped lang="scss">
.navbar {
    margin-bottom: 3rem;
    .logo-and-login {
        padding: 2rem;
        display: flex;
        justify-content: space-between;
        > img {
        width: 10%;
        cursor: pointer;
        }
        .user-and-cart {
            > a {
                color: var(--font); 
                .el-icon {
                    margin-right: 0.5rem;
                    font-size: 1.5rem; 
                    cursor: pointer;
                }

            }
            .cart {
                    margin-right: 0.5rem;
                    font-size: 1.5rem; 
                    cursor: pointer;
                }
        }  
    }
    .navbar-items {
        text-align: center;
        margin: 0 auto;
        width: 80%;
        > ul {
            display: flex;
            justify-content: space-evenly;
            list-style: none;
            > li {
                > a{
                    font-size: 1.2rem;
                    text-decoration: none;
                    color: var(--font);
                }
                .top-bottom {
                    z-index: 100;
                    > ul {
                        list-style: none;
                        padding: 0;
                        > li {
                            > a {
                                display: block;
                                margin: 1rem;
                                font-size: 1.2rem;
                                text-decoration: none;
                                color: var(--font);
                            }
                        }
                    }
                }
            }
        }
    }
}

</style>