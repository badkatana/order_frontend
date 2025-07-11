import { getIcon } from '@/shared/icons/icons'
import { AppBar, List, ListItem, ListItemText, Toolbar, Tooltip, useTheme } from '@mui/material'
import { t } from 'i18next'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserSettings } from '../userSettings/UserSettings'
import { BlurredBackground, VerticalBar } from './VerticalAppBarStyles'
import { AppBarItems, AppBarItemType } from './config'

interface VerticalAppBarProps {
	open: boolean
	toggleDrawer: () => void
}

export const VerticalAppBar = ({ open, toggleDrawer }: VerticalAppBarProps) => {
	const navigate = useNavigate()
	const theme = useTheme()
	const [openSettings, setOpenSettings] = useState(false)

	const handleClick = (item: AppBarItemType) => {
		if (item.clickFunction) {
			item.clickFunction()
		}
		navigate(item.path)
	}

	const notPathItems: AppBarItemType[] = [
		{
			name: 'menu',
			clickFunction: toggleDrawer,
			tooltip: 'actions.show',
			key: 'menu_toolbar',
			icon: 'menu',
		},
		{
			name: 'user',
			clickFunction: () => setOpenSettings(true),
			key: 'user_toolbar',
			icon: 'user',
			tooltip: 'settings.title',
		},
	]

	const items = [...notPathItems, ...AppBarItems].map(item => {
		return (
			<Tooltip title={t(item.tooltip) ?? 'page'} key={`tooltip_${item.name}`}>
				{/*  @ts-ignore */}
				<ListItem key={item.key} onClick={() => handleClick(item)} button style={{ padding: '1em' }}>
					{getIcon({ name: item.icon })}
					{open && <ListItemText primary={item.name} sx={{ px: '1em' }} />}
				</ListItem>
			</Tooltip>
		)
	})

	return (
		<>
			<BlurredBackground open={open} />
			<AppBar
				position='fixed'
				sx={{
					width: open ? '15%' : '5%',
					...VerticalBar,
					backgroundColor: theme.palette.custom.appBar,
					color: theme.palette.text.primary,
				}}
			>
				<Toolbar sx={{ display: 'flex', flexDirection: 'column' }}>
					<List>{items}</List>
				</Toolbar>
			</AppBar>
			<UserSettings open={openSettings} handleClose={() => setOpenSettings(!openSettings)} />
		</>
	)
}
