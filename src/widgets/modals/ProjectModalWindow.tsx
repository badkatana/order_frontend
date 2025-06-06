import { Project } from '@/entities/Project'
import { ProjectForm } from '@/shared/formConfigs'
import { ModalBody } from '@/shared/ui'
import { GeneralForm } from '@/shared/ui/formGenerator/GeneralForm'
import { useQueryClient } from '@tanstack/react-query'
import { useMemo } from 'react'
import { submitProject } from '../lib/submitForm'

export const ProjectModalWindow = ({
	open,
	handleClose,
	editingProject,
}: {
	open: boolean
	handleClose: () => void
	editingProject?: Project | null
}) => {
	const queryClient = useQueryClient()
	const config = useMemo(() => {
		if (!editingProject) return ProjectForm
		// @ts-ignore
		return ProjectForm.map(item => ({ ...item, defaultValue: editingProject?.[item.name] }))
	}, [editingProject])

	return (
		<ModalBody open={open} handleClose={handleClose} title={'Create'}>
			{/*  @ts-ignore */}
			<GeneralForm
				config={config}
				submitFunction={data => submitProject({ ...editingProject, ...data }, queryClient)}
			/>
		</ModalBody>
	)
}
