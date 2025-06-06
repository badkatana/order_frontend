import { CustomTabsType, DefaultObject } from '@/shared/constants/constants'
import { Box, Paper, Tab, Tabs, Typography, useTheme } from '@mui/material'
import { t } from 'i18next'
import { useState } from 'react'

export const CustomTabs = ({
	tabs,
	tabListSx = {},
	tabPanelSx = {},
}: {
	tabs: CustomTabsType[]
	tabListSx?: DefaultObject
	tabPanelSx?: DefaultObject
}) => {
	const [tabValue, setTabValue] = useState(0)
	const theme = useTheme()

	return (
		<Paper
			elevation={2}
			sx={{
				borderRadius: 4,
				p: 1,
				backgroundColor: theme.palette.background.paper,
				boxShadow: '0 8px 24px rgba(0, 0, 0, 0.06)',
				...tabListSx,
			}}
		>
			<Tabs
				value={tabValue}
				onChange={(_, newValue) => setTabValue(newValue)}
				sx={{
					mb: 2,
					'& .MuiTabs-indicator': {
						display: 'none',
					},
				}}
			>
				{tabs.map((tab, index) => {
					const { label, icon } = tab
					const selected = tabValue === index

					return (
						<Tab
							key={`tab-header-${label}`}
							iconPosition='start'
							label={
								<Typography
									variant='subtitle1'
									fontWeight={selected ? 700 : 500}
									color={selected ? 'primary.main' : 'text.primary'}
								>
									{t(tab.label)}
								</Typography>
							}
							disableRipple
							sx={{
								textTransform: 'none',
								minWidth: 140,
								px: 2.5,
								py: 1.2,
								mr: 1,
								borderRadius: 2,
								backgroundColor: selected ? theme.palette.action.selected : 'transparent',
								transition: 'all 0.3s',
								'&:hover': {
									backgroundColor: theme.palette.action.hover,
								},
							}}
						/>
					)
				})}
			</Tabs>

			<Box sx={{ mt: 2 }}>
				{tabs.map((tab, index) => (
					<Box
						key={`tab-panel-${tab.label}`}
						hidden={tabValue !== index}
						sx={{
							animation: tabValue === index ? 'fadeIn 0.25s ease' : 'none',
							...tabPanelSx,
						}}
					>
						{tabValue === index && tab.content}
					</Box>
				))}
			</Box>

			<style>
				{`
              @keyframes fadeIn {
                from { opacity: 0; transform: translateY(4px); }
                to { opacity: 1; transform: translateY(0); }
              }
            `}
			</style>
		</Paper>
	)
}
