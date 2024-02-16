<template>
    <h5 @click="toggleSideBar">Side Bar</h5>
    <el-row class="tac" v-if="showSideBar">
        <el-col :span="5">
        <el-menu
            active-text-color="#d9c0a3"
            background-color="#bf754b"
            class="el-menu-vertical-demo"
            default-active="2"
            text-color="#000000"
            @open="handleOpen"
            @close="handleClose"
        >
            <el-sub-menu index="1">
            <template #title>
                <el-icon><Handbag /></el-icon>
                <span>Products</span>
            </template>
            <el-menu-item-group title="Gender">
                <el-menu-item index="1-1">Men</el-menu-item>
                <el-menu-item index="1-2">Women</el-menu-item>
                <el-menu-item index="1-3">Unisex</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="Clothing">
                <el-menu-item index="1-4">Top</el-menu-item>
            </el-menu-item-group>
            <el-sub-menu index="1-5">
                <template #title>Bottom</template>
                <el-menu-item index="1-5-1">Trousers</el-menu-item>
                <el-menu-item index="1-5-2">Shorts</el-menu-item>

            </el-sub-menu>
            </el-sub-menu>
            <el-menu-item index="2">
            <el-icon><Van /></el-icon>
            <span>Orders</span>
            </el-menu-item>
            <el-menu-item index="3">
            <el-icon><document /></el-icon>
            <span>Reviews</span>
            </el-menu-item>
            <el-menu-item index="4">
            <el-icon><setting /></el-icon>
            <span>Shop Settings</span>
            </el-menu-item>
        </el-menu>
        </el-col>
    </el-row>
</template>
  
<script lang="ts" setup>
  import {
    Document,
    Van, 
    Handbag,
    Setting,
  } from '@element-plus/icons-vue'
import { ref } from 'vue';
  const handleOpen = (key: string, keyPath: string[]) => {
    console.log(key, keyPath)
  }
  const handleClose = (key: string, keyPath: string[]) => {
    console.log(key, keyPath)
  }

  const showSideBar = ref(false)
  const toggleSideBar = () => {
    showSideBar.value = !showSideBar.value
  }
</script>

<style lang="scss" scoped>
h5 {
   margin-left: 0.5rem; 
}
h5:hover {
    background: #bf754b;
    color: #d9c0a3;
    width: fit-content;
    padding: 0.1rem;
    border-radius: 10px;
    cursor: pointer;
}
.el-row {
    .el-col {
        .el-menu {
            border: 1px solid #d9c0a3;
        }
    }
}

</style>
  