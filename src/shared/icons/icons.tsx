import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined'
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined'

export const getIcon = ({ name }: { name: string }) => {
	switch (name) {
		case 'leftArrow':
			return <ArrowBackIosNewOutlinedIcon />
		case 'rightArrow':
			return <ArrowForwardIosOutlinedIcon />
		default:
			return null
	}
}
