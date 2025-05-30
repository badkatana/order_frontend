import { Assignment, CalendarToday, ExitToApp, Inbox } from '@mui/icons-material'
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined'
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined'
import { SvgIconProps } from '@mui/material'
import { logOutUser } from '../lib'

export const AppBarItems: AppBarItemType[] = [
	{
		name: 'inbox',
		path: '/inbox',
		tooltip: 'Inbox',
		key: 'inbox_page',
		icon: Inbox,
	},
	{
		name: 'calendar',
		path: '/calenders',
		tooltip: 'calendar',
		key: 'calenders_page',
		icon: CalendarToday,
	},
	{
		name: 'projects',
		path: '/projects',
		tooltip: 'projects',
		key: 'projects_page',
		icon: Assignment,
	},
	{
		name: 'helpful utmn',
		path: '/university',
		tooltip: 'helpful utmn',
		key: 'helpful_utmn',
		icon: SchoolOutlinedIcon,
	},
	{
		name: 'log out',
		clickFunction: () => logOutUser(),
		path: '/',
		tooltip: 'logout',
		key: 'logout',
		icon: ExitToApp,
	},
	{
		name: 'settings',
		path: '/settings',
		tooltip: 'user settings',
		key: 'settings',
		icon: SettingsOutlinedIcon,
	},
]

export type AppBarItemType = {
	name: string
	clickFunction?: () => void
	path: string
	tooltip: string
	key: string
	icon: React.ComponentType<SvgIconProps>
}
