import { TextField } from '@mui/material'
import { Controller } from 'react-hook-form'

export const InputString = ({ control, label, name = '', multiline = false, required = false }) => {
	return (
		<Controller
			name={name}
			control={control}
			defaultValue={''}
			render={({ field: { onChange, value, ref } }) => (
				<TextField
					value={value ?? ''}
					ref={ref}
					label={label ?? name}
					onChange={onChange}
					required={required}
					multiline={multiline}
				/>
			)}
		/>
	)
}
