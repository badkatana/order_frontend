import { logOutUser } from '../lib'

export const AppBarItems: AppBarItemType[] = [
	{
		name: 'inbox',
		path: '/inbox',
		tooltip: 'note.inbox',
		key: 'inbox_page',
		icon: 'inbox',
	},
	{
		name: 'calendar',
		path: '/calenders',
		tooltip: 'calendar.title',
		key: 'calenders_page',
		icon: 'calendar',
	},
	{
		name: 'projects',
		path: '/projects',
		tooltip: 'project.titlePlural',
		key: 'projects_page',
		icon: 'assignment',
	},
	{
		name: 'helpful utmn',
		path: '/university',
		tooltip: 'utmn.title',
		key: 'helpful_utmn',
		icon: 'utmn',
	},
	{
		name: 'log out',
		clickFunction: () => logOutUser(),
		path: '/',
		tooltip: 'actions.logout',
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
