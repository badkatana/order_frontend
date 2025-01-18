import { ProjectForm } from '@/shared/formConfigs'
import { ModalBody } from '@/shared/ui'
import { GeneralForm } from '@/shared/ui/formGenerator/GeneralForm'
import { useQueryClient } from '@tanstack/react-query'
import { submitProject } from '../lib/submitForm'

export const ProjectModalWindow = ({ open, handleClose }: { open: boolean; handleClose: () => void }) => {
	const queryClient = useQueryClient()

	return (
		<ModalBody open={open} handleClose={handleClose} title={'Create'}>
			{/*  @ts-ignore */}
			<GeneralForm config={ProjectForm} submitFunction={data => submitProject(data, queryClient)} />
		</ModalBody>
	)
}
