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
			rules={{
				required: 'This field is required',
				minLength: {
					value: 3,
					message: 'Minimum 3 characters required',
				},
			}}
			render={({ field: { onChange, value, ref }, fieldState: { error } }) => (
				<TextField
					value={value}
					ref={ref}
					type={type}
					label={label ?? name}
					onChange={onChange}
					required={required}
					error={!!error}
					helperText={error?.message}
					multiline={multiline}
				/>
			)}
		/>
	)
}
