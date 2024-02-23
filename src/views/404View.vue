<template>
    <div class="four-o-four">
        <h3>{{ $t('404') }}</h3>
        <button @click="goBackToHome">{{ $t('B2Homepage') }}</button>
    </div>
</template>
<script lang="ts" setup>
  import { useRoute, useRouter } from 'vue-router';

  const route = useRoute()
  const router = useRouter() 

  const goBackToHome = () => {
    router.push({ path: '/en' })
    console.log('home');
  }
</script> 

<style scoped lang="scss">
.four-o-four {
    width: 60%;
    margin: 0 auto;
    text-align: center;
    color: var(--font);
    > h3 {
        font-size: 1.5rem;
        font-weight: normal;
    }
    > button {
        margin: 1rem 0;
        padding: 0.5rem;
        width: 80%;
        color: var(--dark);
        background: var(--light);
        border: 1px solid var(--dark);
        border-radius: 5px;
        font-size: 1rem;
        cursor: pointer;
    }
}
</style>