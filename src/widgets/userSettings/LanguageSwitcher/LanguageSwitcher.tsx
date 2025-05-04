import i18n from '@/app/i18n/i18n'

// todo
const LanguageSwitcher = () => {
	const handleSwitch = (lng: 'en' | 'ru') => {
		i18n.changeLanguage(lng)
	}
	return (
		<div>
			<button onClick={() => handleSwitch('en')}>EN</button>
			<button onClick={() => handleSwitch('ru')}>RU</button>
		</div>
	)
}
