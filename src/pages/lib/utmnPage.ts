import { categories } from '@/shared/constants/constants'

const classifyTopic = (topic: string): string => {
	topic = topic.toLowerCase()

	for (const [category, keywords] of Object.entries(categories)) {
		if (keywords.some(keyword => topic.includes(keyword))) {
			return category
		}
	}

	return 'unknown'
}

const extractAndClassifyEvent = (
	eventStr: string
): { topic: string; category: string; date: string | null | undefined; original: string } => {
	const regex = /(?:конференция|диктант|игра|круглый стол|форум|тренинг|обсуждение)\s+«(.+?)»/i
	const match = eventStr.match(regex)

	if (match) {
		const topic = match[1].trim()
		const category = classifyTopic(topic)
		return { topic, category, date: eventStr.split(':')[0], original: eventStr }
	}

	return { topic: eventStr, category: 'unknown', date: eventStr.split(':')[0], original: eventStr }
}

export const classifyEvents = (
	events: string[]
): Record<string, { topic: string; category: string; date: string | null | undefined; original: string }[]> => {
	const classified: Record<
		string,
		{ topic: string; category: string; date: string | null | undefined; original: string }[]
	> = {
		economy: [],
		IT: [],
		social: [],
		culture: [],
		ecology: [],
		science: [],
		unknown: [],
	}

	events.forEach(eventStr => {
		const { topic, category, date, original } = extractAndClassifyEvent(eventStr)
		classified[category].push({ topic, category, date, original })
	})

	return classified
}
