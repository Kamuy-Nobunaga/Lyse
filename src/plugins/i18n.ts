import { createI18n } from "vue-i18n"
import zh from '../locales/zh-TW.json';
import en from '../locales/en-US.json';

const messages = {
    zh, 
    en
}

const i18n = createI18n({
    legacy: false, 
    locale: 'zh', 
    fallbackLocale: 'en', 
    messages
})

export default i18n;
