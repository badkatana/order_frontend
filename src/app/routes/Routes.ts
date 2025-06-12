import { AuthPage, CalendarPage, ProjectsPage } from '@/pages'
import { QrCodeExchange } from '@/pages/AuthPage/mobile/QrCodeExchange'
import { InboxPage } from '@/pages/InboxPage/InboxPage'
import { SettingsPage } from '@/pages/SettingsPage'
import { UtmnPage } from '@/pages/UtmnPage/UtmnPage'

const routes: RoutesType = [
	{ path: '/', element: AuthPage },
	{ path: '/calenders', element: CalendarPage, protected: true },
	{ path: '/projects', element: ProjectsPage, protected: true },
	{
		path: '/university',
		element: UtmnPage,
		protected: true,
	},
	{
		path: '/inbox',
		element: InboxPage,
		protected: true,
	},
	{
		path: '/settings',
		element: SettingsPage,
		protected: true,
	},
	{
		path: '/mobile',
		element: QrCodeExchange,
		protected: false,
	},
]

export default routes

type RoutesType = {
	path: string
	element: any
	protected?: boolean
}[]
