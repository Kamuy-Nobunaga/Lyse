<template>
    <div class="login">
        <h2>{{ $t('adminLogin') }}</h2>
        <form @submit.prevent="logIn">
            <label for="email" class="email">{{ $t('email') }}</label>
            <input name="email" type="text" v-model="email">
            
            <label for="password" class="password">{{ $t('password') }}</label>
            <input name="password" type="text" v-model="password">
            <h3 v-if="wrongMsg">Wrong email or password</h3>
            <div class="login-buttons">
                <button type="submit">{{ $t('login') }}</button>
            </div>
        </form>
    </div>
</template>
<script setup lang="ts">
    import { onMounted, ref } from 'vue';
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

    onMounted(() => productStore.userOrAdmin = false)


    const logIn = () => {
        if(email.value === 'admin' && password.value === '123') {
            wrongMsg.value = false
            localStorage.setItem('admin', email.value)
            router.push({ path: `/${locale.value}/admin-main` })
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
    height: 80dvh;
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
            color: var(--error);
            font-weight: bold;
        }
        .login-buttons {
            display: block;
            text-align: left;
            > button {
                font-size: 0.8rem;
                padding: 1rem;
                background: #bf754b;
                border: none;
                font-weight: bold;
            }
        }
    }
}

@media (max-width: 767px) {
    .login {
        > h2 {
            font-size: 1.5rem;
        }
        > form {
            width: 70%;
            > input {
                height: 1.5rem;
            }
            > h3 {
                font-size: 1rem;
            }
            .login-buttons {
                > button {
                    font-size: 0.8rem;
                    padding: 0.5rem;
                }
            }
        }
    }

}
</style>