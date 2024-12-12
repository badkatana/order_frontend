import { BigText, textAnimation, TextWrapper } from './styles'

export const AnimatedText: React.FC<{ text: string; direction: string; speed: number }> = ({
	text,
	direction,
	speed,
}) => {
	return (
		<TextWrapper
			sx={{
				animation: `${textAnimation(direction)} ${speed}s linear infinite`,
			}}
		>
			<BigText variant='h1'>{text}</BigText>
		</TextWrapper>
	)
}
