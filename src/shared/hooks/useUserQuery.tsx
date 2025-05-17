import { useSnackbar } from '@/shared/context/SnackbarProvider.tsx'
import { useEffect } from 'react'

type IUserQuery = {
	queryKey: string
	queryFn: (data?: unknown) => unknown[]
	notifications: {
		default: string
		success?: string
		error?: string
	}
}

export const useUserQuery = ({ queryFn, notifications }: IUserQuery) => {
	// @ts-ignore
	const { callSnackbar } = useSnackbar()

	const response = queryFn()

	useEffect(() => {
		if (notifications) {
		}
	}, [response])

	return {
		// @ts-ignore
		data: response.data,
	}
}
