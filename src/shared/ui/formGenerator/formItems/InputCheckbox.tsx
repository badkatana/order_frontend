import { Checkbox } from '@mui/material'
import { Controller } from 'react-hook-form'

export const InputCheckbox = ({ control, name, label }) => {
	return (
		<Controller
			name={name}
			control={control}
			defaultValue={''}
			render={({ field: { onChange, value, ref } }) => (
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
					}}
				/>
			)}
		/>
	)
}
