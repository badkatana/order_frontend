import create from 'zustand'

const loadState = () => {
	try {
		const serializedState = localStorage.getItem('myAppState')
		return serializedState ? JSON.parse(serializedState) : {}
	} catch (err) {
		return {}
	}
}

const saveState = state => {
	try {
		const serializedState = JSON.stringify(state)
		localStorage.setItem('myAppState', serializedState)
	} catch (err) {
		// Игнорируем ошибки записи в localStorage
	}
}

const useStore = create(set => ({
	data: loadState(),
	setData: newData => {
		set(state => {
			const updatedState = { ...state, data: newData }
			saveState(updatedState)
			return updatedState
		})
	},
}))

export default useStore
