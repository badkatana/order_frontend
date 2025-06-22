import { FormItem } from '@/entities/interfaces'
import { getAllProjects } from '@/shared/api'
import { Autocomplete, Box, Skeleton, TextField } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { Controller } from 'react-hook-form'
import { CustomFormLabel } from './FormLabel'

export const InputProject = ({ control, label, name }: FormItem) => {
	const { data: projects = [], isFetching } = useQuery({
		queryKey: ['projects'],
		queryFn: getAllProjects,
	})

	if (isFetching) return <Skeleton width={3} height={1} />

	return (
		<Controller
			name={name}
			control={control}
			defaultValue={null}
			render={({ field: { onChange, value } }) => (
				<>
					<CustomFormLabel label={label} />
					<Autocomplete
						value={projects.find(p => p.projectId === value) || null}
						options={projects}
						autoSelect
						getOptionLabel={option => option?.description || ''}
						renderOption={(props, option) => {
							const { key, ...optionProps } = props
							return (
								<Box key={key} component='li' {...optionProps}>
									{option.description}
								</Box>
							)
						}}
						onChange={(_, newValue) => {
							onChange(newValue.projectId || null)
						}}
						autoHighlight
						fullWidth
						renderInput={params => <TextField {...params} hiddenLabel variant='filled' size='small' />}
					/>
				</>
			)}
		/>
	)
}
