import { getIcon } from '@/shared/icons/icons'
import { AppBar, List, ListItem, ListItemText, Toolbar, Tooltip } from '@mui/material'
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
			tooltip: 'user.titleSingular',
		},
	]

	const items = [...notPathItems, ...AppBarItems].map(item => {
		return (
			<Tooltip title={item.tooltip ?? 'page'} key={`tooltip_${item.name}`}>
				{/*  @ts-ignore */}
				<ListItem key={item.key} onClick={() => handleClick(item)} button style={{ padding: '1em' }}>
					{getIcon({ name: item.icon })}
					{open && <ListItemText primary={item.name} sx={{ color: 'white', px: '1em' }} />}
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
