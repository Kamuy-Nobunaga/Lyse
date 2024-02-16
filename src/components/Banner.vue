<template>
    <div class="banner">
        <img src="../assets/banner.jpg" alt="banner image" @click="toHomePage">
    </div> 
</template>

<script setup lang="ts">
    import { useRoute, useRouter } from 'vue-router';

    const route = useRoute()
    const router = useRouter()
    const toHomePage = () => {
        router.push({ path: `/${route.params.locale}` })
    }
</script>

<style scoped lang="scss">
.banner {
    > img {
        width: 100%;
        height: 200px;
        object-fit: cover;
        overflow: hidden;
    }  
}

</style>