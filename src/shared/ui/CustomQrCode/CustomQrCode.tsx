import { getQrCodeToken } from '@/shared/api/userRoutes'
import { CustomIconButton } from '@/shared/buttons/CustomIconButton'
import { Box, Stack, Typography } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import QRCode from 'react-qr-code'
import { ModalBody } from '../ModalBody/ModalBody'

export const CustomQrCode = () => {
	const [showQr, setShowQr] = useState(false)
	const [expiresAt, setExpiresAt] = useState<Date | null>(null)
	const [remainingTime, setRemainingTime] = useState<number>(0)

	const { data, refetch, isFetching } = useQuery({
		queryKey: ['qrCodeValue'],
		queryFn: getQrCodeToken,
		enabled: false,
	})

	useEffect(() => {
		if (!expiresAt) return

		const interval = setInterval(() => {
			const diff = dayjs(expiresAt).diff(dayjs(), 'second')
			setRemainingTime(diff > 0 ? diff : 0)

			if (diff <= 0) {
				setShowQr(false)
				setExpiresAt(null)
				clearInterval(interval)
			}
		}, 1000)

		return () => clearInterval(interval)
	}, [expiresAt])

	const handleGenerateQr = async () => {
		const res = await refetch()
		if (res.data?.shortToken) {
			setShowQr(true)
			setExpiresAt(dayjs().add(3, 'minute').toDate())
		}
	}

	return (
		<Stack spacing={2} alignItems='center'>
			<CustomIconButton iconName={'qrCode'} onClick={handleGenerateQr} disabled={isFetching} />

			{showQr && data?.shortToken && (
				<ModalBody
					open={showQr && data?.shortToken}
					handleClose={() => setShowQr(false)}
					title='QR'
					sx={{ maxWidth: '15em' }}
				>
					<Box sx={{ backgroundColor: 'white', padding: 2, borderRadius: 2, textAlign: 'center' }}>
						<QRCode
							size={256}
							style={{ height: 'auto', maxWidth: '100%', width: '100%' }}
							value={data.shortToken}
							viewBox={`0 0 256 256`}
						/>
						<Typography mt={2} variant='body2' color='grey'>
							Истекает через {remainingTime} сек.
						</Typography>
					</Box>
				</ModalBody>
			)}
		</Stack>
	)
}
