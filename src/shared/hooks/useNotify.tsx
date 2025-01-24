import { useSnackbar } from '../context/SnackbarProvider'

export const notifyUser = async ({ crudFunction, resetQueryKey, queryClient }) => {
	const callSnackbar = useSnackbar()
	const response = await crudFunction()

	switch (response.status) {
		case 200: {
			callSnackbar('Successfull')
			return
		}
		case 400: {
			callSnackbar('Not found')
			return
		}
		case 415: {
			callSnackbar('Not allowed')
			return
		}
		case 500: {
			callSnackbar('Server error')
		}
	}

	queryClient.resetQueries([resetQueryKey])
}
