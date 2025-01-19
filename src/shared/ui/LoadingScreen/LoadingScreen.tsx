import { CircularProgress } from '@mui/material'
import { Fragment } from 'react/jsx-runtime'

export const LoadingScreen = () => {
	return (
		<Fragment>
			<svg width={0} height={0}>
				<linearGradient id='my_gradient' x1='0%' y1='0%' x2='0%' y2='100%'>
					<stop offset='0%' stopColor='#e01cd5' />
					<stop offset='100%' stopColor='#1CB5E0' />
				</linearGradient>
			</svg>
			<CircularProgress sx={{ 'svg circle': { stroke: 'url(#my_gradient)' } }} />
		</Fragment>
	)
}
