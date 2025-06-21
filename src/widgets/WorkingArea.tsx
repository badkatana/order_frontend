import styled from '@emotion/styled'
import { Box } from '@mui/material'
import { PageHeader } from '../shared/ui/PageHeader'

/*  @ts-ignore */
export const WorkingArea = ({ children }) => {
	return (
		<Wrapper>
			<PageHeader />
			<InnerWrapper>{children}</InnerWrapper>
		</Wrapper>
	)
}

const Wrapper = styled(Box)({
	flexDirection: 'column',
	minWidth: '6em',
	height: '100%',
	paddingTop: '1em',
})

const InnerWrapper = styled(Box)({
	minWidth: '98%',
	minHeight: '80vh',
})
