import { AuthPage, MainPage, ProjectsPage } from '../../pages'

const routes = [
	{ path: '/', element: AuthPage },
	{ path: '/calenders', element: MainPage, protected: true },
	{ path: '/projects', element: ProjectsPage, protected: true },
]

export default routes
