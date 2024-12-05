import { Box, List } from '@mui/material'
import { CSSProperties } from 'react'

type ListWrapper = {
	sx?: CSSProperties
	children: any[]
	customOnClick?: (value: any) => void
	buttonNeeded?: boolean
}

export const ListWrapper = (props: ListWrapper) => {
	const { children, sx } = props
	return (
		<Box>
			<List sx={sx}>
				{children}
				{/* {items.map(item => (
				<ListItem disablePadding key={item.id}>
					<ListItemButton onClick={customOnClick}>
						<ListItemText primary={item.name} />
					</ListItemButton>
				</ListItem>
			))} */}
			</List>
		</Box>
	)
}
