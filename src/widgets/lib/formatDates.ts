/*  @ts-ignore */
export const generateDateRange = (start, end) => {
	/*  @ts-ignore */
	const dates = []
	let currentDate = start

	/*  @ts-ignore */
	if (!currentDate) return dates

	while (currentDate.isBefore(end) || currentDate.isSame(end)) {
		dates.push(currentDate.format('YYYY-MM-DD'))
		currentDate = currentDate.add(1, 'day')
	}

	return dates
}
