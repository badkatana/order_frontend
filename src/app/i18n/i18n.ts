import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'
import { en } from './en'
import { ru } from './ru'

i18n.use(LanguageDetector)
	.use(initReactI18next)
	.init({
		fallbackLng: 'ru',
		debug: false,
		interpolation: {
			escapeValue: false,
		},
		resources: {
			en: {
				translation: en,
			},
			ru: {
				translation: ru,
			},
		},
	})

export default i18n
