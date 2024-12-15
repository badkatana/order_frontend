import { Assignment, CalendarToday, ExitToApp, Inbox, Menu as MenuIcon } from '@mui/icons-material'
import { AppBar, IconButton, List, ListItem, ListItemText, Toolbar } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { logOutUser } from '../lib'

interface VerticalAppBarProps {
	open: boolean
	toggleDrawer: () => void
}

export const VerticalAppBar = ({ open, toggleDrawer }: VerticalAppBarProps) => {
	const navigate = useNavigate()

	const handleClick = item => {
		if (item.clickFunction) {
			item.clickFunction()
		}
		navigate(item.path)
	}

	const items = AppBarItems.map(item => {
		return (
			<ListItem onClick={() => handleClick(item)}>
				<IconButton>
					<item.icon sx={{ color: 'white' }} />
					{open && <ListItemText primary={item.name} sx={{ color: 'white' }} />}
				</IconButton>
			</ListItem>
		)
	})

	return (
		<AppBar
			position='fixed'
			sx={{
				width: open ? '15%' : '5%',
				transition: 'width 0.3s',
				backgroundColor: 'black',
				height: '100%',
			}}
		>
			<Toolbar>
				<IconButton onClick={toggleDrawer} color='inherit'>
					<MenuIcon />
				</IconButton>
			</Toolbar>
			<List>{items}</List>
		</AppBar>
	)
}

const AppBarItems = [
	{
		name: 'log out',
		clickFunction: () => logOutUser(),
		path: '/',
		icon: ExitToApp,
	},
	{
		name: 'projects',
		path: '/',
		icon: Assignment,
	},
	{
		name: 'inbox',
		path: '',
		icon: Inbox,
	},
	{
		name: 'calendar',
		path: '/calenders',
		icon: CalendarToday,
	},
	{
		name: 'default',
		path: '',
		icon: MenuIcon,
	},
]
