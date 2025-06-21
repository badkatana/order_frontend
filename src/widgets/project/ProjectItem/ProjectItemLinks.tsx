import { useAppStore } from '@/app'
import { Project } from '@/entities/Project'
import { editProject, getLinksPreviews } from '@/shared/api/projectRoutes'
import { ContainerPlaceholder } from '@/shared/ui'
import { Box, Button, Card, CardContent, CardMedia, TextField, Typography, useTheme } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

export const ProjectItemLinks = ({ links }: { links: string[] | undefined | null }) => {
	const { selectedProject } = useAppStore()
	const theme = useTheme()

	const { data: previews, isFetching } = useQuery({
		queryKey: ['links-preview', selectedProject?.projectId],
		queryFn: async () => getLinksPreviews(links),
		enabled: Array.isArray(links) && links.length > 0,
	})
	const [input, setInput] = useState('')

	if (isFetching) return <ContainerPlaceholder progress />

	const handleAddUrl = async () => {
		if (input.trim()) {
			const editedProject = {
				projectId: selectedProject?.projectId,
				links: [...(selectedProject?.links || []), input.trim()],
			} as Project

			await editProject(editedProject)
			setInput('')
		}
	}

	return (
		<Box>
			<Box display='flex' gap={2} mb={2}>
				<TextField fullWidth label='Add URL' value={input} onChange={e => setInput(e.target.value)} />
				<Button variant='contained' onClick={handleAddUrl}>
					Add
				</Button>
			</Box>

			<Box display='flex' flexWrap='wrap' justifyContent='flex-start'>
				{previews?.map((preview, idx) => (
					<LinkPreviewCard key={idx} preview={preview} />
				))}
			</Box>
		</Box>
	)
}

const LinkPreviewCard = ({ preview }) => {
	return (
		<Card
			onClick={() => window.open(preview.url, '_blank')}
			sx={{
				display: 'flex',
				flexDirection: 'column',
				width: 320,
				m: 2,
				cursor: 'pointer',
				borderRadius: 3,
				boxShadow: 6,
				transition: 'transform 0.2s ease, box-shadow 0.2s ease',
				'&:hover': {
					transform: 'translateY(-4px)',
					boxShadow: 10,
				},
				bgcolor: 'rgb(48, 60, 70)',
				color: theme.palette.text.primary,
			}}
		>
			{preview.image && (
				<CardMedia
					component='img'
					image={preview.image}
					alt={preview.title}
					sx={{
						height: 160,
						objectFit: 'cover',
						borderTopLeftRadius: 12,
						borderTopRightRadius: 12,
					}}
				/>
			)}

			<CardContent>
				<Typography variant='subtitle1' fontWeight={600} gutterBottom noWrap>
					{preview.title || 'No title'}
				</Typography>

				{preview.description && (
					<Typography variant='body2' sx={{ color: 'grey.400' }}>
						{preview.description.length > 50 ? `${preview.description.slice(0, 50)}…` : preview.description}
					</Typography>
				)}

				<Typography variant='caption' sx={{ color: 'grey.500', mt: 2, wordBreak: 'break-all' }}>
					{preview.url}
				</Typography>
			</CardContent>
		</Card>
	)
}
