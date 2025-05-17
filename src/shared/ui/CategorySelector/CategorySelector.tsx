import { Autocomplete, TextField } from '@mui/material'

export const CategorySelector: React.FC<{
	categories: string[]
	// @ts-ignore
	onCategoryChange: (category: string | null) => void
	selectedCategory: string
}> = ({ categories, onCategoryChange, selectedCategory }) => {
	return (
		<Autocomplete
			value={selectedCategory}
			options={categories}
			sx={{ width: 300 }}
			size='small'
			onChange={(_, newValue) => onCategoryChange(newValue)}
			renderInput={params => <TextField {...params} label='Category' />}
		/>
	)
}
