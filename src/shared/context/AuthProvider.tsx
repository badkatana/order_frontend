import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from './AuthContext'

// @ts-ignore
export const AuthProvider = ({ children }) => {
	const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
	const navigate = useNavigate()

	useEffect(() => {
		const token = sessionStorage.getItem('access_token')
		setIsAuthenticated(!!token)
	}, [])

	const login = () => {
		setIsAuthenticated(true)
		navigate('/calenders')
	}

	const logout = () => {
		setIsAuthenticated(false)
		sessionStorage.removeItem('access_token')
		navigate('/')
	}

	return <AuthContext.Provider value={{ isAuthenticated, login, logout }}>{children}</AuthContext.Provider>
}
