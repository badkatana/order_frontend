import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined'
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined'
import ChangeCircleOutlinedIcon from '@mui/icons-material/ChangeCircleOutlined'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined'
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined'

export const getIcon = ({ name }: { name: string }) => {
	switch (name) {
		case 'editIcon':
			return <ModeEditOutlineOutlinedIcon />
		case 'leftArrow':
			return <ArrowBackIosNewOutlinedIcon />
		case 'rightArrow':
			return <ArrowForwardIosOutlinedIcon />
		case 'save':
			return <SaveOutlinedIcon />
		case 'delete':
			return <DeleteOutlineOutlinedIcon />
		case 'cancel':
			return <CloseOutlinedIcon />
		case 'convert':
			return <ChangeCircleOutlinedIcon />
		default:
			return null
	}
}
