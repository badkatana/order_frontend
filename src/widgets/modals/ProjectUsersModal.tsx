import { useAppStore } from '@/app'
import { useManageProjectUsers } from '@/features'
import { getAllUsers } from '@/shared/api/userRoutes'
import { CustomIconButton } from '@/shared/buttons/CustomIconButton'
import { SCROLLBAR } from '@/shared/constants/constants'
import { ContainerPlaceholder, ModalBody } from '@/shared/ui'
import { Avatar, Box, Button, Chip, List, ListItem, TextField } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { ProjectUserListStyles } from './styles/ProjectUserModal'

export const ProjectUsersModal = ({ open, handleClose }) => {
	const { t } = useTranslation()
	const { selectedProject } = useAppStore()
	const { userIds, projectId } = selectedProject || {}

	const { data: users, isFetching } = useQuery({
		queryKey: ['allUsers'],
		queryFn: getAllUsers,
	})

	const { setAddedUserIds, setRemovedUserIds, isInProject, filteredUsers, search, setSearch, submitChanges } =
		useManageProjectUsers({ users, userIds, projectId })

	if (isFetching) return <ContainerPlaceholder />
	if (!projectId) handleClose()

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
					const { userId, name } = user || {}
					const inProject = isInProject(userId)

					return (
						<ListItem key={name} sx={ProjectUserListStyles}>
							<Box display='flex' alignItems='center' gap={2}>
								<Avatar>{name[0]}</Avatar>
								<Box>{name}</Box>
							</Box>

							{inProject && (
								<Box display={'flex'} justifyContent={'spance-between'} alignItems={'center'}>
									<Chip
										label={t('project.projectUsers.userInProject')}
										size='small'
										color='success'
									/>
									<CustomIconButton
										iconName={'removeUser'}
										onClick={() => setRemovedUserIds(prev => [...prev, userId])}
									/>
								</Box>
							)}
							{!inProject && (
								<CustomIconButton
									iconName={'addUser'}
									onClick={() => setAddedUserIds(prev => [...prev, userId])}
								/>
							)}
						</ListItem>
					)
				})}
			</List>
			<Button
				onClick={() => {
					submitChanges()
					handleClose()
				}}
			>
				{t('actions.save')}
			</Button>
		</ModalBody>
	)
}
