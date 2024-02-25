<template>
    <select @change="handleChangeLanguage" v-model="defaultLanguage">
        <option value="zh">中文</option>
        <option value="en">English</option>
    </select>

</template>

<script lang="ts" setup>
    import { useRoute, useRouter } from 'vue-router';
    import { useI18n } from 'vue-i18n'
    import { computed } from 'vue';


    const route = useRoute()
    const router = useRouter()
    const { locale } = useI18n()
    const defaultLanguage = computed({
        get: () => route.params.locale, 
        set: (val) => router.push({ ...route, params: { ...route.params, locale: val }})
    })    

    const handleChangeLanguage = (e) => {
        defaultLanguage.value = e.target.value 
        locale.value = e.target.value
        // localStorage.setItem('selectedLanguage', selectedValue)
    }

</script> 

<style lang="scss" scoped>
select {
    width: 4.5rem;
    height: 2.5rem;
    border: none;
    padding:0.6rem;
    background: var(--dark);
    font-size: 1rem;
    -webkit-appearance: none;
    appearance: none;
    cursor: pointer;
}
select:focus {
    outline: none;
}

</style>