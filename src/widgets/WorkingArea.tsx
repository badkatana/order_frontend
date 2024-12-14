import styled from '@emotion/styled'
import { Box } from '@mui/material'
import { PageHeader } from '../shared/ui/PageHeader'

export const WorkingArea = ({ children }) => {
	return (
		<Wrapper>
			<PageHeader path={undefined} />
			{/* here must be a component with a working path */}
			{/* here must be a divider or smthng similar to divider */}
			<InnerWrapper>{children}</InnerWrapper>
		</Wrapper>
	)
}

const Wrapper = styled(Box)({
	background: 'linear-gradient(#1E1E22, #8D8D8F);',
	// width: '90%',
	flexDirection: 'column',
	// heigth: '100%',
	minHeight: '40em',
	minWidth: '6em',
	height: '100%',
	paddingTop: '1em',
	borderStyle: 'solid',
	borderColor: '#606162',
	borderRadius: '3em',
	color: 'white',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
})

const InnerWrapper = styled(Box)({
	background: '#1E1E22',
	maxWidth: '98%',
	borderRadius: '1em 1em 3em 3em',
	// minWidth: '6em',
	// height: '90%',
	borderStyle: 'ridge',
	borderColor: '#606162',
})
