import { texts } from '@/shared/constants/constants'
import { AnimatedText } from '@/shared/ui/AnimatedText/AnimatedText'
import { Box } from '@mui/material'
import { SessionForm } from './SessionForm'

export const AuthPage = () => {
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
				<SessionForm />
			</Box>
		</Box>
	)
}
