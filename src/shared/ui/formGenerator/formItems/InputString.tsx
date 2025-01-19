import { FormItem } from '@/entities/interfaces'
import { TextField } from '@mui/material'
import { Controller } from 'react-hook-form'

export const InputString = ({
	control,
	label,
	name,
	multiline = false,
	required = false,
	defaultValue = '',
	type,
}: FormItem) => {
	return (
		<Controller
			name={name}
			control={control}
			defaultValue={defaultValue}
			render={({ field: { onChange, value, ref } }) => (
				<TextField
					value={value}
					ref={ref}
					type={type}
					label={label ?? name}
					onChange={onChange}
					required={required}
					multiline={multiline}
				/>
			)}
		/>
	)
}
