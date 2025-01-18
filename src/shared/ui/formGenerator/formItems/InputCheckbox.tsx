import { Box, Checkbox, Typography } from '@mui/material'
import { Controller } from 'react-hook-form'

/*  @ts-ignore */

export const InputCheckbox = ({ control, name, label }) => {
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
							color: 'white',
							'&.Mui-checked': {
								color: 'white',
							},
							marginLeft: '0.5em',
						}}
					/>
					<Typography color='white'>{label}</Typography>
				</Box>
			)}
		/>
	)
}
