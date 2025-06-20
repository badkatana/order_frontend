import i18n from '@/app/i18n/i18n'
import { t } from 'i18next'

export const getTranslatedText = (text: string) => {
	let isTranslationMissing = !i18n.exists(text)

	if (isTranslationMissing) {
		console.log('Нет перевода для', text)
		return text
	} else return t(text)
}
