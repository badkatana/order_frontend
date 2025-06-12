import { ContainerPlaceholder } from '@/shared/ui'
import { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

export const QrCodeExchange = () => {
	const [params] = useSearchParams()
	const navigate = useNavigate()

	useEffect(() => {
		const shortToken = params.get('token')
		if (!shortToken) return

		const exchange = async () => {
			try {
				const res = await fetch('/api/User/validate', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${shortToken}`,
					},
					body: JSON.stringify({ shortToken }),
				})

				const data = await res.json()

				if (data.accessToken) {
					sessionStorage.setItem('token', data.accessToken)
					navigate('/calendar')
				}
			} catch (err) {
				console.error('Ошибка обмена токена', err)
			}
		}

		exchange()
	}, [params, navigate])

	return <ContainerPlaceholder />
}
