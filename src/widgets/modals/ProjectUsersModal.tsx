import { useAppStore } from '@/app'
import { getAllUsers } from '@/shared/api/userRoutes'
import { ContainerPlaceholder, ModalBody } from '@/shared/ui'
import { Box } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

export const ProjectUsersModal = ({ open, handleClose }) => {
	const { t } = useTranslation()
	const { selectedProject } = useAppStore()
	const [addedUserIds, setAddedUserIds] = useState([])

	const { data: users, isFetching } = useQuery({
		queryKey: ['allUsers'],
		queryFn: getAllUsers,
	})

	if (isFetching) return <ContainerPlaceholder />

	const projectUsers = users.filter(user => selectedProject?.projectUsers?.includes(user))

	return (
		<ModalBody open={open} handleClose={handleClose} title={t('project.projectUsers.title')}>
			<Box></Box>
		</ModalBody>
	)
}
