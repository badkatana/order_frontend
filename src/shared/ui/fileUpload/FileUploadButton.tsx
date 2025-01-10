import { Button } from '@mui/material'
import React, { useRef } from 'react'

interface FileUploadButtonProps {
	onUpload: (files: FileList | File | null | undefined) => void
	accept?: string
	multiple?: boolean
	buttonText?: string
}

export const FileUploadButton = ({
	onUpload,
	accept = '*',
	multiple = false,
	buttonText = 'Upload File',
}: FileUploadButtonProps) => {
	const inputRef = useRef<HTMLInputElement>(null)

	const handleButtonClick = () => {
		if (inputRef.current) {
			inputRef.current.click()
		}
	}

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const files = event.target.files
		console.log(files)
		onUpload(multiple ? files : files?.[0])
		if (inputRef.current) {
			inputRef.current.value = '' // Reset input so the same file can be uploaded again
		}
	}

	return (
		<>
			<Button variant='contained' color='primary' onClick={handleButtonClick}>
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
