import AddOutlinedIcon from '@mui/icons-material/AddOutlined'
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined'
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined'
import ChangeCircleOutlinedIcon from '@mui/icons-material/ChangeCircleOutlined'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined'
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined'
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined'
import PersonRemoveOutlinedIcon from '@mui/icons-material/PersonRemoveOutlined'
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined'
import TaskAltIcon from '@mui/icons-material/TaskAlt'

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
		case 'manageUser':
			return <ManageAccountsOutlinedIcon />
		case 'addUser':
			return <PersonAddAltOutlinedIcon />
		case 'removeUser':
			return <PersonRemoveOutlinedIcon />
		case 'task':
			return <TaskAltIcon />
		case 'addCross':
			return <AddOutlinedIcon />
		default:
			return null
	}
}
