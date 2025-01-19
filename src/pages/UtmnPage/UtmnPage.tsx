import { getActivities } from '@/shared/api'
import { ContainerPlaceholder, WithPageWrapper } from '@/shared/ui'
import { CategorySelector } from '@/shared/ui/CategorySelector/CategorySelector'
import { ListItemUtmnEvent } from '@/shared/ui/listItems/ListItemUtmnEvent'
import { Box, List, styled } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { classifyEvents } from '../lib/utmnPage'

export const UtmnPage = () => {
	const { data: events, isFetching } = useQuery({
		queryKey: ['utmn'],
		queryFn: () => getActivities(),
	})
	const classifiedEvents = classifyEvents(events?.$values ?? [])
	const categories = Object.keys(classifiedEvents)
	const [selectedCategory, setSelectedCategory] = useState<string>(categories[0])
	const currentEvents = classifiedEvents[selectedCategory] || []

	if (isFetching) return <ContainerPlaceholder fullHeight progress />

	return (
		<WithPageWrapper>
			<ActionsArea>
				<CategorySelector
					categories={categories}
					onCategoryChange={setSelectedCategory}
					selectedCategory={selectedCategory}
				/>
			</ActionsArea>

			<List
				sx={{
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
					alignItems: 'center',
					width: '100%',
					maxHeight: '80vh',
					overflowY: 'auto',
					borderRadius: '8px',
				}}
			>
				{currentEvents.length > 0 ? (
					currentEvents.map(event => <ListItemUtmnEvent key={event.topic} event={event} />)
				) : (
					<ContainerPlaceholder placeholder='No events in this category' fullHeight />
				)}
			</List>
		</WithPageWrapper>
	)
}

export const ActionsArea = styled(Box)({
	display: 'flex',
	flexDirection: 'row',
	width: '98%',
	alignItems: 'flex-end',
	paddingBottom: '1em',
	paddingTop: '0.5em',
	justifyContent: 'flex-end',
	gap: '1em',
})
