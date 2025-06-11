import { Assignment, CalendarToday, ExitToApp, Inbox, Menu } from '@mui/icons-material'
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined'
import AddOutlinedIcon from '@mui/icons-material/AddOutlined'
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined'
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined'
import ChangeCircleOutlinedIcon from '@mui/icons-material/ChangeCircleOutlined'
import CloseIcon from '@mui/icons-material/Close'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow'
import LaunchIcon from '@mui/icons-material/Launch'
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined'
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined'
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined'
import PersonRemoveOutlinedIcon from '@mui/icons-material/PersonRemoveOutlined'
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined'
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined'
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined'
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
		case 'launchModal':
			return <LaunchIcon />
		case 'submit':
			return <DoubleArrowIcon />
		case 'clear':
			return <CloseIcon />
		case 'user':
			return <AccountCircleOutlinedIcon />
		case 'menu':
			return <Menu />
		case 'assignment':
			return <Assignment />
		case 'calendar':
			return <CalendarToday />
		case 'exit':
			return <ExitToApp />
		case 'inbox':
			return <Inbox />
		case 'utmn':
			return <SchoolOutlinedIcon />
		case 'settings':
			return <SettingsOutlinedIcon />
		default:
			return null
	}
}
