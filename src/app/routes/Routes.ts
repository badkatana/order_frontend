import { AuthPage, MainPage, ProjectsPage } from '@/pages'
import { InboxPage } from '@/pages/InboxPage/InboxPage'
import { UtmnPage } from '@/pages/UtmnPage/UtmnPage'

const routes: RoutesType = [
	{ path: '/', element: AuthPage },
	{ path: '/calenders', element: MainPage, protected: true },
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
]

export default routes

type RoutesType = {
	path: string
	element: any
	protected?: boolean
}[]
