import { Box, styled, Typography } from '@mui/material'
import { useLocation } from 'react-router-dom'

export const PageHeader = () => {
	const path = useLocation()
	return (
		<StyledWrapper>
			<Typography fontSize={'1.5em'}>Order </Typography>
			<Typography fontSize={'1.5em'} px={'0.5em'}>
				/
			</Typography>
			<Typography fontSize={'1.5em'} color={'red'} fontWeight={'200'}>
				{path ? path.pathname.split('/')[1].trim() : 'somewhere'}
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
