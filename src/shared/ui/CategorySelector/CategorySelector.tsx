import { Autocomplete, TextField } from '@mui/material'

export const CategorySelector: React.FC<{
	categories: string[]
	onCategoryChange: (category: string) => void
	selectedCategory: string
}> = ({ categories, onCategoryChange, selectedCategory }) => {
	return (
		<Autocomplete
			disablePortal
			value={selectedCategory}
			options={categories}
			sx={{ width: 300 }}
			onChange={(_, newValue) => {
				console.log(newValue)
				onCategoryChange(newValue)
			}}
			renderInput={params => <TextField {...params} label='Movie' />}
		/>
	)
}
