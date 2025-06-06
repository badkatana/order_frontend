import { useAppStore } from '@/app'
import { User } from '@/entities/User'
import { assignUserToProject } from '@/shared/api/projectRoutes'
import { getAllUsers } from '@/shared/api/userRoutes'
import { CustomIconButton } from '@/shared/buttons/CustomIconButton'
import { SCROLLBAR } from '@/shared/constants/constants'
import { ContainerPlaceholder, ModalBody } from '@/shared/ui'
import { Avatar, Box, Button, Chip, List, ListItem, TextField } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'

export const ProjectUsersModal = ({ open, handleClose }) => {
	const { t } = useTranslation()
	const { selectedProject } = useAppStore()
	const { projectUsers, projectId } = selectedProject || {}
	const [addedUserIds, setAddedUserIds] = useState<string[]>([])
	const [search, setSearch] = useState<string>('')

	const { data: users, isFetching } = useQuery({
		queryKey: ['allUsers'],
		queryFn: getAllUsers,
	})

	const filteredUsers: User[] = useMemo(
		() => users?.filter(({ name, email }: User) => name.includes(search) || email.includes(search)),
		[search, users]
	)

	if (isFetching) return <ContainerPlaceholder />
	if (!projectId) handleClose()

	const isInProject = (user: string) => [...(projectUsers || []), ...addedUserIds].includes(user)

	console.log(addedUserIds)
	return (
		<ModalBody open={open} handleClose={handleClose} title={t('project.projectUsers.title')} sx={{ width: '50%' }}>
			<TextField
				label={t('project.projectUsers.findUser')}
				variant='outlined'
				fullWidth
				margin='normal'
				value={search}
				onChange={e => setSearch(e.target.value)}
			/>
			<List sx={{ maxHeight: '20em', overflowY: 'scroll', ...SCROLLBAR }}>
				{filteredUsers.length < 1 && <ContainerPlaceholder placeholder='messages.noUsers' />}
				{filteredUsers.map(user => {
					const inProject = isInProject(user.userId)
					console.log('here')

					return (
						<ListItem
							key={user.name}
							sx={{
								bgcolor: '#f5f5f5',
								borderRadius: 2,
								mb: 1,
								px: 2,
								py: 1,
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'space-between',
							}}
						>
							<Box display='flex' alignItems='center' gap={2}>
								<Avatar>{user.name[0]}</Avatar>
								<Box>{user.name}</Box>
							</Box>

							{inProject && (
								<Chip label={t('project.projectUsers.userInProject')} size='small' color='success' />
							)}
							{!inProject && (
								<CustomIconButton
									iconName={'addUser'}
									onClick={() => setAddedUserIds(prev => [...prev, user.userId])}
								/>
							)}
						</ListItem>
					)
				})}
			</List>
			<Button
				onClick={() => {
					projectId && assignUserToProject(addedUserIds, projectId)
					handleClose()
				}}
			>
				{t('actions.save')}
			</Button>
		</ModalBody>
	)
}
