<template>
    <el-menu
        active-text-color="#d9c0a3"
        background-color="#bf754b"
        class="el-menu-demo"
        :collapse="isCollapse"
        :default-active="activeIndex"
        mode="horizontal"
        text-color="#000000"
        @select="handleSelect"
    >
        <el-sub-menu index="1">
        <template #title>
            <el-icon><Handbag /></el-icon>
            <span>Products</span>
        </template>
        <el-menu-item-group title="Clothing">
            <el-menu-item index="1-1" @click="handleAll">All</el-menu-item>
            <el-menu-item index="1-2" @click="handleTop">Top</el-menu-item>
            <el-menu-item index="1-3" @click="handleBtm">Bottom</el-menu-item>
            <el-menu-item index="1-4" @click="addAProduct">Add a product</el-menu-item>
        </el-menu-item-group>
        </el-sub-menu>
        <el-menu-item index="2" @click="handleOrders">
        <el-icon><Van /></el-icon>
        <span>Orders</span>
        </el-menu-item>
        <el-menu-item index="3" @click="handleReviews">
        <el-icon><document /></el-icon>
        <span>Reviews</span>
        </el-menu-item>
        <el-menu-item index="4" @click="handleShopSetting">
        <el-icon><setting /></el-icon>
        <span>Shop Settings</span>
        </el-menu-item>
    </el-menu>
</template>
  
<script lang="ts" setup>
  import {
    Document,
    Van, 
    Handbag,
    Setting,
  } from '@element-plus/icons-vue'
  import { ref } from 'vue';
  import { useProductStore } from '../../stores/product';
  import router from '@/router';
  


  const productStore = useProductStore()
  const isCollapse = ref(true)
  const activeIndex = ref('1')
  const handleSelect = (key: string, keyPath: string[]) => {
    console.log(key, keyPath)
  }

  const handleAll = () => {
    productStore.adminAll = true
    productStore.adminTop = false
    productStore.adminBottom = false
    productStore.adminOrders = false
    productStore.adminReviews = false
  } 
  const handleTop = () => {
    productStore.adminAll = false
    productStore.adminTop = true
    productStore.adminBottom = false
    productStore.adminOrders = false
    productStore.adminReviews = false
    console.log(productStore.adminTop);
    
  }
  const handleBtm = () => {
    productStore.adminAll = false
    productStore.adminTop = false
    productStore.adminBottom = true
    productStore.adminOrders = false
    productStore.adminReviews = false
  }
  const handleOrders = () => {
    productStore.adminAll = false
    productStore.adminTop = false
    productStore.adminBottom = false
    productStore.adminOrders = true
    productStore.adminReviews = false

  }

  const handleReviews = () => {
    productStore.adminAll = false
    productStore.adminTop = false
    productStore.adminBottom = false
    productStore.adminOrders = false
    productStore.adminReviews = true

  }

  const handleShopSetting = () => {
    productStore.adminAll = false
    productStore.adminTop = false
    productStore.adminBottom = false
    productStore.adminOrders = false
    productStore.adminReviews = false 
    productStore.adminShopSetting = true

  }
  const addAProduct = () => {
    router.push({ path: '/en/admin-product-add' })
  }




</script>

<style lang="scss" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.el-menu {
    margin-left: 1rem;
    border-radius: 10px;
    margin-bottom: 1rem;
    .el-sub-menu {
    }
}

</style>
  