import { Box, Stack, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material'
import { useState } from 'react'
import { Controller } from 'react-hook-form'

/*  @ts-ignore */

export const InputToggle = ({ control, name = '', groupItems = [], label = '', ...props }) => {
	const [formats, setFormats] = useState()
	return (
		<Box display={'flex'} alignItems={'flex-start'} flexDirection={'column'}>
			<Typography color='white'>{label}</Typography>
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
								/*  @ts-ignore */

								let val = Number(newValue.target.value)

								/*  @ts-ignore */

								setFormats([val])

								/*  @ts-ignore */

								field.onChange(newValue.target.value)
							}}
						>
							{groupItems.map(item => (
								/*  @ts-ignore */
								<ToggleButton value={item.value} key={item.value}>
									{/*  @ts-ignore */}
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
