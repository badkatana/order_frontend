import { Menu as MenuIcon } from '@mui/icons-material'
import { AppBar, IconButton, List, ListItem, ListItemText, Toolbar } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { BlurredBackground, VerticalBar } from './VerticalAppBarStyles'
import { AppBarItems } from './config'

interface VerticalAppBarProps {
	open: boolean
	toggleDrawer: () => void
}

export const VerticalAppBar = ({ open, toggleDrawer }: VerticalAppBarProps) => {
	const navigate = useNavigate()

	/*  @ts-ignore */
	const handleClick = item => {
		if (item.clickFunction) {
			item.clickFunction()
		}
		navigate(item.path)
	}

	const items = AppBarItems.map(item => {
		return (
			/*  @ts-ignore */
			<ListItem key={item.key} onClick={() => handleClick(item)} button style={{ padding: '1em' }}>
				<item.icon sx={{ color: 'white' }} />
				{open && <ListItemText primary={item.name} sx={{ color: 'white', px: '1em' }} />}
			</ListItem>
		)
	})

	return (
		<>
			<BlurredBackground open={open} />
			<AppBar
				position='fixed'
				sx={{
					width: open ? '15%' : '5%',
					...VerticalBar,
				}}
			>
				<Toolbar>
					<IconButton onClick={toggleDrawer} color='inherit'>
						<MenuIcon />
					</IconButton>
				</Toolbar>
				<List>{items}</List>
			</AppBar>
		</>
	)
}
