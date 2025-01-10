import { Assignment, CalendarToday, ExitToApp, Inbox, Menu as MenuIcon } from '@mui/icons-material'
import { logOutUser } from '../lib'

export const AppBarItems = [
	{
		name: 'log out',
		clickFunction: () => logOutUser(),
		path: '/',
		icon: ExitToApp,
	},
	{
		name: 'projects',
		path: '/projects',
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
