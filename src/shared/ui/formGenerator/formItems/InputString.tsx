import { FormItem } from '@/entities/interfaces'
import { TextField } from '@mui/material'
import { Controller } from 'react-hook-form'
import { CustomFormLabel } from './FormLabel'

export const InputString = ({
	control,
	label,
	name,
	multiline = false,
	required = false,
	defaultValue = '',
	type,
}: FormItem) => {
	const formLabel = label ?? name
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
				<>
					<CustomFormLabel label={formLabel} />
					<TextField
						value={value}
						ref={ref}
						fullWidth
						size='small'
						hiddenLabel
						variant={'filled'}
						type={type}
						onChange={onChange}
						required={required}
						error={!!error}
						helperText={error?.message}
						multiline={multiline}
					/>
				</>
			)}
		/>
	)
}
