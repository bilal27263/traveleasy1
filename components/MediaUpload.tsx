'use client'

import { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Button } from '@/components/ui/button'

interface MediaUploadProps {
  type: 'photos' | 'videos' | 'pdf'
  onUpload: (files: File[]) => void
}

export function MediaUpload({ type, onUpload }: MediaUploadProps) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    onUpload(acceptedFiles)
  }, [onUpload])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: type === 'photos' ? 'image/*' : type === 'videos' ? 'video/*' : 'application/pdf'
  })

  return (
    <div {...getRootProps()} className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <p>Drag 'n' drop some files here, or click to select files</p>
      )}
      <Button className="mt-4">Select {type}</Button>
    </div>
  )
}

