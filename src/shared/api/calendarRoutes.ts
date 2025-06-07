import { authBackend } from './hostConfig'

export const getCalendar = async ({ dateStart, dateEnd }: { dateStart: string; dateEnd: string }) => {
	const userId = localStorage.getItem('user_id')

	const { data } = await authBackend.get(`/api/Calendar/Weekly/${userId}`, {
		params: { data: `["${dateStart}","${dateEnd}"]` },
	})

	return data
}

export const uploadFileTypeModeus = async (formData: any) => {
	const { data } = await authBackend.post(`/api/Schedule/upload-ics`, formData, {
		params: {
			userId: localStorage.getItem('user_id'),
			type: 'modeus',
		},
		headers: {
			'Content-Type': 'multipart/form-data',
		},
	})
	return data
}

export const getOverview = async () => {
	const userId = localStorage.getItem('user_id')
	const { data } = await authBackend.get(`overview`, { params: { userId } })
	return data
}
