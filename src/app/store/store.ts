import { create } from 'zustand'

interface ProjectStore {
	selectedProject: string | null
	savedDate: string | null
	setSelectedProject: (project: string | null) => void
	setSavedDate: (date: string | null) => void
}

const useProjectStore = create<ProjectStore>(set => ({
	selectedProject: null,
	savedDate: null,

	setSelectedProject: project => set({ selectedProject: project }),

	setSavedDate: date => set({ savedDate: date }),
}))

export default useProjectStore
