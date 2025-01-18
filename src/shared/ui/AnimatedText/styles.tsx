import { keyframes } from '@emotion/react'
import styled from '@emotion/styled'
import { Box, Typography } from '@mui/material'

export const textAnimation = (direction: string) => keyframes`
  0% { transform: translateX(${direction === 'left' ? '100%' : '-100%'}) }
  100% { transform: translateX(${direction === 'left' ? '-100%' : '100%'}) }`

export const TextWrapper = styled(Box)({
	display: 'flex',
	whiteSpace: 'nowrap',
})

/*  @ts-ignore */

export const BigText = styled(Typography)({
	fontWeight: 'bold',
	fontStyle: 'italic',
	color: 'transparent',
	textStroke: '2px neon-green',
	textShadow: '0 0 5px rgba(0, 255, 0, 0.5)',
	fontSize: { xs: '2rem', sm: '3rem', md: '4rem', lg: '6rem' },
	marginBottom: 0,
})
