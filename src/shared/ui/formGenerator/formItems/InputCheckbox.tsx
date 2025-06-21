import { FormItem } from '@/entities/interfaces'
import { Box, Checkbox, Typography, useTheme } from '@mui/material'
import { Controller } from 'react-hook-form'

export const InputCheckbox = ({ control, name, label }: FormItem) => {
	const theme = useTheme()
	return (
		<Controller
			name={name}
			control={control}
			defaultValue={''}
			render={({ field: { onChange, value, ref } }) => (
				<Box display={'flex'} alignItems={'center'}>
					<Checkbox
						value={value}
						ref={ref}
						onChange={onChange}
						key={name}
						sx={{
							color: theme.palette.text.primary,
							marginLeft: '0.5em',
						}}
					/>
					<Typography color='white'>{label}</Typography>
				</Box>
			)}
		/>
	)
}
