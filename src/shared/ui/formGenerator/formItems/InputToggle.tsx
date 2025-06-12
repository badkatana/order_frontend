import { FormItem } from '@/entities/interfaces'
import { Box, Stack, ToggleButton, ToggleButtonGroup } from '@mui/material'
import { useState } from 'react'
import { Controller } from 'react-hook-form'
import { CustomFormLabel } from './FormLabel'

/*  @ts-ignore */

export const InputToggle = ({ control, name = '', groupItems = [], label = '', ...props }: FormItem) => {
	const [formats, setFormats] = useState()

	const filteredGroupItems = groupItems.filter(({ hidden }) => hidden == null || !hidden)
	if (filteredGroupItems.length <= 1) return

	return (
		<Box display={'flex'} alignItems={'flex-start'} flexDirection={'column'}>
			<CustomFormLabel label={label ?? name} />
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
							{/* @ts-ignore */}
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
