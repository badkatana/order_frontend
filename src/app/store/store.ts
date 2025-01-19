import { Project } from '@/entities/Project'
import dayjs, { Dayjs } from 'dayjs'
import isoWeek from 'dayjs/plugin/isoWeek'
import { create } from 'zustand'
dayjs.extend(isoWeek)

type AppCalendarsavedWeek = {
	monday: null | Dayjs | string
	sunday: null | Dayjs | string
}
interface AppStore {
	selectedProject: Project | null
	savedWeek: AppCalendarsavedWeek
	setSelectedProject: (project: null | Project) => void
	setSavedWeek: (date: AppCalendarsavedWeek) => void
	savedDate: Dayjs
	setSavedDate: (date: Dayjs) => void
}

export const getWeekBoundaries = (date: dayjs.Dayjs) => {
	const monday = date.startOf('isoWeek')
	const sunday = date.endOf('isoWeek')

	return { monday, sunday }
}

export const useAppStore = create<AppStore>(set => ({
	selectedProject: null,
	savedWeek: getWeekBoundaries(dayjs()),
	savedDate: dayjs(),

	setSelectedProject: project => set({ selectedProject: project }),
	setSavedWeek: date => set({ savedWeek: date }),
	setSavedDate: date => set({ savedDate: date }),
}))
