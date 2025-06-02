import { Menu, MenuItem } from '@mui/material'
import { useTranslation } from 'react-i18next'

export const CustomContextMenu = ({ open, anchorEl, handleClose, options }) => {
	const { t } = useTranslation()
	return (
		<Menu id={'event-context-menu'} anchorEl={anchorEl} open={open} onClose={handleClose}>
			{options.map(({ key, label, onClick, skip }) => {
				if (skip) return
				return (
					<MenuItem key={key} onClick={onClick}>
						{t(label)}
					</MenuItem>
				)
			})}
		</Menu>
	)
}
