<template>
    <div class="login">
        <h2>{{ $t('login') }}</h2>
        <form @submit.prevent="logIn">
            <label for="email" class="email">{{ $t('email') }}</label>
            <input name="email" type="text" v-model="email">
            
            <label for="password" class="password">{{ $t('password') }}</label>
            <input name="password" type="text" v-model="password">
            <h3 v-if="wrongMsg">Wrong email or password</h3>
            <div class="login-buttons">
                <button type="submit">{{ $t('login') }}</button>
                <button type="button">{{ $t('signup') }}</button>
            </div>
        </form>
    </div>
</template>
<script setup lang="ts">
    import { ref } from 'vue';
    import { useI18n } from 'vue-i18n'
    import { useProductStore } from '@/stores/product'
    import { useRoute, useRouter } from 'vue-router';

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
            productStore.userInfo = 'admin'
            localStorage.setItem('user', email.value)
            router.push({name: 'home'})
        } else {
            wrongMsg.value = true
            email.value = ''
            password.value = ''

        }
    }
</script>

<style lang="scss" scoped>
.login {
    display: block;
    margin: 0 auto;
    text-align: center;
    > h2 {
        font-size: 2rem;
        font-weight: bolder;
    }
    > form {
        margin: 0 auto;
        width: 40%;
        > label {
            text-align: left;
            display: block;
            margin-bottom: 0.5rem;
        }
        > input {
            width: 100%;
            height: 2rem;
            border: none;
            border-radius: 3px;
            margin-bottom: 1rem;
            padding: 0.5rem;
            font-size: 1rem;
        }
        > h3 {
            text-align: left;
            margin: 0.5rem 0 1rem 0;
            color: red;
            font-weight: bold;
        }
        .login-buttons {
            display: block;
            text-align: left;
            > button {
                font-size: 0.8rem;
                padding: 1rem;
            }
            > button:first-child {
                margin-right: 1rem;
                background: #bf754b;
                border: none;
                font-weight: bold;
            }
            > button:last-child {
                border: 1px solid #bf754b;
                background: transparent;
                color: #bf754b;
                font-weight: bold;
            }
        }
    }
}
</style>