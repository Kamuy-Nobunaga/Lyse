<template>
    <div class="login">
        <h2>{{ $t('signup') }}</h2>
        <form @submit.prevent="signUp">
            <label for="email" class="email">{{ $t('email') }}</label>
            <input name="email" type="email" v-model="account.email">
            <p v-if="account.email && 
                    !account.email.match(regexEmail)">please use a valid email address to sign up</p>
            
            <label for="password" class="password">{{ $t('password') }}</label>
            <input name="password" type="password" v-model="account.password">
            <p v-if="account.password && 
                    !account.password.match(regexPswd)">password must be more than 6 words</p>
            
            <button type="submit">{{ $t('signup') }}</button>
        </form>
    </div>
</template>
<script setup lang="ts">
    import { reactive } from 'vue';
    import { useI18n } from 'vue-i18n'
    import { useProductStore } from '@/stores/product'
    import { useRoute, useRouter } from 'vue-router';

    const route = useRoute()
    const router = useRouter()


    const { locale } = useI18n()
    const productStore = useProductStore()
    const account = reactive({
        email: '', 
        password: ''
    })
    const regexEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

    const regexPswd = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]{6,30}$/



    const signUp = () => {
        productStore.userSignup(account)
        router.push({ path: `/${locale.value}/login`})
    } 
</script>

<style lang="scss" scoped>
.login {
    display: block;
    margin: 0 auto;
    margin-bottom: 2rem;
    height: 80dvh;
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
        > p {
            text-align: left;
            margin-top: 0;
            color: var(--error);
        }
        > button {
            font-size: 0.8rem;
            width: 50%;
            padding: 1rem;
            background: #bf754b;
            border: none;
            font-weight: bold;
            margin-top: 1.5rem;
        }
    }
}

@media (max-width: 767px) {
    .login {
        > h2 {
            font-size: 1.5rem;
        }
        > form {
            width: 60%;
            > input {
                height: 1.5rem;
            }
            > h3 {
                text-align: left;
                font-size: 1rem;
            }
        }
    }
}
</style>