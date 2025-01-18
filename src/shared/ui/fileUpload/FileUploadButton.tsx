import { Button } from '@mui/material'
import { ChangeEvent, CSSProperties, useRef } from 'react'

interface FileUploadButtonProps {
	onUpload: (files: File | null | undefined) => void
	accept?: string
	multiple?: boolean
	buttonText?: string
	buttonStyle?: CSSProperties
}

export const FileUploadButton = ({
	onUpload,
	accept = '*',
	multiple = false,
	buttonText = 'Upload File',
	buttonStyle = {},
}: FileUploadButtonProps) => {
	const inputRef = useRef<HTMLInputElement>(null)

	const handleButtonClick = () => {
		if (inputRef.current) {
			inputRef.current.click()
		}
	}

	const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
		const files = event.target.files
		onUpload(files?.[0])
		if (inputRef.current) {
			inputRef.current.value = ''
		}
	}

	return (
		<>
			<Button variant='contained' color='primary' style={buttonStyle} onClick={handleButtonClick}>
				{buttonText}
			</Button>
			<input
				ref={inputRef}
				type='file'
				style={{ display: 'none' }}
				accept={accept}
				multiple={multiple}
				onChange={handleFileChange}
			/>
		</>
	)
}
