import i18n from '@/app/i18n/i18n'
import { Box } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { LoadingScreen } from '../LoadingScreen/LoadingScreen'

export const ContainerPlaceholder = ({ placeholder, fullHeight = true, progress = false, sx = undefined }) => {
	const { t } = useTranslation()
	const emptyMessage = t('messages.noDataEmpty')
	const canTranslateMessage = i18n.exists(placeholder)
	const placeHolder = progress ? 'Loading' : placeholder && canTranslateMessage ? placeholder : emptyMessage

	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center',
				width: '100%',
				height: fullHeight ? '100%' : '50%',
				color: 'gray',
				fontSize: '1em',
				textAlign: 'center',
				// @ts-ignore
				...sx,
			}}
		>
			{progress && <LoadingScreen />}
			{placeHolder}
		</Box>
	)
}
