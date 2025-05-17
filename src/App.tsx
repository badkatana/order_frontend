import { ThemeProvider } from '@emotion/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import dayjs from 'dayjs'
import 'dayjs/locale/en'
import 'dayjs/locale/ru'
import updateLocale from 'dayjs/plugin/updateLocale'
import { ReactNode, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Navigate, Route, HashRouter as Router, Routes } from 'react-router-dom'
import './app/i18n/i18n'
import routes from './app/routes/Routes'
import { AuthProvider } from './shared/context/AuthProvider'
import { SnackbarProvider } from './shared/context/SnackbarProvider'
import { useAuth } from './shared/hooks'
import { theme } from './shared/ui/theme'

dayjs.extend(updateLocale)
dayjs.updateLocale('en', {
	weekStart: 1,
})

function App() {
	const queryClient = new QueryClient()
	const { i18n } = useTranslation()

	useEffect(() => {
		dayjs.locale(i18n.language)
	}, [i18n.language])

	return (
		<Router>
			<AuthProvider>
				<QueryClientProvider client={queryClient}>
					<ThemeProvider theme={theme}>
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
					</ThemeProvider>
				</QueryClientProvider>
			</AuthProvider>
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
