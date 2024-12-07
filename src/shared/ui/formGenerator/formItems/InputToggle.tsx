import { Box, Stack, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material'
import { useState } from 'react'
import { Controller } from 'react-hook-form'

export const InputToggle = ({ control, name = '', groupItems = [], title = '' }) => {
	const [formats, setFormats] = useState()
	return (
		<Box>
			<Typography>{title}</Typography>
			<Controller
				control={control}
				name={name}
				render={({ field }) => (
					<Stack spacing={2}>
						<ToggleButtonGroup
							size='medium'
							value={formats}
							aria-label='Small sizes'
							exclusive
							color='success'
							ref={field.ref}
							onChange={newValue => {
								let val = Number(newValue.target.value)
								setFormats([val])
								field.onChange(newValue.target.value)
							}}
						>
							{groupItems.map(item => (
								<ToggleButton value={item.value} key={item.value}>
									{item.label}
								</ToggleButton>
							))}
						</ToggleButtonGroup>
					</Stack>
				)}
			/>
		</Box>
	)
}
