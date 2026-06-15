import { useCallback, useState } from 'react'
import { motion } from 'framer-motion'
import { Upload, FileText, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Progress } from '@/components/ui/progress'

export interface UploadFile {
  id: string
  name: string
  size: string
  progress: number
  status: 'uploading' | 'processing' | 'complete' | 'error'
}

interface UploadDropzoneProps {
  files: UploadFile[]
  onFilesAdd: (files: UploadFile[] | ((prev: UploadFile[]) => UploadFile[])) => void
  onFileRemove: (id: string) => void
}

export default function UploadDropzone({ files, onFilesAdd, onFileRemove }: UploadDropzoneProps) {
  const [isDragOver, setIsDragOver] = useState(false)

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    const droppedFiles = Array.from(e.dataTransfer.files).filter(f => f.type === 'application/pdf')
    if (droppedFiles.length > 0) {
      const newFiles: UploadFile[] = droppedFiles.map(file => ({
        id: Math.random().toString(36).substring(7),
        name: file.name,
        size: formatFileSize(file.size),
        progress: 0,
        status: 'uploading',
      }))
      onFilesAdd(newFiles)
      simulateUpload(newFiles)
    }
  }, [onFilesAdd])

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []).filter(f => f.type === 'application/pdf')
    if (selectedFiles.length > 0) {
      const newFiles: UploadFile[] = selectedFiles.map(file => ({
        id: Math.random().toString(36).substring(7),
        name: file.name,
        size: formatFileSize(file.size),
        progress: 0,
        status: 'uploading',
      }))
      onFilesAdd(newFiles)
      simulateUpload(newFiles)
    }
  }, [onFilesAdd])

  const simulateUpload = (uploadFiles: UploadFile[]) => {
    uploadFiles.forEach(file => {
      let progress = 0
      const interval = setInterval(() => {
        progress += Math.random() * 20 + 5
        if (progress >= 100) {
          progress = 100
          clearInterval(interval)
          setTimeout(() => {
            onFilesAdd(prev =>
              prev.map(f =>
                f.id === file.id ? { ...f, progress: 100, status: 'complete' as const } : f
              )
            )
          }, 300)
        }
        onFilesAdd(prev =>
          prev.map(f =>
            f.id === file.id ? { ...f, progress: Math.min(progress, 100) } : f
          )
        )
      }, 200)
    })
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i]
  }

  return (
    <div className="space-y-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={cn(
          'relative border-2 border-dashed rounded-xl p-10 text-center transition-colors cursor-pointer',
          isDragOver
            ? 'border-[hsl(158,64%,40%)] bg-[hsl(158,64%,95%)] dark:bg-[hsl(158,64%,10%)]'
            : 'border-border bg-muted/50 hover:border-muted-foreground/30'
        )}
      >
        <input
          type="file"
          accept=".pdf"
          multiple
          onChange={handleFileInput}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        <div className="flex flex-col items-center gap-3">
          <div className={cn(
            'w-14 h-14 rounded-full flex items-center justify-center transition-colors',
            isDragOver ? 'bg-[hsl(158,64%,40%)] text-white' : 'bg-muted text-muted-foreground'
          )}>
            <Upload size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-foreground">
              {isDragOver ? 'Drop files here' : 'Drop PDFs here or click to browse'}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Supports PDF files up to 50MB
            </p>
          </div>
        </div>
      </motion.div>

      {files.length > 0 && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="space-y-2"
        >
          {files.map(file => (
            <motion.div
              key={file.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3 p-3 rounded-lg border border-border bg-background"
            >
              <FileText size={18} className="text-[hsl(158,64%,40%)] flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium truncate">{file.name}</span>
                  <span className="text-xs text-muted-foreground ml-2">{file.size}</span>
                </div>
                <div className="flex items-center gap-2 mt-1.5">
                  <Progress value={file.progress} className="h-1.5 flex-1" />
                  <span className="text-xs text-muted-foreground w-10 text-right">
                    {file.status === 'complete' ? 'Done' : `${Math.round(file.progress)}%`}
                  </span>
                </div>
              </div>
              <button
                onClick={() => onFileRemove(file.id)}
                className="p-1 rounded hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
              >
                <X size={14} />
              </button>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  )
}
