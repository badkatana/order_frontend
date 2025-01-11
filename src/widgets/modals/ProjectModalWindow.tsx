import { ProjectForm } from '@/shared/formConfigs'
import { ModalBody } from '@/shared/ui'
import { GeneralForm } from '@/shared/ui/formGenerator/GeneralForm'

export const ProjectModalWindow = ({ open, handleClose }: { open: boolean; handleClose: () => void }) => {
	const submitProject = data => {
		return console.log(data)
	}

	return (
		<ModalBody open={open} handleClose={handleClose} title={'Create'}>
			<GeneralForm config={ProjectForm} submitFunction={submitProject} />
		</ModalBody>
	)
}
