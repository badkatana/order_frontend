import { logOutUser } from '../lib'

export const AppBarItems: AppBarItemType[] = [
	{
		name: 'inbox',
		path: '/inbox',
		tooltip: 'Inbox',
		key: 'inbox_page',
		icon: 'inbox',
	},
	{
		name: 'calendar',
		path: '/calenders',
		tooltip: 'calendar',
		key: 'calenders_page',
		icon: 'calendar',
	},
	{
		name: 'projects',
		path: '/projects',
		tooltip: 'projects',
		key: 'projects_page',
		icon: 'assignment',
	},
	{
		name: 'helpful utmn',
		path: '/university',
		tooltip: 'helpful utmn',
		key: 'helpful_utmn',
		icon: 'utmn',
	},
	{
		name: 'log out',
		clickFunction: () => logOutUser(),
		path: '/',
		tooltip: 'logout',
		key: 'logout',
		icon: 'exit',
	},
]

export type AppBarItemType = {
	name: string
	clickFunction?: () => void
	path?: string
	tooltip: string
	key: string
	icon: string
}
