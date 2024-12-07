import { Box, Button, keyframes, TextField, Typography } from '@mui/material'
import React from 'react'
import './test.css'

const textAnimation = (direction: string) => keyframes`
  0% { transform: translateX(${direction === 'left' ? '100%' : '-100%'}) }
  100% { transform: translateX(${direction === 'left' ? '-100%' : '100%'}) }`

const AnimatedText: React.FC<{ text: string; direction: string; speed: number }> = ({ text, direction, speed }) => {
	return (
		<Box
			sx={{
				display: 'flex',
				whiteSpace: 'nowrap',
				animation: `${textAnimation(direction)} ${speed}s linear infinite`,
			}}
		>
			<Typography
				variant='h1'
				sx={{
					fontWeight: 'bold',
					fontStyle: 'italic',
					color: 'transparent',
					textStroke: '2px neon-green',
					textShadow: '0 0 5px rgba(0, 255, 0, 0.5)',
					fontSize: { xs: '2rem', sm: '3rem', md: '4rem', lg: '6rem' },
					marginBottom: 0,
				}}
			>
				{text}
			</Typography>
		</Box>
	)
}

const RegistrationForm = () => {
	return (
		<Box sx={{ padding: 4, zIndex: 1 }}>
			<Typography variant='h4' gutterBottom>
				Join Us
			</Typography>
			<TextField label='Имя' fullWidth margin='normal' />
			<TextField label='Email' fullWidth margin='normal' />
			<TextField label='Пароль' type='password' fullWidth margin='normal' />
			<Button variant='contained' color='primary'>
				start session
			</Button>
		</Box>
	)
}

export const AuthPage = () => {
	const texts = [
		{ text: 'getting things done', direction: 'left', speed: 10 },
		{ text: '始末 始末 始末 始末 始末 始末 始末', direction: 'right', speed: 8 },
		{ text: 'a dolgok elintézése a dolgok elintézése', direction: 'left', speed: 12 },
		{ text: 'eine Sache erledigen', direction: 'right', speed: 15 },
		{ text: 'getting things done', direction: 'left', speed: 10 },
		{ text: '始末 始末 始末 始末 始末 始末 始末', direction: 'right', speed: 8 },
		{ text: 'a dolgok elintézése a dolgok elintézése', direction: 'left', speed: 12 },
		{ text: 'eine Sache erledigen', direction: 'right', speed: 15 },
	]

	return (
		<Box
			sx={{
				display: 'flex',
				height: '100vh',
				position: 'relative',
				overflow: 'hidden',
				flexDirection: 'column',
				justifyContent: 'center',
			}}
		>
			<Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 0 }}>
				{texts.map((item, index) => (
					<AnimatedText key={index} text={item.text} direction={item.direction} speed={item.speed} />
				))}
			</Box>
			<Box
				sx={{
					position: 'relative',
					width: '40%',
					height: '100%',
					backdropFilter: 'blur(10px)',
					display: 'flex',
					right: 0,
					justifyContent: 'center',
					alignItems: 'center',
					zIndex: 1,
					color: 'white',
				}}
			>
				<RegistrationForm />
			</Box>
		</Box>
	)
}
