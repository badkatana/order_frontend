export const addLabelToFormComponents = ({ prefix, config }) => {
	const addLabel = field => ({
		...field,
		label: `${prefix}.${field.name}`,
	})

	return config.map(item => {
		if (item.hasOwnProperty('column')) {
			return {
				...item,
				column: item.column.map(addLabel),
			}
		} else {
			return addLabel(item)
		}
	})
}
