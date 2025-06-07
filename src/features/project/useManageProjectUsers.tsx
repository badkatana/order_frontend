import { User } from '@/entities/User'
import { assignUserToProject, unassignUserFromProject } from '@/shared/api/projectRoutes'
import { useMemo, useState } from 'react'

export const useManageProjectUsers = ({
	users,
	userIds,
	projectId,
}: {
	users: User[]
	userIds: string[] | undefined
	projectId: number | undefined
}) => {
	const [addedUserIds, setAddedUserIds] = useState<string[]>([])
	const [removedUserIds, setRemovedUserIds] = useState<string[]>([])
	const [search, setSearch] = useState<string>('')

	const filteredUsers: User[] = useMemo(
		() => users?.filter(({ name, email }: User) => name.includes(search) || email.includes(search)),
		[search, users]
	)

	const isInProject = (user: string) => {
		if (removedUserIds.includes(user)) return false
		return [...(userIds || []), ...addedUserIds].includes(user)
	}

	const submitChanges = () => {
		if (projectId) {
			addedUserIds && assignUserToProject(addedUserIds, projectId)
			removedUserIds && unassignUserFromProject(removedUserIds, projectId)
		}
	}

	return {
		setAddedUserIds,
		setRemovedUserIds,
		isInProject,
		filteredUsers,
		search,
		setSearch,
		submitChanges,
	}
}
