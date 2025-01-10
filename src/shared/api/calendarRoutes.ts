import { authBackend } from './hostConfig'

export const getCalendar = async ({ dateStart, dateEnd }) => {
	const userId = localStorage.getItem('user_id')
	const { data } = await authBackend.get(`Calendar/Weekly/${userId}`, {
		params: { data: `["${dateStart}","${dateEnd}"]` },
	})
	return data
}

export const uploadFileTypeModeus = async formData => {
	const { data } = await authBackend.post(`/Schedule/upload-ics`, formData, {
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
