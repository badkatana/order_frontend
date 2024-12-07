import { AuthPage } from '../../pages/AuthPage'
import { MainPage } from '../../pages/mainPage/MainPage'

const routes = [
	{ path: '/', element: AuthPage },
	{ path: '/calenders', element: MainPage, protected: true },
]

export default routes
