import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import dayjs from 'dayjs'
import 'dayjs/locale/en'
import 'dayjs/locale/ru'
import updateLocale from 'dayjs/plugin/updateLocale'
import { ReactNode } from 'react'
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import './app/i18n/i18n'
import routes from './app/routes/Routes'
import { AuthProvider } from './shared/context/AuthProvider'
import { SnackbarProvider } from './shared/context/SnackbarProvider'
import { ThemeContextProvider } from './shared/context/ThemeContext'
import { useAuth } from './shared/hooks'

dayjs.extend(updateLocale)
dayjs.updateLocale('en', {
	weekStart: 1,
})

function App() {
	const queryClient = new QueryClient()

	return (
		<Router>
			<ThemeContextProvider>
				<QueryClientProvider client={queryClient}>
					<AuthProvider>
						<SnackbarProvider>
							<Routes>
								{routes.map(route => {
									if (route.protected) {
										return (
											<Route
												key={route.path}
												path={route.path}
												element={<ProtectedRoute element={<route.element />} />}
											/>
										)
									}
									return <Route key={route.path} path={route.path} element={<route.element />} />
								})}
							</Routes>
						</SnackbarProvider>
					</AuthProvider>
				</QueryClientProvider>
			</ThemeContextProvider>
		</Router>
	)
}

const ProtectedRoute = ({ element }: { element: ReactNode }) => {
	const { isAuthenticated } = useAuth()

	if (isAuthenticated === undefined) {
		return <div>Loading</div>
	}
	return isAuthenticated ? <>{element}</> : <Navigate to='/' />
}

export default App
