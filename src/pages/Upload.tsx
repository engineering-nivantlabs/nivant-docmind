import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Link2, ArrowRight, Globe, FileText } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import PageHeader from '@/components/shared/PageHeader'
import UploadDropzone, { type UploadFile } from '@/components/documents/UploadDropzone'
import { useDocuments } from '@/context/DocumentContext'
import { Progress } from '@/components/ui/progress'

export default function Upload() {
  const [uploadedFiles, setUploadedFiles] = useState<UploadFile[]>([])
  const [urlInput, setUrlInput] = useState('')
  const [urlProcessing, setUrlProcessing] = useState(false)
  const [urlProgress, setUrlProgress] = useState(0)
  const [urlStatus, setUrlStatus] = useState<'idle' | 'processing' | 'complete' | 'error'>('idle')
  const navigate = useNavigate()
  const { addDocument, setActiveDocumentId, createSession, setActiveSessionId } = useDocuments()

  const handleFilesAdd = (files: UploadFile[]) => {
    setUploadedFiles(prev => {
      const newFiles = files.filter(f => !prev.find(p => p.id === f.id))
      const updated = [...prev, ...newFiles]
      // Merge updates for existing files
      return updated.map(u => {
        const update = files.find(f => f.id === u.id)
        return update ? { ...u, ...update } : u
      })
    })
  }

  const handleFileRemove = (id: string) => {
    setUploadedFiles(prev => prev.filter(f => f.id !== id))
  }

  const handleUrlSubmit = () => {
    if (!urlInput.trim()) return
    setUrlProcessing(true)
    setUrlStatus('processing')
    setUrlProgress(0)

    const interval = setInterval(() => {
      setUrlProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => {
            setUrlStatus('complete')
            setUrlProcessing(false)
          }, 300)
          return 100
        }
        return prev + 15
      })
    }, 200)
  }

  const handleStartChatting = () => {
    // Add uploaded files as documents
    const ready = uploadedFiles.filter(f => f.status === 'complete')
    if (ready.length > 0) {
      const doc = {
        id: Date.now().toString(),
        name: ready[0].name,
        pages: Math.floor(Math.random() * 40) + 10,
        size: ready[0].size,
        createdAt: new Date().toISOString(),
        status: 'ready' as const,
        type: 'pdf' as const,
      }
      addDocument(doc)
      setActiveDocumentId(doc.id)
      const sessionId = createSession(doc.id, `Chat about ${doc.name}`)
      setActiveSessionId(sessionId)
      navigate('/dashboard')
    } else if (urlStatus === 'complete') {
      const doc = {
        id: Date.now().toString(),
        name: urlInput,
        pages: 1,
        size: '-',
        createdAt: new Date().toISOString(),
        status: 'ready' as const,
        type: 'url' as const,
        url: urlInput,
      }
      addDocument(doc)
      setActiveDocumentId(doc.id)
      const sessionId = createSession(doc.id, `Chat about ${doc.name}`)
      setActiveSessionId(sessionId)
      navigate('/dashboard')
    }
  }

  const hasReadyFiles = uploadedFiles.some(f => f.status === 'complete') || urlStatus === 'complete'

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6">
      <PageHeader
        title="Upload Documents"
        description="Upload PDFs or paste URLs to start chatting with your documents."
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Tabs defaultValue="upload" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="upload" className="gap-2">
              <FileText size={14} />
              Upload PDF
            </TabsTrigger>
            <TabsTrigger value="url" className="gap-2">
              <Globe size={14} />
              Paste URL
            </TabsTrigger>
          </TabsList>

          <TabsContent value="upload" className="space-y-4">
            <UploadDropzone
              files={uploadedFiles}
              onFilesAdd={handleFilesAdd}
              onFileRemove={handleFileRemove}
            />
          </TabsContent>

          <TabsContent value="url" className="space-y-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="border rounded-xl p-6 bg-muted/30"
            >
              <div className="flex items-center gap-2 mb-4">
                <Link2 size={18} className="text-[hsl(158,64%,40%)]" />
                <h3 className="text-sm font-medium">Enter Document URL</h3>
              </div>
              <div className="flex gap-2">
                <Input
                  value={urlInput}
                  onChange={e => setUrlInput(e.target.value)}
                  placeholder="https://example.com/document.pdf"
                  disabled={urlProcessing}
                  className="flex-1"
                />
                <Button
                  onClick={handleUrlSubmit}
                  disabled={!urlInput.trim() || urlProcessing}
                  className="bg-[hsl(158,64%,40%)] hover:bg-[hsl(158,64%,35%)] text-white"
                >
                  {urlProcessing ? 'Processing...' : 'Fetch'}
                </Button>
              </div>
              {urlStatus === 'processing' && (
                <div className="mt-4">
                  <Progress value={urlProgress} className="h-2" />
                  <p className="text-xs text-muted-foreground mt-2">Fetching and parsing content...</p>
                </div>
              )}
              {urlStatus === 'complete' && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 flex items-center gap-2 text-sm text-[hsl(158,64%,35%)]"
                >
                  <FileText size={14} />
                  URL processed successfully. Ready to chat!
                </motion.div>
              )}
            </motion.div>
          </TabsContent>
        </Tabs>

        {hasReadyFiles && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 flex justify-center"
          >
            <Button
              size="lg"
              onClick={handleStartChatting}
              className="bg-[hsl(158,64%,40%)] hover:bg-[hsl(158,64%,35%)] text-white gap-2 px-8 rounded-xl shadow-lg shadow-[hsl(158,64%,40%)]/20"
            >
              Start Chatting
              <ArrowRight size={18} />
            </Button>
          </motion.div>
        )}

        {/* Recent uploads */}
        {uploadedFiles.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-12"
          >
            <h3 className="text-sm font-medium text-muted-foreground mb-4">Supported Formats</h3>
            <div className="grid sm:grid-cols-3 gap-4">
              {[
                { icon: FileText, label: 'PDF Documents', desc: 'Up to 500 pages' },
                { icon: Globe, label: 'Web URLs', desc: 'Articles & pages' },
                { icon: Link2, label: 'Direct Links', desc: 'Public PDF links' },
              ].map(item => (
                <div key={item.label} className="flex items-center gap-3 p-4 rounded-xl border border-border bg-muted/20">
                  <item.icon size={18} className="text-[hsl(158,64%,40%)] flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium">{item.label}</p>
                    <p className="text-xs text-muted-foreground">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}
