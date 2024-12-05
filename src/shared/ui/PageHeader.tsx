import { Box, styled, Typography } from '@mui/material'

export const PageHeader = ({ path }) => {
	return (
		<StyledWrapper>
			<Typography fontSize={'1.5em'}>Order / </Typography>
			<Typography fontSize={'1.5em'} color={'red'} fontWeight={'200'} px={'0.5em'}>
				{path ? path : 'somewhere'}
			</Typography>
		</StyledWrapper>
	)
}

const StyledWrapper = styled(Box)({
	width: '100%',
	display: 'flex',
	flexDirection: 'row',
	justifyContent: 'start',
	paddingLeft: '5%',
})
