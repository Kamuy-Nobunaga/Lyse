<template>
    <div class="login">
        <h2>{{ $t('login') }}</h2>
        <form @submit.prevent="logIn">
            <label for="email" class="email">{{ $t('email') }}</label>
            <input name="email" type="email" v-model="account.email">
            
            <label for="password" class="password">{{ $t('password') }}</label>
            <input name="password" type="password" v-model="account.password">
            <h3 v-if="wrongMsg">Wrong email or password</h3>
            <div class="login-buttons">
                <button type="submit">{{ $t('login') }}</button>
                <button type="button" @click="goToSignup">{{ $t('signup') }}</button>
            </div>
        </form>
        <Alert>
            <template v-slot:modal-header>
                <p class="alert-header" v-if="productStore.loggingIn">
                    Logging in...
                </p>
                <p class="log-in-failed-header" v-if="productStore.loginFailed">
                    wrong email or password...
                </p>
                <p class="log-in-to-continue" v-if="productStore.logInToContinue">
                    please log in to continue...
                </p>
            </template>
            <template v-slot:modal-body>
                <p class="log-in-failed-content" v-if="productStore.loginFailed">
                    try again or sign up if you haven't
                </p>
            </template>
            <template v-slot:modal-footer>
            </template>
        </Alert>

    </div>
</template>
<script setup lang="ts">
    import { ref, reactive, onMounted } from 'vue';
    import { useI18n } from 'vue-i18n'
    import { useProductStore } from '@/stores/product'
    import { useRoute, useRouter } from 'vue-router';
    import Alert from '@/components/Alert.vue'

    const route = useRoute()
    const router = useRouter()


    const { locale } = useI18n()
    const productStore = useProductStore()
    const account = reactive({
        email: '', 
        password: ''
    })
    const wrongMsg = ref(false)

    const logIn = async () => {
        
         await productStore.userSignIn(account)
        const loginSuccessful = localStorage.getItem('user')

        if (loginSuccessful) {
            productStore.loggingIn = true
            productStore.showAlert = true
            setTimeout(() => {
                productStore.showAlert = false
                productStore.loggingIn = false
                router.push({path: `/${locale.value}`})
            }, 1500)
            
        } else {
            productStore.loginFailed = true
            productStore.showAlert = true
            setTimeout(() => {
                productStore.showAlert = false
                productStore.loginFailed = false
                router.go(0)
            }, 2000)
            console.log('log in failed...');
        }
    } 

    const goToSignup = () => {
        router.push({path: `/${locale.value}/signup`})
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
        > h3 {
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
    .alert-header {
        font-size: 2rem;
        color: var(--font);
    }
    .log-in-failed-header {
        font-size: 1.5rem;
        font-weight: bolder;
    }
    .log-in-failed-content {
        font-size: 1rem;
    }
    .log-in-to-continue {
        font-size: 1.5rem;
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