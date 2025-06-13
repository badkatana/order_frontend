import { useAppStore } from '@/app'
import { Project } from '@/entities/Project'
import { editProject, getLinksPreviews } from '@/shared/api/projectRoutes'
import { ContainerPlaceholder } from '@/shared/ui'
import { Box, Button, Card, CardContent, CardMedia, TextField, Typography } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { Link } from 'react-router-dom'

export const ProjectItemLinks = ({ links }: { links: string[] | undefined | null }) => {
	const { selectedProject } = useAppStore()

	const {
		data: previews,
		isFetching,
		refetch,
	} = useQuery({
		queryKey: ['links-preview', selectedProject?.projectId],
		queryFn: getLinksPreviews,
		enabled: Array.isArray(links) && links.length > 0,
	})

	if (isFetching) return <ContainerPlaceholder progress />
	const [input, setInput] = useState('')

	const handleAddUrl = async () => {
		if (input.trim()) {
			const editedProject = {
				projectId: selectedProject?.projectId,
				links: [...(selectedProject?.links || []), input.trim()],
			} as Project

			console.log(editedProject)
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
		<Card sx={{ display: 'flex', flexDirection: 'column', width: 320, m: 2 }}>
			{preview.image && (
				<CardMedia
					component='img'
					image={preview.image}
					alt={preview.title}
					sx={{ height: 160, objectFit: 'cover' }}
				/>
			)}
			<CardContent>
				<Typography variant='subtitle1' fontWeight={600}>
					{preview.title}
				</Typography>
				{preview.description && (
					<Typography variant='body2' color='text.secondary' sx={{ mt: 1 }}>
						{preview.description}
					</Typography>
				)}
				<Box mt={2}>
					<Link href={preview.url} target='_blank' rel='noopener noreferrer'>
						{preview.url}
					</Link>
				</Box>
			</CardContent>
		</Card>
	)
}
