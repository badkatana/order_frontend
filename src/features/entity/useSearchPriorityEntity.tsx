import { useMemo, useState } from 'react'

type SearchPriorityEntityParams<T> = {
	collection: Record<string, T[]>
	searchFields: (keyof T)[]
}

export const useSearchPriorityEntity = <T,>({ collection, searchFields }: SearchPriorityEntityParams<T>) => {
	const [searchQuery, setSearchQuery] = useState('')

	const filteredCollection = useMemo(() => {
		if (!searchQuery) return collection

		const loweredQuery = searchQuery.toLowerCase()
		const filtered: Record<string, T[]> = {}
		Object.entries(collection).forEach(([groupKey, items]) => {
			const matchingItems = items.filter(item =>
				searchFields.some(field => {
					const value = item[field]
					return typeof value === 'string' && value.toLowerCase().includes(loweredQuery)
				})
			)

			if (matchingItems?.length > 0) {
				filtered[groupKey] = matchingItems
			} else filtered[groupKey] = []
		})

		return filtered
	}, [collection, searchFields, searchQuery])

	return { filteredCollection, searchQuery, setSearchQuery }
}
