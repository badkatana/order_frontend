import { AuthPage, MainPage, ProjectsPage } from '@/pages'
import { UtmnPage } from '@/pages/UtmnPage/UtmnPage'

const routes = [
	{ path: '/', element: AuthPage },
	{ path: '/calenders', element: MainPage, protected: true },
	{ path: '/projects', element: ProjectsPage, protected: true },
	{
		path: '/university',
		element: UtmnPage,
		protected: true,
	},
]

export default routes
