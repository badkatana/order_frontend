import { Autocomplete, TextField } from '@mui/material'

export const CategorySelector: React.FC<{
	categories: string[]
	onCategoryChange: (category: string) => void
	selectedCategory: string
}> = ({ categories, onCategoryChange, selectedCategory }) => {
	return (
		<Autocomplete
			value={selectedCategory}
			options={categories}
			sx={{ width: 300 }}
			onChange={(_, newValue) => onCategoryChange(newValue)}
			renderInput={params => <TextField {...params} label='Category' />}
		/>
	)
}
