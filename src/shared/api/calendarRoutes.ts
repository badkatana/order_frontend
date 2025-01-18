import { authBackend } from './hostConfig'

/*  @ts-ignore */
export const getCalendar = async ({ dateStart, dateEnd }) => {
	const userId = localStorage.getItem('user_id')
	const { data } = await authBackend.get(`/api/Calendar/Weekly/${userId}`, {
		params: { data: `["${dateStart}","${dateEnd}"]` },
	})
	return data
}

/*  @ts-ignore */
export const uploadFileTypeModeus = async formData => {
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
