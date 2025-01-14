import { Assignment, CalendarToday, ExitToApp, Inbox, Menu as MenuIcon } from '@mui/icons-material'
import { logOutUser } from '../lib'

export const AppBarItems = [
	{
		name: 'log out',
		clickFunction: () => logOutUser(),
		path: '/',
		key: 'logout',
		icon: ExitToApp,
	},
	{
		name: 'projects',
		path: '/projects',
		key: 'projects_page',
		icon: Assignment,
	},
	{
		name: 'inbox',
		path: '',
		key: 'inbox_page',
		icon: Inbox,
	},
	{
		name: 'calendar',
		path: '/calenders',
		key: 'calenders_page',
		icon: CalendarToday,
	},
	{
		name: 'default',
		path: '',
		key: 'defaul',
		icon: MenuIcon,
	},
]
