<template>
    <h1>Welcome back, let's get started!</h1>
    <SideBar />
</template>
<script setup lang="ts">
    import { ref } from 'vue';
    import { useI18n } from 'vue-i18n'
    import { useProductStore } from '@/stores/product'
    import { useRoute, useRouter } from 'vue-router';
    import SideBar from '../components/AdminSideBar.vue'

    const route = useRoute()
    const router = useRouter()

    const { locale } = useI18n()
    const productStore = useProductStore()
    const email = ref('')
    const password = ref('')
    const wrongMsg = ref(false)

    locale.value = route.params.locale

    const logIn = () => {
        if(email.value === 'admin' && password.value === '123') {
            wrongMsg.value = false
            router.push({name: 'home'})
        } else {
            wrongMsg.value = true
            email.value = ''
            password.value = ''

        }
    }
</script>

<style lang="scss" scoped>
</style>