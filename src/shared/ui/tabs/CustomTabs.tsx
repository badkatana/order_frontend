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
			elevation={0}
			sx={{
				borderRadius: 3,
				p: 2,
				backgroundColor: theme.palette.background.default,
				border: `1px solid ${theme.palette.divider}`,
				...tabListSx,
			}}
		>
			<Tabs
				value={tabValue}
				onChange={(_, newValue) => setTabValue(newValue)}
				sx={{
					mb: 1.5,
					minHeight: 'unset',
					'& .MuiTabs-indicator': {
						display: 'none',
					},
				}}
			>
				{tabs.map((tab, index) => {
					const selected = tabValue === index
					return (
						<Tab
							key={`tab-${tab.label}`}
							iconPosition='start'
							disableRipple
							label={
								<Typography
									variant='body1'
									fontWeight={selected ? 600 : 500}
									color={selected ? 'primary.main' : 'text.secondary'}
								>
									{t(tab.label)}
								</Typography>
							}
							sx={{
								textTransform: 'none',
								minHeight: 'unset',
								px: 2,
								py: 1,
								mr: 1,
								borderRadius: 2,
								backgroundColor: selected ? 'action.selected' : 'transparent',
								transition: 'all 0.2s',
								'&:hover': {
									backgroundColor: theme.palette.action.hover,
								},
							}}
						/>
					)
				})}
			</Tabs>

			<Box>
				{tabs.map((tab, index) => (
					<Box
						key={`tab-panel-${tab.label}`}
						hidden={tabValue !== index}
						sx={{
							animation: tabValue === index ? 'fadeIn 0.2s ease' : 'none',
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
