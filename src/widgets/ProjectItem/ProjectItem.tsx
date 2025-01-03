import { Card, Content, Creator, Header, ProgressBar, ProgressBarWrapper, Status } from './styles'

export const ProjectItem = () => {
	const creatorName = 'name'
	const status = false
	const title = 'title '
	const progress = 69

	return (
		<>
			<Card>
				<Header>
					<Status>
						<span className='status-icon'>⏳</span> {status}
					</Status>
					<Creator>{creatorName}</Creator>
				</Header>

				<Content>
					<h3>{title}</h3>
				</Content>

				<ProgressBarWrapper>
					<ProgressBar width={progress} />
				</ProgressBarWrapper>
			</Card>
		</>
	)
}
