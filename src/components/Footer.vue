<template>
    <div class="footer">
        <div class="footer-content">
            {{ $t('copyright', { year: year, owner: 'Peter'}) }}
        </div>
        <select @change="handleChangeLanguage" v-model="selectedLanguage">
            <option value="zh">中文</option>
            <option value="en">English</option>
        </select>
    </div>
</template>
<script setup lang="ts">
    import { watch } from 'vue';
    import { useI18n } from 'vue-i18n'
    import { useRoute, useRouter } from 'vue-router';

    const d = new Date()
    const year = d.getFullYear()
    const route = useRoute()
    const router = useRouter()
    const { locale } = useI18n()

    // const selectedLanguage = localStorage.getItem('selectedLanguage') || locale.value    
    const selectedLanguage = locale.value
    
    

    const handleChangeLanguage = (e) => {
        const selectedValue = e.target.value
        locale.value = selectedValue
        // localStorage.setItem('selectedLanguage', selectedValue)
        router.push({ ...route, params: { ...route.params, locale: selectedValue }})
    }
    //too many pages
    

    watch(() => route.params.locale, (newValue, oldValue) => {
        console.log(newValue, 123);    
    })

    
    
    



</script>

<style lang="scss" scoped>
    .footer {
        margin: 1rem;
        padding: 10px 0;
        text-align: center;
        > select {
            margin: 1rem;
            height: 2rem;
            border: none;
            background: #bf754b;
            font-size: 1rem;
        }
        > select:focus {
            outline: none;
        }
    }

</style>