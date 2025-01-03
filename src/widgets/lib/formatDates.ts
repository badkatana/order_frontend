export const generateDateRange = (start, end) => {
	const dates = []
	let currentDate = start

	if (!currentDate) return dates

	while (currentDate.isBefore(end) || currentDate.isSame(end)) {
		dates.push(currentDate.format('YYYY-MM-DD'))
		currentDate = currentDate.add(1, 'day')
	}

	return dates
}
