import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

// Translation files
import enTranslations from './locales/en.json'
import arTranslations from './locales/ar.json'
import frTranslations from './locales/fr.json'
import zhTranslations from './locales/zh.json'
import ruTranslations from './locales/ru.json'

const resources = {
  en: { translation: enTranslations },
  ar: { translation: arTranslations },
  fr: { translation: frTranslations },
  zh: { translation: zhTranslations },
  ru: { translation: ruTranslations },
}

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en', // default language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  })

export default i18n