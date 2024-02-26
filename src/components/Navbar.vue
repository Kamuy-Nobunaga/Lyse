<template>
    <div class="navbar">
        <div class="logo-and-login">
            <LanguageSelector />
            <img src="../assets/logo-no-background.svg" alt="logo image" @click="toHomePage">
            <div class="user-and-cart">
                <router-link :to="{ path: `/${route.params.locale}/login` }"><el-icon><UserFilled /></el-icon></router-link>
                <!-- logout -->
                <div class="logout-icon" @click="userLogout">
                    <el-icon><Pouring /></el-icon>
                    <span>logout</span>
                    <!-- <el-icon><Umbrella /></el-icon> -->
                </div>
                <el-icon class="cart" @click="productStore.toggleItemAdded" v-if="productStore.showCarAtNav"><ShoppingCart /></el-icon>
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
    import { UserFilled, ShoppingCart, ArrowDown, Umbrella, Pouring } from '@element-plus/icons-vue';
    import { ref } from 'vue';
    import { useProductStore } from '../stores/product'; 
    import LanguageSelector from './LanguageSelector.vue';



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

    const userLogout = () => {
        productStore.userLogout()
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
            display: flex;
            gap: 10px;
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
            .logout-icon {
                display: flex;
                flex-direction: column;
                align-items: center;
                cursor: pointer;
                .el-icon {
                    font-weight: bolder;
                    margin-right: 0.5rem;
                    font-size: 1.2rem; 
                }
                > span {
                    font-size: .8rem;
                }
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
@media (max-width: 767px) {
    .navbar {
    .logo-and-login {
        > img {
        width: 25%;
        }
        .user-and-cart {
            width: 15%;
            > a {
                display: none;
            }
            .logout-icon {
                font-size: 0.8rem;
                .el-icon {
                    font-size: 1rem;
                }
            }
            .el-icon {
                font-size: 1.2rem;
            }
        }  
    }
    .navbar-items {
        width: 95%;
        > ul {
            justify-content: space-between;
            > li {
                > a{
                    font-size: 1rem;
                }
                .top-bottom {
                    > ul {
                        > li {
                            > a {
                                margin: 0.8rem;
                                font-size: 1rem;
                            }
                        }
                    }
                }
            }
        }
    }
}

}
</style>