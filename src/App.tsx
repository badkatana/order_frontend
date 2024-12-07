import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import routes from './app/routes/Routes'
import { isAuthenticated } from './shared/api/authRoutes'

function App() {
	return (
		<Router>
			<Routes>
				{routes.map(route => {
					if (route.protected) {
						return (
							<Route
								key={route.path}
								path={route.path}
								element={isAuthenticated() ? <route.element /> : <Navigate to='/' />}
							/>
						)
					}
					return <Route key={route.path} path={route.path} element={<route.element />} />
				})}
			</Routes>
		</Router>
	)
}

export default App
